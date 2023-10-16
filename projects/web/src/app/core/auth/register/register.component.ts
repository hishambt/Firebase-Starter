import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Subscription, Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { AppToastService } from 'projects/web/src/app/shared/services/app-toast.service';

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
	fb = inject(NonNullableFormBuilder);

	form: FormGroup = this.fb.group({});
	register$: Subscription | null = null;

	submitRecord(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const {
			email,
			confirmPasswordGroup: { password },
		} = this.form.value;

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
