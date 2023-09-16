import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const sourceCtrl = control.get(controlName);
		const targetCtrl = control.get(matchingControlName);

		return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value ? { mismatch: true } : null;
	};
}
