import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { take, switchMap, tap, finalize } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/IUser.model';
import { Auth, User, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
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
	form: FormGroup = new FormGroup({
		uid: new FormControl(''),
		firstName: new FormControl(''),
		lastName: new FormControl(''),
		phone: new FormControl(''),
		address: new FormControl(''),
	});
	imageUploadService = inject(ImageUploadService);

	$user = this.authService.currentUserProfile$.pipe(
		take(1),
		tap((user: IUser | null) => {
			console.log(user);
			this.form.patchValue({
				uid: user?.uid,
				firstName: user?.firstName,
				lastName: user?.lastName,
				phone: user?.phone,
				address: user?.address,
			});
		}),
	);
	deletingUser = false;
	savingUser = false;

	get actions(): typeof Actions {
		return Actions;
	}

	uploadFile(event: any, user: IUser) {
		this.imageUploadService
			.uploadImage(event.target.files[0], `images/profile/${user.uid}`)
			.pipe(
				take(1),
				switchMap((photoURL) => {
					user.photoURL = photoURL;
					return this.authService.updateUser(user);
				}),
			)
			.subscribe();
	}

	submitRecord<Actions>(action: Actions) {
		switch (action) {
			case this.actions.save:
				const user: IUser = this.form.value;
				if (!user.uid) {
					return;
				}
				this.savingUser = true;
				this.authService
					.updateUser(user)
					.pipe(
						take(1),
						finalize(() => (this.savingUser = false)),
					)
					.subscribe();
				break;
			case this.actions.delete:
				this.deletingUser = true;
				authState(this.auth)
					.pipe(
						take(1),
						switchMap((user: User | null) => {
							return this.authService.deleteUser(user!);
						}),
					)
					.subscribe({
						next: () => this.router.navigateByUrl('/auth/login'),
					});
				break;
			default:
				break;
		}
	}
}

enum Actions {
	save,
	delete,
}
