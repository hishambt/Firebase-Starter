import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsViewComponent } from './contacts-view/contacts-view.component';

@NgModule({
	declarations: [ContactsViewComponent],
	imports: [SharedModule, ContactsRoutingModule],
})
export class ContactsModule {}
