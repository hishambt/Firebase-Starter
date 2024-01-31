import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { home, people, settings, person, star, archive } from 'ionicons/icons';

import { IMenuItem, appPages } from './side-navbar';

@Component({
	selector: 'app-side-navbar',
	templateUrl: './side-navbar.component.html',
	styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent {
	appPages: Array<IMenuItem> = appPages;
	routeSubscription: Subscription = new Subscription();
	router = inject(Router);

	constructor() {
		addIcons({
			home,
			people,
			settings,
			person,
			star,
			archive,
		});
	}

	ngOnInit(): void {
		this.routeSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.resetMenu();
				this.openActiveMenus(event.url);
			}
		});
	}

	resetMenu(): void {
		this.appPages.forEach((page: IMenuItem) => {
			page.open = false;
		});
	}

	openActiveMenus(url: string): void {
		this.appPages.forEach((page: IMenuItem) => {
			if (page.children) {
				page.children.forEach((sub: IMenuItem) => {
					if (sub.url == url) {
						page.open = true;
					}
				});
			}
		});
	}
}
