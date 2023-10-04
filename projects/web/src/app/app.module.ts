import {
	APP_INITIALIZER,
	NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {
	IonicModule,
	IonicRouteStrategy,
	createAnimation,
} from '@ionic/angular';
import {
	provideFirebaseApp,
	initializeApp,
	getApp,
} from '@angular/fire/app';
import {
	connectFirestoreEmulator,
	getFirestore,
	provideFirestore,
	initializeFirestore,
	Firestore,
} from '@angular/fire/firestore';
import {
	connectStorageEmulator,
	getStorage,
	provideStorage,
} from '@angular/fire/storage';
import {
	provideAuth,
	connectAuthEmulator,
	getAuth,
} from '@angular/fire/auth';
import {
	HTTP_INTERCEPTORS,
	HttpClient,
	HttpClientModule,
} from '@angular/common/http';
import { take } from 'rxjs';

import { environment } from 'projects/web/src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { LoadingHttpInterceptorService } from './core/interceptors/loading-http.interceptor';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(
			{
				navAnimation:
					(
						_baseEl,
						opts,
					) => {
						const enteringAnimation =
							createAnimation()
								.addElement(
									opts.enteringEl,
								)
								.fromTo(
									'opacity',
									0,
									1,
								)
								.delay(
									100,
								)
								.duration(
									100,
								);
						const leavingAnimation =
							createAnimation()
								.addElement(
									opts.leavingEl,
								)
								.fromTo(
									'opacity',
									1,
									0,
								)
								.duration(
									100,
								);
						const animation =
							createAnimation()
								.addAnimation(
									enteringAnimation,
								)
								.addAnimation(
									leavingAnimation,
								);

						return animation;
					},
			},
		),
		AppRoutingModule,
		HttpClientModule,
		// FunctionsModule,
		ShellModule,
		// provideAnalytics(() => getAnalytics()),
		provideAuth(
			() => {
				const auth =
					getAuth();

				if (
					environment.useEmulators
				) {
					connectAuthEmulator(
						auth,
						'http://localhost:9099',
						{
							disableWarnings:
								true,
						},
					);
				}

				return auth;
			},
		),
		provideFirebaseApp(
			() =>
				initializeApp(
					environment.firebase,
				),
		),
		provideFirestore(
			() => {
				let firestore: Firestore;

				if (
					environment.useEmulators
				) {
					firestore =
						initializeFirestore(
							getApp(),
							{
								experimentalForceLongPolling:
									true,
							},
						);

					connectFirestoreEmulator(
						firestore,
						'localhost',
						8080,
					);
				} else {
					firestore =
						getFirestore();
				}

				return firestore;
			},
		),
		provideStorage(
			() => {
				const storage =
					getStorage();

				if (
					environment.useEmulators
				) {
					connectStorageEmulator(
						storage,
						'localhost',
						9199,
					);
				}

				return storage;
			},
		),
	],
	providers: [
		{
			provide:
				RouteReuseStrategy,
			useClass:
				IonicRouteStrategy,
		},
		{
			provide:
				HTTP_INTERCEPTORS,
			useClass:
				LoadingHttpInterceptorService,
			multi: true,
		},
		{
			provide:
				APP_INITIALIZER,
			useFactory:
				initializeWhiteLabeling,
			deps: [
				HttpClient,
			],
			multi: true,
		},
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule { }
// End of App module
// -----------------
// Initialize whitelabeling function (Get app config)
export function initializeWhiteLabeling(
	httpClient: HttpClient,
) {
	// returning promise so that getting this file is blocking to the UI
	// TODO: For whitelabeling purposes (it can be a get request from a DB instead of a json file)
	// Delay is added here to test that it is really blocking the UI
	return (): Promise<void> =>
		new Promise(
			(
				resolve,
				_reject,
			) => {
				httpClient
					.get(
						'/assets/test.json',
					)
					.pipe(
						take(
							1,
						) /*delay(5000)*/,
					)
					.subscribe(
						(
							_res,
						) => {
							resolve();
						},
					);
			},
		);
}
