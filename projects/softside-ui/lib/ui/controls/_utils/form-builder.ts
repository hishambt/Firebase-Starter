import { AbstractControl, FormGroup, FormControl } from '@angular/forms';

export class FB {
	static group<T extends { [K in keyof T]: AbstractControl<T[K]['value'], T[K]['value']> }>(controls: T): FormGroup<T> {
		return new FormGroup<T>(controls);
	}

	static string(defaultValue: string = ''): FormControl<string> {
		return new FormControl(defaultValue, { nonNullable: true });
	}

	static number(defaultValue: number = 0): FormControl<number> {
		return new FormControl(defaultValue, { nonNullable: true });
	}

	static boolean(defaultValue: boolean = false): FormControl<boolean> {
		return new FormControl(defaultValue, { nonNullable: true });
	}
}
//TODO: Add Form Array support to type
export type ConvertToForm<T> = T extends object
	? FormGroup<{
			[K in keyof T]: ConvertToForm<T[K]>;
	  }>
	: T extends string
	? FormControl<string>
	: T extends number
	? FormControl<number>
	: T extends boolean
	? FormControl<boolean>
	: never;
// Example usage type ProfileForm = ConvertToForm<JSONResponseType>;
