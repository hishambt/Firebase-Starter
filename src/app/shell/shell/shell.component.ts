import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ToastController } from '@ionic/angular';

import { IUser } from 'src/app/shared/models/IUser.model';
import { StorageAccessorService } from 'src/app/shared/services/storage-accessor.service';

import { AuthService } from '../../core/services/auth.service';
import { IMenuItem, appPages } from '../side-navbar/side-navbar';

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
	appPages: Array<IMenuItem> = appPages;
	toast = inject(ToastController);
	authService = inject(AuthService);
	storage = inject(StorageAccessorService);
	$user = this.authService.currentUserProfile$;

	ngOnInit(): void {
		this.$user.pipe(take(1)).subscribe((user: IUser | null) => {
			if (this.storage.checkExistance(user!.uid)) {
				this.storage.removeLocalStorageKey(user!.uid);

				this.toast
					.create({
						message: `Welcome ${this.authService.getUserDisplay(user!)}`,
						duration: 3000,
						position: 'top',
					})
					.then((toast) => {
						toast.present();
					});
			}
		});
	}
}
