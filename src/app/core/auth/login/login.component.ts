import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, finalize, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserCredential } from '@angular/fire/auth';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.required]),
	});

	emailPasswordLoading: boolean = false;
	googleLoading: boolean = false;

	constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private _snackBar: MatSnackBar) {}

	ngOnInit(): void {
		const success = this.route.snapshot.queryParams['passwordChanged'];

		if (success) {
			this.openSnackBar('You have successfully changed your password');
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
		this.openSnackBar(message, true);
	}

	loginWithGoogle(): void {
		this.googleLoading = true;
		this.loginFollowUp(this.authService.loginWithGoogle());
	}

	openSnackBar(message: string, error: boolean = false): void {
		const snackBarClass = error ? 'mat-warn' : 'mat-primary';

		this._snackBar.open(message, 'Ok', {
			horizontalPosition: 'center',
			verticalPosition: 'top',
			panelClass: ['mat-toolbar', snackBarClass],
		});
	}

	ngOnDestroy(): void {
		this._snackBar.dismiss();
	}
}
