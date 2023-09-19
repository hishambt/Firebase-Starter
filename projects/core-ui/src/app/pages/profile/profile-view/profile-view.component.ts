import { Component, ViewChild, inject } from '@angular/core';
import { take, switchMap, tap } from 'rxjs/operators';
import { Auth, User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { ToggleCustomEvent } from '@ionic/core';
import { IonModal } from '@ionic/angular';

import { AuthUser, IUser } from 'projects/core-ui/src/app/shared/models/IUser.model';
import { AuthService } from 'projects/core-ui/src/app/core/services/auth.service';
import { environment } from 'projects/core-ui/src/environments/environment';
import { AppToastService } from 'projects/core-ui/src/app/shared/services/app-toast.service';

import { ImageUploadService } from '../../../shared/services/image-upload.service';
import { passwordMatchValidator } from '../../../shared/helpers/confirmed.validator';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
	selector: 'app-profile-view',
	templateUrl: './profile-view.component.html',
	styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent {
	@ViewChild('modalChangePassword') modalChangePassword!: IonModal;
	@ViewChild('modalVerifyEmail') modalValidatePassword!: IonModal;

	authService = inject(AuthService);
	auth = inject(Auth);
	router = inject(Router);
	_appToast = inject(AppToastService);
	theme = inject(ThemeService);

	saveProfile$: Subscription | null = null;
	deleteUser$: Subscription | null = null;
	modifyPassword$: Subscription | null = null;
	validatePassword$: Subscription | null = null;

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
		lastName: new FormControl('', [Validators.required]),
		email: new FormControl({ disabled: true, value: '' }),
		phone: new FormControl(''),
		address: new FormControl(''),
	});

	formChangePassword: FormGroup = new FormGroup(
		{
			password: new FormControl<string>('', [Validators.required]),
			confirmPassword: new FormControl<string>('', [Validators.required]),
		},
		{ validators: passwordMatchValidator('password', 'confirmPassword') },
	);

	formValidatePassword: FormGroup = new FormGroup(
		{
			currentPassword: new FormControl<string>('', [Validators.required]),
		},
	);

	get getPasswordError(): string {
		const password = this.form.get('password');

		if (!password) {
			return '';
		}

		return this.authService.getError(password, 'Password');
	}

	get getConfirmPasswordError(): string {
		const confirmPassword = this.form.get('confirmPassword');

		if (!confirmPassword) {
			return '';
		}

		return this.authService.getError(confirmPassword, 'Password');
	}

	imageUploadService = inject(ImageUploadService);

	$user = this.authService.currentUserProfile$.pipe(
		take(1),
		tap((user: IUser | null) => {
			this.form.patchValue({
				firstName: user?.firstName,
				lastName: user?.lastName,
				email: user?.email,
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
				next: () => { },
				error: (_error: Error) => {
					this._appToast.createToast('Image format not supported, or file size exceeds the 2mb limit!', 0);
				},
			});
	}

	submitRecord(user: IUser): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const { firstName, lastName, phone, address } = this.form.value;
		const updatedUser = { ...user, firstName, lastName, phone, address };

		this.saveProfile$ = this.authService
			.updateUser(updatedUser)
			.pipe(take(1))
			.subscribe({
				next: () => { },
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
		console.log(`Dismissed with role: ${(event as ToggleCustomEvent).detail}`);
	}

	confirmChangePassword(): void {
		if (this.formChangePassword.invalid) {
			this.formChangePassword.markAllAsTouched();

			return;
		}

		const { password } = this.formChangePassword.value;

		if (this.authService.loggedInWithGoogle && !this.authService.loggedInWithPassword) {
			this.linkAccount(password);
		} else {
			this.updatePassword(password);
		}

		this.modalChangePassword.dismiss();
	}

	modifyPassword(): void {
		this.authService.loggedInWithPassword ? this.modalValidatePassword.present() : this.modalChangePassword.present();
	}

	confirmValidatePassword(): void {
		if (this.formValidatePassword.invalid) {
			this.formValidatePassword.markAllAsTouched();

			return;
		}

		const { currentPassword } = this.formValidatePassword.value;

		this.validatePassword$ = this.authService.userProvider((user: AuthUser) => {
			if (!user) {
				return of(undefined);
			}

			return this.authService.validatePassword(user, currentPassword);
		}).subscribe({
			next: () => {
				this.modalValidatePassword.dismiss();
				this.modalChangePassword.present();
			},
			error: (_error: Error) => {
				this.formValidatePassword.reset();
				this._appToast.createToast('Opps! Incorrect password.', 2000, { color: 'danger', size: 'small' });
			},
		});

	}

	private updatePassword(currentPassword: string): void {
		this.modifyPassword$ = this.authService.userProvider((user: AuthUser) => {
			if (!user) {
				return of(undefined);
			}

			return this.authService.updatePassword(user, currentPassword);
		}).subscribe({
			next: () => {
				this.authService.logout().subscribe(
					(): void => {
						this.router.navigateByUrl('auth/login', { replaceUrl: true });

					});
			},
			error: (_error: Error) => {
				this._appToast.createToast('Opps! Please try gain later.', 0);
			},
		});

	}

	private linkAccount(password: string): void {
		this.modifyPassword$ = this.authService
			.userProvider((user: User | null) => {
				if (!user) {
					return of(null);
				}

				return this.authService.linkUser(user, password);
			})
			.subscribe({
				next: (_creds: UserCredential | null) => {
					this.authService.loggedInWithPassword = true;
				},
				error: () => null,
			});
	}
}
