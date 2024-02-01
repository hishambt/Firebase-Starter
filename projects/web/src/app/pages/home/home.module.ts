import { NgModule } from '@angular/core';
import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonContent,
	IonText,
} from '@ionic/angular/standalone';

import { SSEmailComponent } from '@softside/ui-sdk/lib/components/inputs/email';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './home-view/home-view.component';

@NgModule({
	declarations: [
		HomeViewComponent,
	],
	imports: [
		HomeRoutingModule,
		SSEmailComponent,
		SharedModule,
		IonContent,
		IonCard,
		IonCardHeader,
		IonText,
		IonCardContent,
	],
	exports: [],
	providers: [],
})
export class HomeModule {}
