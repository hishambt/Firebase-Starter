import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { take, Subscription } from 'rxjs';
import { authState, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthUser } from '../../../shared/models/IUser.model';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent implements OnInit {
	private authService = inject(AuthService);
	private auth = inject(Auth);
	private router = inject(Router);

	signOut$: Subscription | null = null;
	verifyEmail$: Subscription | null = null;

	user: AuthUser = null;

	ngOnInit(): void {
		authState(this.auth)
			.pipe(take(1))
			.subscribe((user: AuthUser) => {
				if (user) {
					this.user = user;
				}
			});
	}

	verifyEmail(): void {
		this.verifyEmail$ = this.authService.sendVerificationEmail(this.user!).pipe(take(1)).subscribe();
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
