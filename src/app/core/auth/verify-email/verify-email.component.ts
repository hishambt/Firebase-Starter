import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { take, switchMap, finalize } from 'rxjs';
import { authState, Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
    private authService = inject(AuthService);
    private auth = inject(Auth);
    private router = inject(Router);

    sendingEmailVerification = false;
    loggingOut = false;
    showFinalMessage = false;
    email: string = '';

    get actions(): typeof Actions {
        return Actions;
    }

    submitRecord(action: Actions) {
        // TODO: Can be spammed. Fix later

        switch (action) {
            case Actions.verify:
                this.verifyEmail();
                break;
            case Actions.logout:
                this.logout();
                break;
            default:
                break;
        }
    }

    verifyEmail() {
        this.sendingEmailVerification = true;
        authState(this.auth)
            .pipe(
                take(1),
                switchMap((user: User | null) => {
                    this.email = user!.email!;
                    return this.authService.sendVerificationEmail(user!).pipe(take(1));
                }),
                finalize(() => {
                    this.sendingEmailVerification = false;
                    this.showFinalMessage = true;
                })
            )
            .subscribe();
    }

    logout() {
        this.loggingOut = true;
        this.authService
            .logout()
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigateByUrl('auth/login');
            });
    }
}

enum Actions {
    verify,
    logout,
}
