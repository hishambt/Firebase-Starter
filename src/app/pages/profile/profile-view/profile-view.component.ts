import { Component, inject } from '@angular/core';
import { take, switchMap } from 'rxjs/operators';
import { Auth, User, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-profile-view',
	templateUrl: './profile-view.component.html',
	styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent {
	authService = inject(AuthService);
	auth = inject(Auth);
	router = inject(Router);
	$user = this.authService.currentUserProfile$;
	deletingUser = false;

	get actions(): typeof Actions {
		return Actions;
	}

	deleteUser<Actions>(action: Actions): void {
		switch (action) {
			case this.actions.save:
				console.log('Save', 'To be implemented');
				break;
			case this.actions.delete:
				this.deletingUser = true;
				authState(this.auth)
					.pipe(
						take(1),
						switchMap((user: User | null) => {
							return this.authService.deleteUser(user!);
						}),
					)
					.subscribe({
						next: () => this.router.navigateByUrl('/auth/login'),
					});

				break;
			default:
				break;
		}
	}
}

enum Actions {
	save,
	delete,
}
