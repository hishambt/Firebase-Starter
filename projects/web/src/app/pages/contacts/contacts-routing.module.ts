import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsViewComponent } from './contacts-view/contacts-view.component';

const routes: Routes = [
	{
		path: '',
		component: ContactsViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ContactsRoutingModule {}
