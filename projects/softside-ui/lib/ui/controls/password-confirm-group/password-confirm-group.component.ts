import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule, ValidatorFn } from '@angular/forms';

import { passwordMatchValidator } from '../_utils/confirmed.validator';
import { SSPasswordComponent, SSConfirmPasswordComponent } from '../public-api';
import { FormProviderComponent } from '../_utils/form-provider';

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
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: (): ControlContainer | void => {
				try {
					return inject(ControlContainer, { skipSelf: true });
				} catch (e) {
					console.error();
				}
			},
		},
	],
})
export class SSPasswordConfirmGroupComponent extends FormProviderComponent {
	override group = 'confirmPasswordGroup';
	override setValidators: ValidatorFn[] = [passwordMatchValidator('password', 'confirmPassword')];
}
