import { AbstractControl, FormGroup, FormControl } from '@angular/forms';

export class FB {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static group<T extends { [K in keyof T]: AbstractControl<any, any> }>(controls: T): FormGroup<T> {
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
