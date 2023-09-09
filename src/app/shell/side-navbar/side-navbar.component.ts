import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppSettingsService } from '../../shared/services/app-settings.service';
import { IMenuItem, appPages } from './side-navbar';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/shared/models/IUser.model';

@Component({
	selector: 'app-side-navbar',
	templateUrl: './side-navbar.component.html',
	styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent {
	appPages: Array<IMenuItem> = appPages;
	routeSubscription: Subscription = new Subscription();
	appSettingsService = inject(AppSettingsService);
	router = inject(Router);
	authService = inject(AuthService);
	user$ = this.authService.currentUserProfile$;

	ngOnInit(): void {
		this.routeSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
			}
		});
	}

	getUserDisplay(user: IUser) {
		return this.authService.getUserDisplay(user);
	}
}
