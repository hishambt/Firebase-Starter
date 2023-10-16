import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';

import { passwordMatchValidator } from '../_utils/confirmed.validator';
import { SSPasswordComponent, SSConfirmPasswordComponent } from '../public-api';
import { FormProviderComponent, getControlContainer } from '../_utils/form-provider';

@Component({
	selector: 'ss-password-confirm-group',
	template: `
		<div [formGroupName]="group">
			<ss-password></ss-password>
			<ss-confirm-password></ss-confirm-password>
		</div>
	`,
	standalone: true,
	imports: [SSPasswordComponent, SSConfirmPasswordComponent, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	viewProviders: getControlContainer(),
})
export class SSPasswordConfirmGroupComponent<T> extends FormProviderComponent<T> {
	override group = 'confirmPasswordGroup';
	override setValidators: ValidatorFn[] = [passwordMatchValidator('password', 'confirmPassword')];
}
