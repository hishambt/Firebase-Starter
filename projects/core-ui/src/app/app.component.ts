import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	auth = inject(Auth);
	constructor() {}
}
