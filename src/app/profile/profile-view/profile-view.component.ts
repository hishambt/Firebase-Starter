import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { take, filter, switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/IUser.model';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent {
    authService = inject(AuthService);

    get actions(): typeof Actions {
        return Actions;
    }

    deleteUser<Actions>(action: Actions) {
        switch (action) {
            case this.actions.save:
                console.log('Save', 'To be implemented');
                break;
            case this.actions.delete:
                this.authService.currentUserProfile$.pipe(
                    filter(Boolean),
                    take(1),
                    switchMap((user: IUser) => {
                        // TODO: remove user from auth as well
                        return this.authService.deleteUser(user.uid);
                    })
                ).subscribe();
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
