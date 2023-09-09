import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class CustomSnackBarService {
	toast = inject(ToastController);

	openSnackBar(message: string, error: boolean = false): void {
		this.toast
			.create({
				message: message,
				position: 'top',
				layout: 'stacked',
			})
			.then((toast) => {
				toast.present();
			});
	}

	dismissSnackBar(): void {
		this.toast.dismiss();
	}
}
