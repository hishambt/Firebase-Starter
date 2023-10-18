import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ISSEmail } from 'softside-ui/lib/ui/controls';

import { AuthService } from '../../services/auth.service';
import { AppToastService, ToastClass } from '../../../shared/services/app-toast.service';

@Component({
	selector: 'app-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgetPasswordComponent implements OnDestroy {
	router = inject(Router);
	authService = inject(AuthService);
	_appToast = inject(AppToastService);

	form: FormGroup<ISSEmail> = new FormGroup({
		email: new FormControl<string>('', { nonNullable: true }),
	});

	forget$: Subscription | null = null;

	submitRecord(): void {
		if (this.form.invalid) {
			return;
		}

		const { email } = this.form.getRawValue();

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

	ngOnDestroy(): void {
		this.forget$?.unsubscribe();
	}
}
