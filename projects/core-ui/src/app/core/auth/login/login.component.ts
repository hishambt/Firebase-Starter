import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { AppToastService } from 'projects/core-ui/src/app/shared/services/app-toast.service';

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
	fb = inject(NonNullableFormBuilder);

	form: FormGroup = this.fb.group({
		email: new FormControl<string>('', [Validators.email, Validators.required]),
		password: new FormControl<string>('', [Validators.required]),
	});

	get getEmailError(): string {
		return this.authService.getError(this.form.get('email') as FormControl<string>, 'Email');
	}

	get getPasswordError(): string {
		return this.authService.getError(this.form.get('password') as FormControl<string>, 'Password');
	}

	login$: Subscription | null = null;
	loginWithGoogle$: Subscription | null = null;

	ngOnInit(): void {
		const success = this.route.snapshot.queryParams['passwordChanged'];

		if (success) {
			this._appToast.createToast('You have successfully changed your password', 0);
		}
	}

	submitRecord(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const { email, password } = this.form.value;

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
