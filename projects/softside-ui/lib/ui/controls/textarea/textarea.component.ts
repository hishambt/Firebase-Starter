import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';

import { FormProviderComponent } from '../_utils/form-provider';

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
	standalone: true,
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
export class SSTextareaComponent extends FormProviderComponent {
	@Input() maxlength: string = '50';
	@Input() placeholder: string = 'Enter value here';
}
export type ISSTextArea<T extends string> = {
	[K in T]: string;
};
