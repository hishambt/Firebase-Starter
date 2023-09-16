import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { AppToastService } from 'projects/core-ui/src/app/shared/services/app-toast.service';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	router = inject(Router);
	route = inject(ActivatedRoute);
	authService = inject(AuthService);
	_appToast = inject(AppToastService);

	form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.required]),
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
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const { email, password } = this.form.value;

		this.login$ = this.loginFollowUp(this.authService.loginWithEmailAndPassword(email, password));
	}

	loginFollowUp(login: Observable<UserCredential>): Subscription | null {
		return login
			.pipe(
				take(1),
				switchMap(() => {
					return this.authService.currentUserProfile$.pipe(take(1));
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

	loginWithGoogle(): void {
		this.loginWithGoogle$ = this.loginFollowUp(this.authService.loginWithGoogle());
	}
}
