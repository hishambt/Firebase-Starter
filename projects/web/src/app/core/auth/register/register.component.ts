import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { Subscription, Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { AppToastService } from 'projects/web/src/app/shared/services/app-toast.service';
import { ConvertToForm, FB } from '@softside/ui-sdk/lib/_utils';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
	authService = inject(AuthService);
	route = inject(ActivatedRoute);
	router = inject(Router);
	_appToast = inject(AppToastService);

	form: RegisterForm = FB.group({
		email: FB.string(''),
		confirmPasswordGroup: FB.group({
			password: FB.string(''),
			confirmPassword: FB.string(''),
		}),
	});

	register$: Subscription | null = null;

	submitRecord(): void {
		if (this.form.invalid) {
			return;
		}

		const {
			email,
			confirmPasswordGroup: { password },
		} = this.form.getRawValue();

		this.register$ = this.registerFollowUp(
			this.authService.registerNewAccount(email, password).pipe(
				switchMap((creds: UserCredential) => {
					return this.authService.sendVerificationEmail(creds.user);
				}),
			),
		);
	}

	registerFollowUp(register: Observable<void>): Subscription | null {
		return register.subscribe({
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

	ngOnDestroy(): void {
		this.register$?.unsubscribe();
	}
}

type Register = {
	email: string;
	confirmPasswordGroup: {
		password: string;
		confirmPassword: string;
	};
};
type RegisterForm = ConvertToForm<Register>;
