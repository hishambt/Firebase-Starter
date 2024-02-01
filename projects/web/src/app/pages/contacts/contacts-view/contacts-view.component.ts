import { Component } from '@angular/core';
import { ColumnMode } from 'ngx-softside-table';

@Component({
	selector: 'app-contacts-view',
	templateUrl: './contacts-view.component.html',
	styleUrls: ['./contacts-view.component.scss'],
})
export class ContactsViewComponent {
	rows = [
		{
			name: 'Ethel Price',
			gender: 'female',
			company: 'Johnson, Johnson and Partners, LLC CMP DDC',
			age: 22,
		},
		{
			name: 'Claudine Neal',
			gender: 'female',
			company: 'Sealoud',
			age: 55,
		},
	];

	loadingIndicator = true;
	reorderable = true;

	columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company', sortable: false }];

	ColumnMode = ColumnMode;

	constructor() {
		setTimeout(() => {
			this.loadingIndicator = false;
		}, 1500);
	}
}
