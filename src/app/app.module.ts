import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { FunctionsModule } from '@angular/fire/functions';
import { connectFirestoreEmulator, getFirestore, provideFirestore, initializeFirestore, Firestore } from '@angular/fire/firestore';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { provideAuth, connectAuthEmulator, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShellModule } from './shell/shell.module';
import { LoadingHttpInterceptorService } from './core/interceptors/loading-http.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
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
