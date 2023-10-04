import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { StorageHelper } from '../helpers/data-storage-helper';
import { CookieHelper } from '../helpers/data-cookie-helper';

/**
 * This service is the only data storage accessor available in the solution
 * No direct Feature access to this service
 *
 * @description
 */
@Injectable({ providedIn: 'root' })
export class StorageAccessorService {
	private storageHelper: StorageHelper = new StorageHelper();
	private cookieHelper: CookieHelper = new CookieHelper();
	private hasLocalStorage = this.isLocalStorageAvailable();
	private platformId = inject(PLATFORM_ID);
	private isBrowser = isPlatformBrowser(this.platformId);

	/**
	 * Set local storage by key
	 * @param key string
	 * @param data any | unknown
	 * @param stringifyJSON boolean
	 */
	setLocalStorage(key: string, data: unknown, stringifyJSON = false): void {
		if (!this.isBrowser) {
			return;
		}

		if (this.hasLocalStorage) {
			this.storageHelper.set(key, data, stringifyJSON);
		} else {
			this.cookieHelper.setCookie(key, data);
		}
	}

	/**
	 * Get local storage value/data by key
	 * @param key string
	 * @param parseAsJSON boolean
	 * @returns json|value
	 */

	getLocalStorage<T>(key: string, parseAsJSON = false): T | string | void {
		if (!this.isBrowser) {
			return;
		}

		if (this.hasLocalStorage) {
			return this.storageHelper.get<T>(key, parseAsJSON);
		} else {
			return this.cookieHelper.getCookie(key);
		}
	}

	/**
	 * Remove local storage record by key
	 * @param key string
	 */
	removeLocalStorageKey(key: string): void {
		if (!this.isBrowser) {
			return;
		}

		if (this.hasLocalStorage) {
			this.storageHelper.remove(key);
		} else {
			this.cookieHelper.deleteCookie(key);
		}
	}

	/**
	 * Check if lists are existing in local storage
	 * @returns Boolean
	 */
	checkExistance(key: string): boolean | void {
		if (!this.isBrowser) {
			return;
		}

		if (this.hasLocalStorage) {
			return this.storageHelper.check(key);
		} else {
			return this.cookieHelper.check(key);
		}
	}

	private isLocalStorageAvailable(): boolean {
		const test = 'test';

		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);

			return true;
		} catch (e) {
			return false;
		}
	}
}
