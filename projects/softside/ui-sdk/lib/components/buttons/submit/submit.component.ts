import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SSButtonComponent } from '@softside/ui-sdk/lib/elements';

@Component({
	selector: 'ss-submit-button',
	template: `
		<ss-button
			[type]="'submit'"
			label="Submit"
		></ss-button>
	`,
	standalone: true,
	imports: [SSButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSSubmitButtonComponent {}
