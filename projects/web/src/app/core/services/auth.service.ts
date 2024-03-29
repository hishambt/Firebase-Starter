import { Injectable, inject, signal } from '@angular/core';
import {
	GoogleAuthProvider,
	User,
	authState,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithPopup,
	signOut,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	linkWithCredential,
	deleteUser,
	ProviderId,
	UserInfo,
	UserCredential,
	Auth,
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
} from '@angular/fire/auth';
import { switchMap, of, from, take, Observable, shareReplay, map, takeUntil, Subject, catchError, finalize } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';
import { DocumentData, Firestore, deleteDoc, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { AppSettingsService } from 'projects/web/src/app/shared/services/app-settings.service';
import { StorageAccessorService } from 'projects/web/src/app/shared/services/storage-accessor.service';
import { ImageUploadService } from 'projects/web/src/app/shared/services/image-upload.service';
import { environment } from 'projects/web/src/environments/environment';

import { AuthUser, IUser } from '../../shared/models/IUser.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	auth = inject(Auth);
	storage = inject(StorageAccessorService);
	appSettings = inject(AppSettingsService);
	db = inject(Firestore);
	route = inject(ActivatedRoute);
	imageService = inject(ImageUploadService);
	userIsGettingDeleted$ = new Subject<boolean>();
	loggedInWithGoogle = signal(false);
	loggedInWithPassword = signal(false);

	get currentUserProfile$(): Observable<IUser | null> {
		return authState(this.auth).pipe(
			traceUntilFirst('auth'),
			switchMap((user: AuthUser): Observable<IUser | null> => {
				if (!user?.uid) {
					// user has signed out
					return of(null);
				}

				this.loggedInWithGoogle.set(this.hasProvider(user, ProviderId.GOOGLE));
				this.loggedInWithPassword.set(this.hasProvider(user, ProviderId.PASSWORD));

				// user is logged in
				if (this.loggedInWithGoogle() || (this.loggedInWithPassword() && user.emailVerified)) {
					// get user from database only in case the user is logged in with google or his email is verified
					const ref = doc(this.db, 'users', user?.uid);

					return docData(ref).pipe(
						// sharing same result of user for all subscirbers
						takeUntil(this.userIsGettingDeleted$),
						shareReplay(1),
						switchMap((data: DocumentData | undefined): Observable<IUser> | Observable<null> => {
							if (data) {
								// user exists in database
								return of(data) as Observable<IUser>;
							}

							// add new user to database
							this.storage.setLocalStorage(user.uid, 'new');
							const newUser = this.populateUser(user);

							return from(setDoc(ref, newUser)).pipe(
								// returning null since docData will listen to the change and rerun on its own,
								// so no need to return anything at this stage.
								map(() => null),
							);
						}),
					);
				} else {
					// temp user to avoid breaking the app (it won't affect since there are guards for non google non verified emails)
					const newUser = this.populateUser(user);

					return of(newUser);
				}
			}),
		);
	}

	userProvider<T = unknown>(callback: (user: AuthUser) => Observable<T>): Observable<T> {
		return authState(this.auth).pipe(
			take(1),
			switchMap((user: AuthUser): Observable<T> => callback(user)),
		);
	}

	hasProvider(user: User, providerId: (typeof ProviderId)[keyof typeof ProviderId]): boolean {
		return !!user.providerData.find((info: UserInfo) => info.providerId == providerId);
	}

	populateUser({ uid, displayName, email, phoneNumber, photoURL }: User): IUser {
		const { firstName, lastName } = this.getUserNames(displayName || '');
		const newUser: IUser = {
			uid,
			email: email || '',
			firstName,
			lastName,
			phone: phoneNumber || '',
			address: '',
			photoURL: photoURL || '',
		};

		return newUser;
	}

	getUserNames(displayName: string): { firstName: string; lastName: string } {
		const name = displayName?.split(' ');

		let firstName = displayName || '',
			lastName = '';

		if (name && name?.length > 1) {
			firstName = name[0];
			name.shift();
			lastName = name.join(' ');
		}

		return {
			firstName,
			lastName,
		};
	}

	getUserDisplay(user: IUser): string {
		let name = '';

		if (user.firstName) {
			name = user.firstName + ' ' + user.lastName;
		} else if (user.email) {
			name = user.email;
		}

		return name;
	}

	registerNewAccount(email: string, password: string): Observable<UserCredential> {
		return from(createUserWithEmailAndPassword(this.auth, email, password));
	}

	sendVerificationEmail(user: User): Observable<void> {
		return from(
			sendEmailVerification(user, {
				url: this.appSettings.getUrlOrigin() + (this.route.snapshot.queryParams['returnUrl'] || '/home'),
			}),
		);
	}

	loginWithGoogle(): Observable<UserCredential> {
		return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
	}

	loginWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
		return from(signInWithEmailAndPassword(this.auth, email, password));
	}

	forgetPassword(email: string): Observable<void> {
		return from(
			sendPasswordResetEmail(this.auth, email, {
				url: this.appSettings.getUrlOrigin() + '/auth/login?passwordChanged=true',
			}),
		);
	}

	logout(): Observable<void> {
		return from(signOut(this.auth));
	}

	updateUser(user: IUser): Observable<void> {
		const ref = doc(this.db, 'users', user.uid);

		return from(updateDoc(ref, { ...user }));
	}

	linkUser(user: User, newPassword: string): Observable<UserCredential> {
		const creds = EmailAuthProvider.credential(user.email!, newPassword);

		return from(linkWithCredential(user, creds));
	}

	validatePassword(user: User, currentPassword: string): Observable<UserCredential> {
		const creds = EmailAuthProvider.credential(user.email!, currentPassword);

		return from(reauthenticateWithCredential(user, creds));
	}

	updatePassword(user: User, newPassword: string): Observable<void> {
		return from(updatePassword(user, newPassword));
	}

	deleteUser(user: User): Observable<void> {
		const ref = doc(this.db, 'users', user.uid);
		this.userIsGettingDeleted$.next(true);

		return from(deleteDoc(ref)).pipe(
			switchMap(() => {
				return this.imageService.deleteImage(`${environment.profileCDNPath}${user.uid}`).pipe(
					catchError((_error) => {
						return of(true);
					}),
					switchMap(() => {
						return deleteUser(user);
					}),
				);
			}),
			finalize(() => {
				this.userIsGettingDeleted$.next(false);
			}),
		);
	}

	// TODO: move this function to a global error handling service
	getError(formControl: AbstractControl, label: string): string {
		const ctrl = formControl;

		switch (true) {
			case ctrl?.hasError('required'):
				return label + ' is required';
			case ctrl?.hasError('email'):
				return label + ' must follow a valid format';
			case ctrl?.hasError('minlength'):
				return `${label} should be at least ${ctrl?.errors?.['minlength'].requiredLength} characters long`;
			case ctrl?.hasError('passwordMismatch'):
				return label + 's should match';

			default:
				return '';
		}
	}
}
