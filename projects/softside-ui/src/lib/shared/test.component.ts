import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'lib-test',
  template: `
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
              formControlName="password"></ion-input>
  `,
  standalone: true,
  styles: [''],
  imports: [
    IonicModule,

  ],
})
export class TestComponent {

  constructor() { }

  get getPasswordError(): string {
    return '';//this.authService.getError(this.form.get('password') as FormControl<string>, 'Password');
  }
}