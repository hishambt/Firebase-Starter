import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { IUser } from 'projects/web/src/app/shared/models/IUser.model';
import { StorageAccessorService } from 'projects/web/src/app/shared/services/storage-accessor.service';

import { AuthService } from '../../core/services/auth.service';
import { IMenuItem, appPages } from '../side-navbar/side-navbar';
import { AppToastService } from '../../shared/services/app-toast.service';

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
	appPages: Array<IMenuItem> = appPages;
	_appToast = inject(AppToastService);
	authService = inject(AuthService);
	storage = inject(StorageAccessorService);

	user$ = this.authService.currentUserProfile$;

	ngOnInit(): void {
		this.user$.pipe(take(1)).subscribe((user: IUser | null) => {
			if (this.storage.checkExistance(user!.uid)) {
				this.storage.removeLocalStorageKey(user!.uid);

				this._appToast.createToast(`Welcome ${this.authService.getUserDisplay(user!)}`, 3000, {
					color: 'secondary',
					size: 'medium',
				});
			}
		});
	}
}
