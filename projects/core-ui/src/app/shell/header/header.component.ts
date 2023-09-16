import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from 'projects/core-ui/src/app/shared/models/IUser.model';
import { CustomToastService } from 'projects/core-ui/src/app/shared/services/custom-snackbar.service';

import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	authService = inject(AuthService);
	router = inject(Router);
	_customToastService = inject(CustomToastService);

	@Output() toggleDrawer = new EventEmitter();

	user$ = this.authService.currentUserProfile$;

	revealId(id: string): void {
		this._customToastService.openSnackBar(id, 0);
	}

	logout(): void {
		this.authService.logout().subscribe(() => {
			this.router.navigateByUrl('auth/login', { replaceUrl: true });
		});
	}

	getUserDisplay(user: IUser): string {
		if (!user) {
			return '';
		}

		return this.authService.getUserDisplay(user);
	}
}
