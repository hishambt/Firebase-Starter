import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { AppToastService } from 'projects/web/src/app/shared/services/app-toast.service';
import { ConvertToForm, FB } from '@softside/ui-sdk/lib/_utils';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
	router = inject(Router);
	route = inject(ActivatedRoute);
	authService = inject(AuthService);
	_appToast = inject(AppToastService);
	cdr = inject(ChangeDetectorRef);

	form: LoginForm = FB.group({
		email: FB.string(),
		password: FB.string(),
	});

	login$: Subscription | null = null;
	loginWithGoogle$: Subscription | null = null;

	ngOnInit(): void {
		const success = this.route.snapshot.queryParams['passwordChanged'];

		if (success) {
			this._appToast.createToast('You have successfully changed your password', 0);
		}
	}

	submitRecord(): void {
		const { email, password } = this.form.getRawValue();

		this.login$ = this.loginFollowUp(this.authService.loginWithEmailAndPassword(email, password));
	}

	loginWithGoogle(): void {
		this.loginWithGoogle$ = this.loginFollowUp(this.authService.loginWithGoogle());
	}

	loginFollowUp(login: Observable<UserCredential>): Subscription | null {
		return login
			.pipe(
				switchMap(() => {
					return this.authService.currentUserProfile$;
				}),
			)
			.subscribe({
				next: () => this.onSuccess(),
				error: (error: Error) => this.onFailure(error.message),
			});
	}

	onSuccess(): void {
		const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
		this.router.navigateByUrl(returnUrl, { replaceUrl: true });
		this._appToast.dismissSnackBar();
	}

	onFailure(message: string): void {
		this._appToast.createToast(message, 0, {
			color: 'danger',
			size: 'small',
		});
	}

	ngOnDestroy(): void {
		this.login$?.unsubscribe();
		this.loginWithGoogle$?.unsubscribe();
	}
}

type Login = {
	email: string;
	password: string;
};
type LoginForm = ConvertToForm<Login>;
