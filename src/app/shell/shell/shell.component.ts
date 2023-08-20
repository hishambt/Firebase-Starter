import { Component, OnDestroy, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { AuthService } from '../../core/services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor(
		private authService: AuthService,
		private media: MediaMatcher,
		private changeDetectorRef: ChangeDetectorRef,
	) {
		this.mobileQuery = media.matchMedia('(max-width: 576px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addEventListener('change', this._mobileQueryListener, false);
	}
}
