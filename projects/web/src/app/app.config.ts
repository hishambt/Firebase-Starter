import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { IonicRouteStrategy, createAnimation, provideIonicAngular } from '@ionic/angular/standalone';
import { take } from 'rxjs';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/http.interceptor';
import { modules } from './app.modules';

const animationDuration = 150;

export const appConfig: ApplicationConfig = {
	providers: [
		provideIonicAngular({
			mode: 'md',
			navAnimation: (_baseEl, opts) => {
				const enteringAnimation = createAnimation()
					.addElement(opts.enteringEl)
					.fromTo('opacity', 0, 1)
					.delay(animationDuration)
					.duration(animationDuration);
				const leavingAnimation = createAnimation()
					.addElement(opts.leavingEl)
					.fromTo('opacity', 1, 0)
					.duration(animationDuration);
				const animation = createAnimation()
					.addAnimation(enteringAnimation)
					.addAnimation(leavingAnimation);

				return animation;
			},
		}),
		provideHttpClient(withInterceptors([authInterceptor])),
		importProvidersFrom(modules),
		{
			provide: RouteReuseStrategy,
			useClass: IonicRouteStrategy,
		},
		provideRouter(routes, withComponentInputBinding()),
		{
			provide: APP_INITIALIZER,
			useFactory: initializeWhiteLabeling,
			deps: [HttpClient],
			multi: true,
		},
	],
};
// Initialize whitelabeling function (Get app config)
export function initializeWhiteLabeling(httpClient: HttpClient) {
	// returning promise so that getting this file is blocking to the UI
	// TODO: For whitelabeling purposes (it can be a get request from a DB instead of a json file)
	// Delay is added here to test that it is really blocking the UI
	return (): Promise<void> =>
		new Promise((resolve, _reject) => {
			httpClient
				.get('/assets/test.json')
				.pipe(take(1) /*delay(5000)*/)
				.subscribe((_res) => {
					resolve();
				});
		});
}
