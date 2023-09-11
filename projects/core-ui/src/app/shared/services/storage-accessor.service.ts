import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
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
	private hasLocalStorage: boolean = false;

	constructor(@Inject(PLATFORM_ID) private platformId: object) {
		this.hasLocalStorage = this.isLocalStorageAvailable();
	}

	/**
	 * Set local storage by key
	 * @param key string
	 * @param data any | unknown
	 * @param stringifyJSON boolean
	 */
	setLocalStorage(key: string, data: unknown, stringifyJSON = false): void {
		if (isPlatformBrowser(this.platformId)) {
			if (this.hasLocalStorage) {
				this.storageHelper.set(key, data, stringifyJSON);
			} else {
				this.cookieHelper.setCookie(key, data);
			}
		}
	}

	/**
	 * Get local storage value/data by key
	 * @param key string
	 * @param parseAsJSON boolean
	 * @returns json|value
	 */
	// TODO: Replace with generics 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getLocalStorage(key: string, parseAsJSON = false): any {
		if (isPlatformBrowser(this.platformId)) {
			if (this.hasLocalStorage) {
				return this.storageHelper.get(key, parseAsJSON);
			} else {
				return this.cookieHelper.getCookie(key);
			}
		}
	}

	/**
	 * Remove local storage record by key
	 * @param key string
	 */
	removeLocalStorageKey(key: string): void {
		if (isPlatformBrowser(this.platformId)) {
			if (this.hasLocalStorage) {
				this.storageHelper.remove(key);
			} else {
				this.cookieHelper.deleteCookie(key);
			}
		}
	}

	/**
	 * Check if lists are existing in local storage
	 * @returns Boolean
	 */
	checkExistance(key: string): boolean {
		if (isPlatformBrowser(this.platformId)) {
			if (this.hasLocalStorage) {
				return this.storageHelper.check(key);
			} else {
				return this.cookieHelper.check(key);
			}
		}

		return false;
	}

	private isLocalStorageAvailable(): boolean {
		const test = 'test';

		if (isPlatformBrowser(this.platformId)) {
			try {
				localStorage.setItem(test, test);
				localStorage.removeItem(test);

				return true;
			} catch (e) {
				return false;
			}
		}

		return false;
	}
}
