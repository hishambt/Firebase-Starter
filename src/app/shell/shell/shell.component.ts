import { Component, OnDestroy, ViewChild, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { AuthService } from '../../core/services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { StorageAccessorService } from 'src/app/shared/services/storage-accessor.service';
import { take } from 'rxjs';
import { IUser } from 'src/app/shared/models/IUser.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
    media = inject(MediaMatcher);
    _cdr = inject(ChangeDetectorRef);
    mobileQuery: MediaQueryList = this.media.matchMedia('(max-width: 767px)');
    authService = inject(AuthService);
    storage = inject(StorageAccessorService);
    $user = this.authService.currentUserProfile$;
    _snackBar = inject(MatSnackBar);

    private _mobileQueryListener = () => this._cdr.detectChanges();

    constructor() {
        this.mobileQuery.addEventListener('change', this._mobileQueryListener, false);
    }

    ngOnInit() {
        this.$user.pipe(take(1)).subscribe((user: IUser | null) => {
            if (this.storage.checkExistance(user?.uid!)) {
                this.storage.removeLocalStorageKey(user?.uid!);
                this._snackBar.open(`Welcome ${this.authService.getUserDisplay(user!)}`, '', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    panelClass: ['mat-toolbar', 'mat-primary'],
                    duration: 3000,
                });
            }
        });
    }
}
