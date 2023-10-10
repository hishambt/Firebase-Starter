import { NgModule } from '@angular/core';
import { NgxDatatableModule } from 'ngx-softside-table';

import { SharedModule } from '../../shared/shared.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsViewComponent } from './contacts-view/contacts-view.component';

@NgModule({
	declarations: [ContactsViewComponent],
	imports: [SharedModule, NgxDatatableModule, ContactsRoutingModule],
})
export class ContactsModule { }
