import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
	return (formGroup: AbstractControl): ValidationErrors | null => {
		const passwordControl = formGroup.get(controlName);
		const confirmPasswordControl = formGroup.get(matchingControlName);

		if (!passwordControl || !confirmPasswordControl) {
			return null;
		}

		if (passwordControl.value !== confirmPasswordControl.value) {
			confirmPasswordControl.setErrors({ passwordMismatch: true });

			return { passwordMismatch: true };
		} else {
			confirmPasswordControl.setErrors(null);

			return null;
		}
	};
}
