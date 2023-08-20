/**
 * Represents a Cookie Helper.
 * @public
 */
export class CookieHelper {
	isConsented = false;

	public deleteCookie(name: string) {
		this.setCookie(name, '', -1);
	}

	/**
	 * set cookie
	 * @param {string} name
	 * @param {string} value
	 * @param {number} expireDays
	 * @param {string} path
	 */
	public setCookie(name: string, value: string, expireDays: number = 365, path: string = '') {
		const d: Date = new Date();
		d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
		const expires = `expires=${d.toUTCString()}`;
		const cpath = path ? `; path=${path}` : '';
		document.cookie = `${name}=${value}; ${expires}${cpath}`;
	}

	/**
	 * get cookie
	 * @param {string} name
	 * @returns {string}
	 */
	public getCookie(name: string) {
		const ca: Array<string> = decodeURIComponent(document.cookie).split(';');
		const caLen: number = ca.length;
		const cookieName = `${name}=`;
		let c: string;

		for (let i = 0; i < caLen; i += 1) {
			c = ca[i].replace(/^\s+/g, '');

			if (c.indexOf(cookieName) === 0) {
				return c.substring(cookieName.length, c.length);
			}
		}

		return '';
	}

	/**
	 * Check for key existance in local storage
	 * @param key string
	 * @returns boolean
	 */
	public check(key: string): boolean {
		if (this.getCookie(key) === null) {
			return false;
		}

		return true;
	}
}
