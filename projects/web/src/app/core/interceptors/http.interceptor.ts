import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ToastController } from '@ionic/angular/standalone';

import { AppSettingsService } from '../../shared/services/app-settings.service';

let activeRequests = 0;

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const toastController = inject(ToastController);
	const appSettingsService = inject(AppSettingsService);

	if (activeRequests === 0) {
		appSettingsService.toggleIsLoading(true);
	}

	activeRequests++;

	return next(request).pipe(
		catchError((error: Error) => {
			toastController
				.create({
					message: error.message,
					duration: 1500,
					position: 'top',
				})
				.then((toast) => {
					toast.present();
				});

			throw new Error(error.message);
		}),
		finalize(() => {
			activeRequests--;

			if (activeRequests === 0) {
				appSettingsService.toggleIsLoading(false);
			}
		}),
	);
};
