import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-can-deactivate-dialog',
	templateUrl: './can-deactivate-dialog.component.html',
	styleUrls: ['./can-deactivate-dialog.component.scss']
})
export class CanDeactivateDialogComponent {
	constructor(public dialogRef: MatDialogRef<CanDeactivateDialogComponent>) {}
}
