import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { code, personCircleOutline, idCardOutline, logOutOutline } from 'ionicons/icons';

import { IUser } from 'projects/web/src/app/shared/models/IUser.model';
import { AppToastService } from 'projects/web/src/app/shared/services/app-toast.service';

import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	authService = inject(AuthService);
	router = inject(Router);
	_appToast = inject(AppToastService);

	@Output() toggleDrawer = new EventEmitter();

	user$ = this.authService.currentUserProfile$;

	constructor() {
		addIcons({
			code,
			personCircleOutline,
			idCardOutline,
			logOutOutline,
		});
	}

	revealId(id: string): void {
		this._appToast.createToast(id, 0);
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
