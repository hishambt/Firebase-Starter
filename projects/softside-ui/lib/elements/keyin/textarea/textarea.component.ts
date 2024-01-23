import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormProviderBaseComponent } from 'softside-ui/lib/_utils';

@Component({
	selector: 'ss-textarea',
	template: `
		<ng-container [formGroup]="currentFormGroup">
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
		</ng-container>
	`,
	imports: [IonicModule, ReactiveFormsModule],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSTextareaComponent extends FormProviderBaseComponent {
	@Input() maxlength: string = '50';
	@Input() placeholder: string = 'Enter value here';
}
