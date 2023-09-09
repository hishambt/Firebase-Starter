import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	public appPages = [
		{ title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
		{ title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
		{ title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
		{ title: 'Archived', url: '/folder/archived', icon: 'archive' },
		{ title: 'Trash', url: '/folder/trash', icon: 'trash' },
		{ title: 'Spam', url: '/folder/spam', icon: 'warning' },
	];
	public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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
}
