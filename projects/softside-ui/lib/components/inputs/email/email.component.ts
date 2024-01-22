import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { SSInputComponent } from 'softside-ui/lib/elements';

@Component({
	selector: 'ss-email',
	template: `
		<ss-input
			[label]="label"
			[controlKey]="controlKey"
			placeholder="Enter your email address"
			type="email"
			[required]="true"
			[disabled]="disabled"
			maxlength="50"
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
	@Input({ required: true }) label: string = '';
	@Input({ required: true }) controlKey: string = '';
	@Input() disabled: boolean = false;
	validators = [Validators.email];
}
