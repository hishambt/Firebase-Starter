import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { AppToastService, ToastClass } from '../../../shared/services/app-toast.service';

@Component({
	selector: 'app-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
	router = inject(Router);
	authService = inject(AuthService);
	_appToast = inject(AppToastService);
	fb = inject(NonNullableFormBuilder);

	form: FormGroup = this.fb.group({
		email: new FormControl('', [Validators.email, Validators.required]),
	});

	get getEmailError(): string {
		return this.authService.getError(this.form.get('email') as FormControl<string>, 'Email');
	}

	forget$: Subscription | null = null;

	submitRecord(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const { email } = this.form.value;

		this.forget$ = this.authService.forgetPassword(email).subscribe({
			next: () => this.onPasswordReset(`An email has been sent to ${email}`),
			error: (error: Error) => this.onPasswordReset(error.message, true),
		});
	}

	onPasswordReset(message: string, error: boolean = false): void {
		const errorObj: ToastClass = {
			color: 'secondary',
			size: 'medium',
		};

		if (error) {
			errorObj.color = 'danger';
			errorObj.size = 'small';
		}

		this._appToast.createToast(message, 0, errorObj);
	}
}
