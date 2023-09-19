import { Injectable, inject } from '@angular/core';
import { ToggleCustomEvent } from '@ionic/angular';

import { AuthService } from './auth.service';
import { StorageAccessorService } from '../../shared/services/storage-accessor.service';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	storage = inject(StorageAccessorService);
	themeStorage = this.storage.getLocalStorage('theme');
	isDarkMode: boolean = this.themeStorage === 'true';
	authService = inject(AuthService);

	constructor() {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		prefersDark.addEventListener('change', (mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));

		if (!this.themeStorage) {
			this.isDarkMode = prefersDark.matches;
		}

		this.toggleDarkTheme(this.isDarkMode);
	}

	toggleChange(ev: Event): void {
		this.toggleDarkTheme((ev as ToggleCustomEvent).detail.checked);
	}

	toggleDarkTheme(isDark: boolean): void {
		this.isDarkMode = isDark;
		document.body.classList.toggle('dark', isDark);
		this.storage.setLocalStorage('theme', isDark);
	}
}
