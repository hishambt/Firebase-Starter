import { NgModule } from '@angular/core';
import { NgxDatatableModule } from 'ngx-softside-table';
import {
	IonCard,
	IonCardContent,
	IonCol,
	IonContent,
	IonLabel,
	IonRow,
} from '@ionic/angular/standalone';

import { SharedModule } from '../../shared/shared.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsViewComponent } from './contacts-view/contacts-view.component';

@NgModule({
	declarations: [
		ContactsViewComponent,
	],
	imports: [
		SharedModule,
		NgxDatatableModule,
		ContactsRoutingModule,
		IonContent,
		IonCard,
		IonCardContent,
		IonRow,
		IonCol,
		IonLabel,
	],
})
export class ContactsModule {}
