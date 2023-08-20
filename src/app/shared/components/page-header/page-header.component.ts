import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActionButton } from '../../models/actionButton';
import { IBreadcrumbItem } from '../../models/IBreadcrumbItem';

/**
 * Example how to use this shared Page Header
 * @example
 * 		<app-page-header
 *			[title]="(formMode | titlecase) + ' ' + 'Personal Info'"
 *			[breadcrumbItems]="[
 *				{
 *					text: 'Customers',
 *					link: '/customers'
 *				}
 *			]"
 *			[actionButtons]="[
 *				{
 *					visible: isDirty,
 *					disabled: false,
 *					class: 'mat-raised-button w-100',
 *					color: 'primary',
 *					text: 'Save',
 *					isWaiting: isWaiting
 *				}
 *			]"
 *			(buttonClick)="onPageHeaderActionClick($event)"
 *		></app-page-header>
 */
@Component({
	selector: 'app-page-header',
	templateUrl: './page-header.component.html',
	styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
	@Input() breadcrumbItems!: IBreadcrumbItem[];
	@Input() title: string = 'undefined';
	@Input() actionButtons: ActionButton[] = [];
	@Input() isDrawerMode: boolean = false;

	@Output() buttonClick = new EventEmitter<string>();

	constructor() {}

	onActionSubmit(text: any) {
		this.buttonClick.emit(text);
	}
}
