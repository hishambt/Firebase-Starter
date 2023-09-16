import { Component, inject } from '@angular/core';
import { take, switchMap } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { IUser } from 'projects/core-ui/src/app/shared/models/IUser.model';
import { AuthService } from 'projects/core-ui/src/app/core/services/auth.service';
import { environment } from 'projects/core-ui/src/environments/environment';
import { CustomToastService } from 'projects/core-ui/src/app/shared/services/custom-snackbar.service';

import { ImageUploadService } from '../../../shared/services/image-upload.service';

@Component({
	selector: 'app-profile-view',
	templateUrl: './profile-view.component.html',
	styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent {
	authService = inject(AuthService);
	auth = inject(Auth);
	router = inject(Router);
	_customSnackBar = inject(CustomToastService);

	form: FormGroup = new FormGroup({
		uid: new FormControl(''),
		firstName: new FormControl(''),
		lastName: new FormControl(''),
		phone: new FormControl(''),
		address: new FormControl(''),
	});

	imageUploadService = inject(ImageUploadService);

	// $user = this.authService.currentUserProfile$.pipe(
	// 	take(1),
	// 	tap((user: IUser | null) => {
	// 		this.form.patchValue({
	// 			uid: user?.uid,
	// 			firstName: user?.firstName,
	// 			lastName: user?.lastName,
	// 			phone: user?.phone,
	// 			address: user?.address,
	// 		});
	// 	}),
	// );

	deletingUser = false;
	savingUser = false;

	get actions(): typeof Actions {
		return Actions;
	}

	uploadFile(event: Event, user: IUser): void {
		const target = event.target as HTMLInputElement;
		const file: File | null = (target.files?.length && target.files[0]) || null;

		if (!target || !file) {
			return;
		}

		this.imageUploadService
			.uploadImage(file, `${environment.profileCDNPath}${user.uid}`)
			.pipe(
				take(1),
				switchMap((photoURL: string) => {
					user.photoURL = photoURL;

					return this.authService.updateUser(user);
				}),
			)
			.subscribe({
				next: () => {},
				error: (_error: Error) => {
					this._customSnackBar.openSnackBar('Image format not supported, or file size exceeds the 2mb limit!', 0);
				},
			});
	}
}

enum Actions {
	save,
	delete,
}
