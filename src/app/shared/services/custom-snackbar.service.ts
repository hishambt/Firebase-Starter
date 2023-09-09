import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class CustomToastService {
	toast = inject(ToastController);

	openSnackBar(message: string, duration: number, error: boolean = false): void {
		this.toast
			.create({
				message,
				duration,
				position: 'top',
				layout: 'stacked',
			})
			.then((toast) => {
				toast.present();
			});
	}

	dismissSnackBar(): void {
		this.toast.getTop().then((exists) => {
			if (exists) this.toast.dismiss(null);
		});
	}
}
