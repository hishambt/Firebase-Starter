import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
// import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
	router = inject(Router);
	authService = inject(AuthService);
	// private _snackBar = inject(MatSnackBar);

	form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
	});

	isWaiting: boolean = false;

	submitRecord(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		this.isWaiting = true;
		const { email } = this.form.value;

		this.authService
			.forgetPassword(email)
			.pipe(
				finalize(() => {
					this.isWaiting = false;
				}),
			)
			.subscribe({
				next: () => this.onPasswordReset(`An email has been sent to ${email}`),
				error: (error: Error) => this.onPasswordReset(error.message, true),
			});
	}

	onPasswordReset(message: string, error: boolean = false): void {
		const snackBarClass = error ? 'mat-warn' : 'mat-primary';

		// this._snackBar.open(message, 'Ok', {
		// 	horizontalPosition: 'center',
		// 	verticalPosition: 'top',
		// 	panelClass: ['mat-toolbar', snackBarClass],
		// });
	}
}