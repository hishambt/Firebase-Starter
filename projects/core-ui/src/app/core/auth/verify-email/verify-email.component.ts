import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { take, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthUser } from '../../../shared/models/IUser.model';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent {
	private authService = inject(AuthService);
	private router = inject(Router);

	signOut$: Subscription | null = null;
	verifyEmail$: Subscription | null = null;

	user$ = this.authService.currentUserProfile$;

	verifyEmail(): void {
		this.verifyEmail$ = this.authService
			.userProvider((user: AuthUser) => {
				return this.authService.sendVerificationEmail(user!).pipe(take(1));
			})
			.subscribe();
	}

	logout(): void {
		this.signOut$ = this.authService
			.logout()
			.pipe(take(1))
			.subscribe(() => {
				this.router.navigateByUrl('auth/login', { replaceUrl: true });
			});
	}
}
