import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

import { SSInputComponent } from '@softside/ui-sdk/lib/elements';

@Component({
	selector: 'ss-text',
	template: `
		<ss-input
			[label]="label"
			[controlKey]="controlKey"
			[placeholder]="placeholder"
			type="text"
			maxlength="50"
			[required]="required"
			[disabled]="disabled"
			[setValidators]="validators"
			[directParentGroup]="directParentGroup"
		>
		</ss-input>
	`,
	standalone: true,
	imports: [SSInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSTextComponent {
	@Input({ required: true }) label: string = '';
	@Input({ required: true }) controlKey: string = '';
	@Input() placeholder: string = 'Enter value here';
	@Input() disabled: boolean = false;
	@Input() validators: Array<ValidatorFn> = [];
	@Input() required: boolean = false;
	@Input() directParentGroup: FormGroup | null = null;
}
