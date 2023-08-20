import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActionButton } from '../../models/actionButton';

@Component({
	selector: 'app-form-action-bar',
	templateUrl: './form-action-bar.component.html',
	styleUrls: ['./form-action-bar.component.scss']
})
export class FormActionBarComponent {
	@Input() startButtons: ActionButton[] = [];
	@Input() endButtons: ActionButton[] = [];
	@Input() isDrawerMode: boolean = false;
	@Output() buttonClick = new EventEmitter<string>();

	constructor() {}

	onActionSubmit(text: any) {
		this.buttonClick.emit(text);
	}
}
