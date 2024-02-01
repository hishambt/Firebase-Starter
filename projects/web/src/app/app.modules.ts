import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, Firestore, initializeFirestore, connectFirestoreEmulator, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';

import { environment } from '../environments/environment';

export const modules = [
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
	// FunctionsModule,
	// provideAnalytics(() => getAnalytics()),
];
