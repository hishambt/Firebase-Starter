import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SSInputComponent } from 'softside-ui/lib/ui/controls/elements';

@Component({
	selector: 'ss-confirm-password',
	template: ` <ss-input
		label="Confirm password"
		placeholder="Enter your password"
		type="password"
		maxlength="50"
		minlength="6"
		[required]="true"
		controlKey="confirmPassword"
		[disabled]="disabled"
		[hideshow]="true"
		[directParentGroup]="directParentGroup"
	></ss-input>`,
	standalone: true,
	imports: [SSInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSConfirmPasswordComponent {
	@Input() disabled: boolean = false;
	@Input() directParentGroup: FormGroup | null = null;
}
