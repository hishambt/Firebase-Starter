/**
 * Represents a Storage Helper.
 * @public
 */
export class StorageHelper {
	/**
	 * Get local storage data by key
	 * @param key string storage Key
	 * @param parseAsJSON boolean, Optional convert to JSON
	 * @returns Json | Value:any
	 */
	public get(key: string, parseAsJSON?: boolean): any {
		const data = localStorage.getItem(key) as string;

		if (parseAsJSON && this.isValidJSONString(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	/**
	 * Check for key existance in local storage
	 * @param key string
	 * @returns boolean
	 */
	public check(key: string): boolean {
		if (this.get(key) === null) {
			return false;
		}

		return true;
	}

	/**
	 * Set local storage value by key
	 * @param key string storage key
	 * @param data Value/Data to be saved
	 * @param stringifyJSON boolean, Optional convert to JSON
	 */
	public set(key: string, data: any, stringifyJSON = false): void {
		if (stringifyJSON) {
			data = JSON.stringify(data);
		}

		localStorage.setItem(key, data);
	}

	/**
	 * Remove local storage record by key
	 * @param key string storage key
	 */
	public remove(key: string): void {
		localStorage.removeItem(key);
	}

	/**
	 * Clear All local storage
	 */
	public clearAll(): void {
		localStorage.clear();
	}

	/**
	 * Validate Json Format
	 * @param str string
	 * @returns boolean
	 */
	private isValidJSONString(str: string): boolean {
		try {
			JSON.parse(str);
		} catch (error) {
			return false;
		}

		return true;
	}
}
