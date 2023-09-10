import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';

export class CustomValidators {
	static MatchValidator(source: string, target: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const sourceCtrl = control.get(source);
			const targetCtrl = control.get(target);

			return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value ? { mismatch: true } : null;
		};
	}
}
export class ConfirmPasswordMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const formHasMismatchError = form && form.errors?.['mismatch'];

		return !!(formHasMismatchError && control && control.touched);
	}
}
