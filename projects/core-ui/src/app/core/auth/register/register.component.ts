import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { AppToastService } from 'projects/core-ui/src/app/shared/services/app-toast.service';

import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../../shared/helpers/confirmed.validator';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	authService = inject(AuthService);
	route = inject(ActivatedRoute);
	router = inject(Router);
	_appToast = inject(AppToastService);

	form: FormGroup = new FormGroup(
		{
			email: new FormControl<string>('', [Validators.email, Validators.required]),
			password: new FormControl<string>('', [Validators.required]),
			confirmPassword: new FormControl<string>('', [Validators.required]),
		},
		{ validators: passwordMatchValidator('password', 'confirmPassword') },
	);

	get getEmailError(): string {
		const email = this.form.get('email');

		if (!email) {
			return '';
		}

		return this.authService.getError(email, 'Email');
	}

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

	register$: Subscription | null = null;

	submitRecord(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const { email, password } = this.form.value;

		this.register$ = this.registerFollowUp(
			this.authService.registerNewAccount(email, password).pipe(
				switchMap((creds: UserCredential) => {
					return this.authService.sendVerificationEmail(creds.user);
				}),
			),
		);
	}

	registerFollowUp(register: Observable<void>): Subscription | null {
		return register.pipe(take(1)).subscribe({
			next: () => this.onSuccess(),
			error: (error: Error) => this.onFailure(error.message),
		});
	}

	onSuccess(): void {
		const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
		this.router.navigateByUrl(returnUrl, { replaceUrl: true });
	}

	onFailure(message: string): void {
		this._appToast.createToast(message, 0, { color: 'danger', size: 'medium' });
	}
}
