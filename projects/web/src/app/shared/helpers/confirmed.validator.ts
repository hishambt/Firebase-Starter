import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
	return (formGroup: AbstractControl): ValidationErrors | null => {
		const passwordControl = formGroup.get(controlName);
		const confirmPasswordControl = formGroup.get(matchingControlName);

		if (!passwordControl || !confirmPasswordControl) {
			return null;
		}

		if (passwordControl.value !== confirmPasswordControl.value) {
			confirmPasswordControl.setErrors({ ...confirmPasswordControl.errors, passwordMismatch: true });

			return { passwordMismatch: true };
		} else if (!confirmPasswordControl.value) {
			confirmPasswordControl.setErrors({ required: true });

			return { required: true };
		} else {
			confirmPasswordControl.setErrors(null);

			return null;
		}
	};
}
