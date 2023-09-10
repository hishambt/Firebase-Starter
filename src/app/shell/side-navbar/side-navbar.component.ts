import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
	activeRoute: string = '';

	ngOnInit(): void {
		this.routeSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.activeRoute = event.url;
				this.resetMenu();
				this.openActiveMenus();
			}
		});
	}

	resetMenu() {
		this.appPages.forEach((page: IMenuItem) => {
			page.open = false;
		});
	}

	openActiveMenus() {
		this.appPages.forEach((page: IMenuItem) => {
			if (page.children) {
				page.children.forEach((sub: IMenuItem) => {
					if (sub.url == this.activeRoute) {
						page.open = true;
					}
				});
			}
		});
	}

	isOneChildActive(children: IMenuItem[]) {
		return children.some((page) => page?.url == this.activeRoute);
	}
}
