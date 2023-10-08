import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { SSInputComponent } from '../_input/_input.component';

@Component({
	selector: 'ss-password',
	template: ` <ss-input
		label="Password"
		placeholder="Enter your password"
		type="password"
		maxlength="50"
		controlKey="password"
		defaultValue=""
		[hideshow]="true"
	></ss-input>`,
	standalone: true,
	styles: [''],
	imports: [SSInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSPasswordComponent {
	validators = [Validators.required];
}
