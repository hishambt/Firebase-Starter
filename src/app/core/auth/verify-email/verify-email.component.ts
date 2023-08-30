import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { take, switchMap, finalize, map } from 'rxjs';
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
    sendDisabled = true;
    user: User | null = null;

    get actions(): typeof Actions {
        return Actions;
    }

    ngOnInit() {
        authState(this.auth)
            .pipe(take(1))
            .subscribe((user: User | null) => {
                if(user) {
                    this.user = user;
                    this.sendDisabled = false;
                }
            });
    }

    submitRecord(action: Actions) {
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
        this.authService.sendVerificationEmail(this.user!).pipe(
            take(1),
            finalize(() => {
                this.sendingEmailVerification = false;
                this.sendDisabled = true;
            })
        ).subscribe();
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
