import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonLabel, IonContent, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { help, home } from 'ionicons/icons';

import { SharedModule } from 'projects/web/src/app/shared/shared.module';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
	standalone: true,
	imports: [IonContent, SharedModule, IonLabel, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class NotFoundComponent {
	router = inject(Router);

	constructor() {
		addIcons({
			help,
			home,
		});
	}

	goTo(url: string): void {
		this.router.navigateByUrl(url, { replaceUrl: true });
	}
}
