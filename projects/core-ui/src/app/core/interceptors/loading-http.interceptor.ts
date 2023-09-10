import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AppSettingsService } from '../../shared/services/app-settings.service';
import { ToastController } from '@ionic/angular';

@Injectable()
export class LoadingHttpInterceptorService implements HttpInterceptor {
	activeRequests: number = 0;
	toast = inject(ToastController);

	constructor(private appSettingsService: AppSettingsService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.activeRequests === 0) {
			this.appSettingsService.toggleIsLoading(true);
		}

		this.activeRequests++;

		return next.handle(request).pipe(
			catchError((error: Error) => {
				this.toast
					.create({
						message: error.message,
						duration: 1500,
						position: 'top',
					})
					.then((toast) => {
						toast.present();
					});

				return throwError(() => error);
			}),
			finalize(() => {
				this.activeRequests--;

				if (this.activeRequests === 0) {
					this.appSettingsService.toggleIsLoading(false);
				}
			}),
		);
	}
}
