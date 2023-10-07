import { AbstractControl } from "@angular/forms";

export default class ErrorMessages {
    // TODO: move this function to a global error handling service
    static getError(formControl: AbstractControl, label: string): string {
        const ctrl = formControl;

        switch (true) {
            case ctrl?.hasError('required'):
                return label + ' is required';
            case ctrl?.hasError('email'):
                return label + ' must follow a valid format';
            case ctrl?.hasError('minlength'):
                return `${label} should be at least ${ctrl?.errors?.['minlength'].requiredLength} characters long`;
            case ctrl?.hasError('passwordMismatch'):
                return label + 's should match';

            default:
                return '';
        }
    }
}