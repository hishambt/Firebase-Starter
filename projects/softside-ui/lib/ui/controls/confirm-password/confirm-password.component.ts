import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { SSInputComponent } from '../_input/_input.component';

@Component({
	selector: 'ss-confirm-password',
	template: ` <ss-input
		label="Confirm password"
		placeholder="Enter your password"
		type="password"
		maxlength="50"
		minlength="6"
		controlKey="confirmPassword"
		defaultValue=""
		[hideshow]="true"
		[setValidators]="validators"
	></ss-input>`,
	standalone: true,
	styles: [''],
	providers: [Validators],
	imports: [SSInputComponent, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSConfirmPasswordComponent {
	validators = [Validators.required];
}
