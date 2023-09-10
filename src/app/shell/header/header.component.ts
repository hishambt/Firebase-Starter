import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { IUser } from 'src/app/shared/models/IUser.model';
import { CustomToastService } from 'src/app/shared/services/custom-snackbar.service';

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
			this.router.navigateByUrl('auth/login');
		});
	}

	getUserDisplay(user: IUser) {
		if (!user) return '';
		return this.authService.getUserDisplay(user);
	}
}
