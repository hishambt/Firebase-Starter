import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { SSInputComponent } from '../_input/_input.component';

@Component({
	selector: 'ss-email',
	template: `
		<ss-input
			label="Email"
			placeholder="Enter your email address"
			type="email"
			[required]="true"
			[disabled]="disabled"
			maxlength="50"
			controlKey="email"
			[setValidators]="validators"
		>
		</ss-input>
	`,
	standalone: true,
	imports: [SSInputComponent],
	providers: [Validators],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSEmailComponent {
	@Input() disabled: boolean = false;
	validators = [Validators.email];
}
export type ISSEmail = {
	email: FormControl<string>;
};
