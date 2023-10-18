import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

import { SSInputComponent } from '../_input/_input.component';

@Component({
	selector: 'ss-text',
	template: `
		<ss-input
			[label]="label"
			[placeholder]="placeholder"
			type="text"
			maxlength="50"
			[required]="required"
			[disabled]="disabled"
			[controlKey]="controlKey"
			[setValidators]="validators"
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
}
export type ISSText<T extends string> = {
	[K in T]: FormControl<string>;
};
