import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { FormProviderComponent, getControlContainer } from '../_utils/form-provider';

@Component({
	selector: 'ss-textarea',
	template: `
		<ion-item lines="none">
			<ion-textarea
				[label]="label"
				labelPlacement="floating"
				fill="solid"
				[placeholder]="placeholder"
				[maxlength]="maxlength"
				[autoGrow]="true"
				[errorText]="getError"
				[formControlName]="controlKey"
				[name]="controlKey"
			></ion-textarea>
		</ion-item>
	`,
	imports: [IonicModule, ReactiveFormsModule],
	viewProviders: getControlContainer(),
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSTextareaComponent<T> extends FormProviderComponent<T> {
	@Input() maxlength: string = '50';
	@Input() placeholder: string = 'Enter value here';
}
