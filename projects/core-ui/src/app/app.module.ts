import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, createAnimation } from '@ionic/angular';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { FunctionsModule } from '@angular/fire/functions';
import { connectFirestoreEmulator, getFirestore, provideFirestore, initializeFirestore, Firestore } from '@angular/fire/firestore';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { provideAuth, connectAuthEmulator, getAuth } from '@angular/fire/auth';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { environment } from 'projects/core-ui/src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { LoadingHttpInterceptorService } from './core/interceptors/loading-http.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		IonicModule.forRoot({
			navAnimation: (_baseEl, opts) => {
				const { enteringEl, leavingEl } = opts;
				const enteringPage = createAnimation('entering-page-animation')
					.addElement(enteringEl)
					.duration(250)
					.fromTo('transform', 'translateY(20px)', 'translateY(0px)')
					.fromTo('opacity', '0.6', '1');
				const leavingPage = createAnimation('leaving-page-animation').addElement(leavingEl).fromTo('opacity', 0, 0);

				return createAnimation('root-transition').easing('ease-in-out').addAnimation([enteringPage, leavingPage]);
			},
		}),
		AppRoutingModule,
		HttpClientModule,
		FunctionsModule,
		ShellModule,
		// provideAnalytics(() => getAnalytics()),
		provideAuth(() => {
			const auth = getAuth();

			if (environment.useEmulators) {
				connectAuthEmulator(auth, 'http://localhost:9099', {
					disableWarnings: true,
				});
			}

			return auth;
		}),
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => {
			let firestore: Firestore;

			if (environment.useEmulators) {
				firestore = initializeFirestore(getApp(), {
					experimentalForceLongPolling: true,
				});

				connectFirestoreEmulator(firestore, 'localhost', 8080);
			} else {
				firestore = getFirestore();
			}

			return firestore;
		}),
		provideStorage(() => {
			const storage = getStorage();

			if (environment.useEmulators) {
				connectStorageEmulator(storage, 'localhost', 9199);
			}

			return storage;
		}),
	],
	providers: [
		{
			provide: RouteReuseStrategy,
			useClass: IonicRouteStrategy,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoadingHttpInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
