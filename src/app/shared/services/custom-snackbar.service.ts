import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class CustomSnackBarService {
	private _snackBar = inject(MatSnackBar);

	openSnackBar(message: string, error: boolean = false): void {
		const snackBarClass = error ? 'mat-warn' : 'mat-primary';

		this._snackBar.open(message, 'Ok', {
			horizontalPosition: 'center',
			verticalPosition: 'top',
			panelClass: ['mat-toolbar', snackBarClass],
		});
	}

	dismissSnackBar(): void {
		this._snackBar.dismiss();
	}
}
