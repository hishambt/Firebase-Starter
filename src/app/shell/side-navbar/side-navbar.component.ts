import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppSettingsService } from '../../shared/services/app-settings.service';
import { IMenuItem, items } from './side-navbar';

@Component({
	selector: 'app-side-navbar',
	templateUrl: './side-navbar.component.html',
	styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit, OnDestroy {
	menuList: Array<IMenuItem> = items;
	routeSubscription: Subscription = new Subscription();
	appSettingsService = inject(AppSettingsService);
	router = inject(Router);

	ngOnInit(): void {
		this.setActiveMenuItem();
		this.routeSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.resetMenu();
				this.setActiveMenuItem();
			}
		});
	}

	setActiveMenuItem(): void {
		const urlRoute = this.appSettingsService.getUrlRoute();
		const routeElements = this.appSettingsService.getRouteParam(urlRoute);
		const route = routeElements.join('/').replace(/\/add|\/edit|\/config|\/view/g, '');

		this.menuList.forEach((menu: IMenuItem) => {
			if (menu.routerLink === `${'/'}${route}`) {
				menu.selected = true;
			}

			if (menu.children) {
				const node = menu.children.find((i) => i.routerLink === `${'/'}${route}`);

				if (node) {
					menu.expanded = true;
					menu.selected = true;
					node.selected = true;
				}
			}
		});
	}

	resetMenu(): void {
		this.menuList.forEach((item: IMenuItem) => {
			item.selected = false;

			if (item.children) {
				item.expanded = false;
				item.children.forEach((item: IMenuItem) => {
					item.selected = false;
				});
			}
		});
	}

	ngOnDestroy(): void {
		this.routeSubscription.unsubscribe();
	}
}
