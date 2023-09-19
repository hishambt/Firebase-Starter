import { Component, inject } from '@angular/core';
import { take, switchMap, tap } from 'rxjs/operators';
import { Auth, User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';

import { AuthUser, IUser } from 'projects/core-ui/src/app/shared/models/IUser.model';
import { AuthService } from 'projects/core-ui/src/app/core/services/auth.service';
import { environment } from 'projects/core-ui/src/environments/environment';
import { AppToastService } from 'projects/core-ui/src/app/shared/services/app-toast.service';

import { ImageUploadService } from '../../../shared/services/image-upload.service';

@Component({
	selector: 'app-profile-view',
	templateUrl: './profile-view.component.html',
	styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent {
	authService = inject(AuthService);
	auth = inject(Auth);
	router = inject(Router);
	_appToast = inject(AppToastService);

	saveProfile$: Subscription | null = null;
	deleteUser$: Subscription | null = null;
	changingPassword$: Subscription | null = null;

	alertButtons = [
		{
			text: 'Cancel',
			role: 'cancel',
			handler: (): void => {
				console.log('Cancel');
			},
		},
		{
			text: 'OK',
			role: 'confirm',
			handler: (): void => {
				this.deleteUser();
			},
		},
	];

	form: FormGroup = new FormGroup({
		firstName: new FormControl('', [Validators.required]),
		lastName: new FormControl(''),
		phone: new FormControl(''),
		address: new FormControl(''),
	});

	imageUploadService = inject(ImageUploadService);

	$user = this.authService.currentUserProfile$.pipe(
		take(1),
		tap((user: IUser | null) => {
			this.form.patchValue({
				firstName: user?.firstName,
				lastName: user?.lastName,
				phone: user?.phone,
				address: user?.address,
			});
		}),
	);

	uploadFile(event: Event, user: IUser): void {
		const target = event.target as HTMLInputElement;
		const file: File | null = (target.files?.length && target.files[0]) || null;

		if (!target || !file) {
			return;
		}

		this.imageUploadService
			.uploadImage(file, `${environment.profileCDNPath}${user.uid}`)
			.pipe(
				take(1),
				switchMap((photoURL: string) => {
					user.photoURL = photoURL;

					return this.authService.updateUser(user);
				}),
			)
			.subscribe({
				next: () => {},
				error: (_error: Error) => {
					this._appToast.createToast('Image format not supported, or file size exceeds the 2mb limit!', 0);
				},
			});
	}

	linkAccount(): void {
		this.changingPassword$ = this.authService
			.userProvider((user: User | null) => {
				if (!user) {
					return of(null);
				}

				return this.authService.linkUser(user);
			})
			.subscribe({
				next: (creds: UserCredential | null) => console.log(creds),
				error: () => null,
			});
	}

	submitRecord(user: IUser): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const { firstName, lastName } = this.form.value;
		const updatedUser = { ...user, firstName, lastName };

		this.saveProfile$ = this.authService
			.updateUser(updatedUser)
			.pipe(take(1))
			.subscribe({
				next: () => {},
				error: (_error: Error) => {
					this._appToast.createToast('Opps! Please try gain later.', 0);
				},
			});
	}

	deleteUser(): void {
		this.deleteUser$ = this.authService
			.userProvider((user: AuthUser): Observable<void> => {
				if (!user) {
					return of(undefined);
				}

				return this.authService.deleteUser(user);
			})
			.subscribe({
				next: () => {
					this.router.navigateByUrl('auth/login', { replaceUrl: true });
				},
				error: (_error: Error) => {
					this._appToast.createToast('Opps! Please try gain later.', 0);
				},
			});
	}

	setResult(event: Event): void {
		console.log(`Dismissed with role: ${event}`);
	}
}
