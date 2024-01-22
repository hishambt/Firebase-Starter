import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SSInputComponent } from 'softside-ui/lib/elements';

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
		[directParentGroup]="directParentGroup"
	></ss-input>`,
	standalone: true,
	imports: [SSInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSPasswordComponent {
	@Input() disabled: boolean = false;
	@Input() directParentGroup: FormGroup | null = null;
}
