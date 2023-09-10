import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, finalize, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { CustomValidators, ConfirmPasswordMatcher } from 'src/app/shared/helpers/confirmed.validator';
import { CustomToastService } from 'src/app/shared/services/custom-snackbar.service';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	authService = inject(AuthService);
	route = inject(ActivatedRoute);
	router = inject(Router);
	_customSnackBar = inject(CustomToastService);

	form: FormGroup = new FormGroup(
		{
			email: new FormControl<string>('', [Validators.email, Validators.required]),
			password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
			confirmPassword: new FormControl<string>('', [Validators.required]),
		},
		[CustomValidators.MatchValidator('password', 'confirmPassword')],
	);

	matcher = new ConfirmPasswordMatcher();

	emailPasswordLoading: boolean = false;

	get passwordMatchError(): boolean {
		const hasError = this.form.getError('mismatch') && this.form.get('confirmPassword')?.touched;

		return hasError;
	}

	submitRecord(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		this.emailPasswordLoading = true;

		const { email, password } = this.form.value;

		this.registerFollowUp(
			this.authService.registerNewAccount(email, password).pipe(
				switchMap((creds: UserCredential) => {
					return this.authService.sendVerificationEmail(creds.user);
				}),
			),
		);
	}

	registerFollowUp(register: Observable<void>): void {
		register
			.pipe(
				take(1),
				finalize(() => {
					this.emailPasswordLoading = false;
				}),
			)
			.subscribe({
				next: () => this.onSuccess(),
				error: (error: Error) => this.onFailure(error.message),
			});
	}

	onSuccess(): void {
		const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
		this.router.navigateByUrl(returnUrl);
	}

	onFailure(message: string): void {
		this._customSnackBar.openSnackBar(message, 0);
	}
}
