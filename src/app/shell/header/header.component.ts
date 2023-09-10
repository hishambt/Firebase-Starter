import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { IUser } from 'src/app/shared/models/IUser.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	authService = inject(AuthService);
	router = inject(Router);

	@Output() toggleDrawer = new EventEmitter();

	user$ = this.authService.currentUserProfile$;

	revealId(id: string): void {
		// this._snackBar.open(id, 'Ok', {
		// 	horizontalPosition: 'center',
		// 	verticalPosition: 'top',
		// 	panelClass: ['mat-toolbar', 'mat-accent'],
		// });
	}

	logout(): void {
		this.authService.logout().subscribe(() => {
			this.router.navigateByUrl('auth/login');
		});
	}

	getUserDisplay(user: IUser) {
		return this.authService.getUserDisplay(user);
	}
}
