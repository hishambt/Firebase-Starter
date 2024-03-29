import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
	providedIn: 'root',
})
export class AppToastService {
	toast = inject(ToastController);

	createToast(message: string, duration: number, classObj?: ToastClass): void {
		this.dismissSnackBar();

		if (!classObj) {
			classObj = {
				color: 'primary',
				size: 'small',
			};
		}

		this.toast
			.create({
				message,
				duration,
				position: 'top',
				cssClass: `${classObj.color} ${classObj.size}`,
				icon: 'information-circle-outline',
				buttons: [
					{
						text: 'Ok',
					},
				],
			})
			.then((toast) => {
				toast.present();
			});
	}

	dismissSnackBar(): void {
		this.toast.getTop().then((exists) => {
			if (exists) {
				this.toast.dismiss(null);
			}
		});
	}
}
export interface ToastClass {
	color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
	size: 'small' | 'medium' | 'large';
}
