import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppSettingsService } from '../../shared/services/app-settings.service';

@Injectable()
export class LoadingHttpInterceptorService implements HttpInterceptor {
	activeRequests: number = 0;

	constructor(
		private appSettingsService: AppSettingsService,
		private _snackBar: MatSnackBar,
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.activeRequests === 0) {
			this.appSettingsService.toggleIsLoading(true);
		}

		this.activeRequests++;

		return next.handle(request).pipe(
			catchError((error: Error) => {
				this._snackBar.open(error.message, 'Ok', {
					horizontalPosition: 'center',
					verticalPosition: 'top',
					panelClass: ['mat-toolbar', 'mat-warn'],
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
