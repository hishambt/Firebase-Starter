import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { ThemeService } from './core/services/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	auth = inject(Auth);
	theme = inject(ThemeService);
}
