import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActionButton } from '../../models/actionButton';

@Component({
	selector: 'app-form-action-bar',
	templateUrl: './form-action-bar.component.html',
	styleUrls: ['./form-action-bar.component.scss'],
})
export class FormActionBarComponent<T> {
	@Input() startButtons: ActionButton<T>[] = [];
	@Input() endButtons: ActionButton<T>[] = [];
	@Input() isDrawerMode: boolean = false;
	@Output() buttonClick = new EventEmitter<T>();

	constructor() {}

	onActionSubmit(action?: T): void {
		this.buttonClick.emit(action);
	}
}
