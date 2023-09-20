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
	styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent<T> {
	@Input() breadcrumbItems!: IBreadcrumbItem[];
	@Input() title: string = 'undefined';
	@Input() actionButtons: ActionButton<T>[] = [];
	@Input() isDrawerMode: boolean = false;

	@Output() buttonClick = new EventEmitter<T>();

	onActionSubmit(action?: T): void {
		this.buttonClick.emit(action);
	}
}
