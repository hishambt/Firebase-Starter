import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription, Observable, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { CustomToastService } from 'projects/core-ui/src/app/shared/services/custom-snackbar.service';

import { AuthService } from '../../services/auth.service';

function passwordMatcherValidator(): ValidatorFn {
	return (form: AbstractControl): ValidationErrors | null => {
		const { password, confirmPassword } = form.value;

		if (password && confirmPassword) {
			const isMatching = password === confirmPassword;

			return isMatching ? null : { mismatch: true };
		}

		return null;
	};
}

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
			password: new FormControl<string>('', [Validators.required]),
			confirmPassword: new FormControl<string>('', [Validators.required]),
		},
		{ validators: [passwordMatcherValidator()] },
	);

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
		this._customSnackBar.openSnackBar(message, 0);
	}
}
