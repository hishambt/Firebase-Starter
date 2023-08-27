import { Component, OnInit, inject } from '@angular/core';

import { AppSettingsService } from '../../shared/services/app-settings.service';
import { IMenuItem, items } from './side-navbar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-side-navbar',
    templateUrl: './side-navbar.component.html',
    styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
    menuList: Array<IMenuItem> = items;

    appSettingsService = inject(AppSettingsService);
    router = inject(Router);

    constructor() {}

    ngOnInit(): void {
        this.setActiveMenuItem();
    }

    linkClicked(e: Event, link: string) {
        e.preventDefault();
        this.resetMenu();
        this.router.navigateByUrl(link).then((res) => {
            this.setActiveMenuItem();
        });
    }

    //#region Private
    private setActiveMenuItem(): void {
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

    private resetMenu() {
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
    //#region
}
