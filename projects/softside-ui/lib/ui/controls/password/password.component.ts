import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SSInputComponent } from '../_input/_input.component';

@Component({
	selector: 'ss-password',
	template: ` <ss-input
		label="Password"
		placeholder="Enter your password"
		type="password"
		maxlength="50"
		minlength="6"
		[required]="true"
		controlKey="password"
		[disabled]="disabled"
		[hideshow]="true"
	></ss-input>`,
	standalone: true,
	imports: [SSInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSPasswordComponent {
	@Input() disabled: boolean = false;
}
export type ISSPassword = {
	password: FormControl<string>;
};
