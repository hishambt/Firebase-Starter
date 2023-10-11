import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ControlContainer, FormGroup } from '@angular/forms';

import { passwordMatchValidator } from '../_utils/confirmed.validator';
import { SSPasswordComponent, SSConfirmPasswordComponent } from '../public-api';

@Component({
	selector: 'ss-password-confirm-group',
	template: `
		<ss-password></ss-password>
		<ss-confirm-password></ss-confirm-password>
	`,
	standalone: true,
	styles: [''],
	imports: [IonicModule, SSPasswordComponent, SSConfirmPasswordComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: (): ControlContainer | void => {
				try {
					return inject(ControlContainer, { skipSelf: true });
				} catch (e) {
					console.error();
				}
			},
		},
	],
})
export class SSPasswordConfirmGroupComponent implements OnInit {
	parentContainer = inject(ControlContainer);

	get parentFormGroup(): FormGroup | void {
		if (!this.parentContainer) {
			return;
		}

		return this.parentContainer.control as FormGroup;
	}

	ngOnInit(): void {
		if (!this.parentFormGroup) {
			return;
		}

		this.parentFormGroup.addValidators(passwordMatchValidator('password', 'confirmPassword'));
	}
}
