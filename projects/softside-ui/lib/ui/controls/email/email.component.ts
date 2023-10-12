import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { SSInputComponent } from '../_input/_input.component';

@Component({
	selector: 'ss-email',
	template: `
	 <ss-input
		label="Email"
		placeholder="Enter your email address"
		type="email"
		maxlength="50"
		controlKey="email"
		defaultValue=""
		[setValidators]="validators"
		>
	</ss-input>`
	,
	standalone: true,
	imports: [SSInputComponent],
	providers: [Validators],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSEmailComponent implements OnInit {

	/**
	 * ngOnInit 
	 */
	ngOnInit(): void {
		console.log('test');
	}

	/**
	 * test
	 */
	validators = [Validators.required, Validators.email];
}
