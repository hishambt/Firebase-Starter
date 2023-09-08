import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	authService = inject(AuthService);
	router = inject(Router);
	_snackBar = inject(MatSnackBar);

	@Output() toggleDrawer = new EventEmitter();

	user$ = this.authService.currentUserProfile$;

	revealId(id: string): void {
		this._snackBar.open(id, 'Ok', {
			horizontalPosition: 'center',
			verticalPosition: 'top',
			panelClass: ['mat-toolbar', 'mat-accent'],
		});
	}

	logout(): void {
		this.authService.logout().subscribe(() => {
			this.router.navigateByUrl('auth/login');
		});
	}
}
