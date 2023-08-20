import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from '../../shared/services/app-settings.service';
import { IMenuItem, items } from './side-navbar';

@Component({
	selector: 'app-side-navbar',
	templateUrl: './side-navbar.component.html',
	styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {
	menuList: Array<IMenuItem> = items;
	constructor(private appSettingsService: AppSettingsService) {}

	ngOnInit(): void {
		this.setActiveExpansionPanel();
	}

	onSelect(e: any) {
		e.selected = !e.selected;
	}

	//#region Private
	private setActiveExpansionPanel(): void {
		const urlRoute = this.appSettingsService.getUrlRoute();
		const routeElements = this.appSettingsService.getRouteParam(urlRoute);
		const route = routeElements.join('/').replace(/\/add|\/edit|\/config|\/view/g, '');
		const node = this.menuList.find((x: IMenuItem) => {
			if (x.children) {
				if (x.children.find((i) => i.routerLink === `${'/'}${route}`)) {
					return x;
				}
			}

			return undefined;
		});

		if (node) {
			const nodeIndex = this.menuList.findIndex((x) => x.children && x.text === node.text);
			this.menuList[nodeIndex].expanded = true;
			this.menuList[nodeIndex].selected = true;
		}
	}

	private resetMenuExpanded() {
		this.menuList.forEach((x) => {
			if (x.children) {
				x.expanded == false;
			}
		});
	}
	//#region
}
