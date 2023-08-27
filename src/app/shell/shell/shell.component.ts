import { Component, OnDestroy, ViewChild, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { AuthService } from '../../core/services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
    media = inject(MediaMatcher);
    _cdr = inject(ChangeDetectorRef);
    mobileQuery: MediaQueryList = this.media.matchMedia('(max-width: 767px)');
    private _mobileQueryListener = () => this._cdr.detectChanges();

    constructor() {
        this.mobileQuery.addEventListener('change', this._mobileQueryListener, false);
    }
}
