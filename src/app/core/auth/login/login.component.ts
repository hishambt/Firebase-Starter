import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, finalize, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { CustomSnackBarService } from 'src/app/shared/services/custom-snackbar.service';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	router = inject(Router);
	route = inject(ActivatedRoute);
	authService = inject(AuthService);
	_customSnackBar = inject(CustomSnackBarService);

	form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.required]),
	});

	emailPasswordLoading: boolean = false;
	googleLoading: boolean = false;

	ngOnInit(): void {
		const success = this.route.snapshot.queryParams['passwordChanged'];

		if (success) {
			this._customSnackBar.openSnackBar('You have successfully changed your password');
		}
	}

	submitRecord(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		this.emailPasswordLoading = true;
		const { email, password } = this.form.value;

		this.loginFollowUp(this.authService.loginWithEmailAndPassword(email, password));
	}

	loginFollowUp(login: Observable<UserCredential>): void {
		login
			.pipe(
				take(1),
				switchMap(() => {
					return this.authService.currentUserProfile$.pipe(take(1));
				}),
				finalize(() => {
					this.emailPasswordLoading = false;
					this.googleLoading = false;
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
		this._customSnackBar.openSnackBar(message, true);
	}

	loginWithGoogle(): void {
		this.googleLoading = true;
		this.loginFollowUp(this.authService.loginWithGoogle());
	}

	ngOnDestroy(): void {
		this._customSnackBar.dismissSnackBar();
	}
}
