import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
	selector: 'ss-input',
	template: `
		<img src="/assets/1.jpg" />
		<ion-input
			label="Password"
			labelPlacement="floating"
			[counter]="true"
			maxlength="50"
			minlength="6"
			fill="solid"
			autocomplete="disabled"
			placeholder="Enter your password"
			type="password"
			name="password"
			[clearInput]="true"
			[clearOnEdit]="false"
			[errorText]="getPasswordError"
			formControlName="password"
		></ion-input>
	`,
	standalone: true,
	styles: [''],
	imports: [IonicModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSInputComponent {
	get getPasswordError(): string {
		return ''; //ErrorMessages.getError(this.form.get('password') as FormControl<string>, 'Password');
	}
}
