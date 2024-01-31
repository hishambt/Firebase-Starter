import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonProgressBar } from '@ionic/angular/standalone';

import { AppSettingsService } from '../../../shared/services/app-settings.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
	selector: 'app-shell-loading-bar',
	templateUrl: './shell-loading-bar.component.html',
	styleUrls: ['./shell-loading-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SharedModule, IonProgressBar],
	standalone: true,
})
export class ShellLoadingBarComponent {
	public isLoading$ = inject(AppSettingsService).isAppLoading$;
}
