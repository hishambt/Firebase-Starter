import { Injectable, inject } from '@angular/core';
import {
    Auth,
    GoogleAuthProvider,
    User,
    authState,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    deleteUser,
    UserCredential,
    ProviderId,
    UserInfo,
} from '@angular/fire/auth';
import { switchMap, of, from, take, Observable, shareReplay, map, takeUntil, Subject } from 'rxjs';
import { IUser } from '../../shared/models/IUser.model';
import { traceUntilFirst } from '@angular/fire/performance';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { DocumentData, Firestore, deleteDoc, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { StorageAccessorService } from 'src/app/shared/services/storage-accessor.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    auth = inject(Auth);
    storage = inject(StorageAccessorService);
    appSettings = inject(AppSettingsService);
    db = inject(Firestore);
    route = inject(ActivatedRoute);
    userIsGettingDeleted$ = new Subject<boolean>();

    get currentUserProfile$(): Observable<IUser | null> {
        return authState(this.auth).pipe(
            traceUntilFirst('auth'),
            take(1),
            switchMap((user: User | null): Observable<IUser | null> => {
                if (!user?.uid) {
                    // user has signed out
                    return of(null);
                }

                // user is logged in
                if (this.hasProvider(user, ProviderId.GOOGLE) || (this.hasProvider(user, ProviderId.PASSWORD) && user.emailVerified)) {
                    // get user from database only in case the user is logged in with google or his email is verified
                    const ref = doc(this.db, 'users', user?.uid);
                    return docData(ref).pipe(
                        // sharing same result of user for all subscirbers
                        takeUntil(this.userIsGettingDeleted$),
                        shareReplay(1),
                        switchMap((data: DocumentData): Observable<IUser | null> => {
                            if (data) {
                                // user exists in database
                                return of(data) as Observable<IUser>;
                            }

                            // add new user to database
                            this.storage.setLocalStorage(user.uid, 'new');
                            const newUser = this.populateUser(user);
                            return from(setDoc(ref, newUser)).pipe(
                                take(1),
                                // returning null since docData will listen to the change and rerun on its own,
                                // so no need to return anything at this stage.
                                map(() => null)
                            );
                        })
                    );
                } else {
                    // temp user to avoid breaking the app (it won't affect since there are guards for non google non verified emails)
                    const newUser = this.populateUser(user);
                    return of(newUser);
                }
            })
        );
    }

    hasProvider(user: User, providerId: (typeof ProviderId)[keyof typeof ProviderId]) {
        return user.providerData.find((info: UserInfo) => info.providerId == providerId);
    }

    populateUser({ uid, displayName, email, phoneNumber, photoURL }: User) {
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

    getUserDisplay(user: IUser) {
        let name = '';
        if (user.firstName) {
            name = user.firstName + ' ' + user.lastName;
        } else if (user.email) {
            name = user.email;
        }
        return name;
    }

    registerNewAccount(email: string, password: string) {
        return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(take(1));
    }

    sendVerificationEmail(user: User) {
        return from(
            sendEmailVerification(user, {
                url: this.appSettings.getUrlOrigin() + (this.route.snapshot.queryParams['returnUrl'] || '/home'),
            })
        );
    }

    loginWithGoogle() {
        return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(take(1));
    }

    loginWithEmailAndPassword(email: string, password: string) {
        return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(take(1));
    }

    forgetPassword(email: string) {
        return from(
            sendPasswordResetEmail(this.auth, email, {
                url: this.appSettings.getUrlOrigin() + '/auth/login?passwordChanged=true',
            })
        ).pipe(take(1));
    }

    logout() {
        return from(signOut(this.auth)).pipe(take(1));
    }

    updateUser(user: IUser): Observable<void> {
        const ref = doc(this.db, 'users', user.uid);
        return from(updateDoc(ref, { ...user }));
    }

    deleteUser(user: User) {
        const ref = doc(this.db, 'users', user.uid);
        this.userIsGettingDeleted$.next(true);
        return from(deleteDoc(ref)).pipe(
            switchMap(() => {
                return deleteUser(user);
            })
        );
    }
}
