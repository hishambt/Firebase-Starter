import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { ThemeService } from './core/services/theme.service';
import { ShellModule } from './shell/shell.module';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [ShellModule, IonApp, IonRouterOutlet],
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	auth = inject(Auth);
	theme = inject(ThemeService);
}
