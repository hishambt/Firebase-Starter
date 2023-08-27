import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { StorageAccessorService } from 'src/app/shared/services/storage-accessor.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    emailPasswordLoading: boolean = false;
    googleLoading: boolean = false;

    constructor(
        private storage: StorageAccessorService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        const success = this.route.snapshot.queryParams['passwordChanged'];
        if (success) this.openSnackBar('You have successfully changed your password');
    }

    submitRecord() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.emailPasswordLoading = true;

        const { email, password } = this.form.value;

        this.authService
            .loginWithEmailAndPassword(email, password)
            .pipe(
                finalize(() => {
                    this.emailPasswordLoading = false;
                })
            )
            .subscribe({
                next: () => this.onLoginSuccess(),
                error: (error: Error) => this.onLoginFailure(error.message),
            });
    }

    onLoginSuccess() {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigateByUrl(returnUrl);
    }

    onLoginFailure(message: string) {
        this.openSnackBar(message, true);
    }

    loginWithGoogle() {
        this.googleLoading = true;

        this.authService
            .loginWithGoogle()
            .pipe(
                finalize(() => {
                    this.googleLoading = false;
                })
            )
            .subscribe({
                next: () => this.onLoginSuccess(),
                error: (error: Error) => this.onLoginFailure(error.message),
            });
    }

    openSnackBar(message: string, error: boolean = false) {
        const snackBarClass = error ? 'mat-warn' : 'mat-primary';
        this._snackBar.open(message, 'Ok', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', snackBarClass],
        });
    }

    ngOnDestroy(): void {
        this._snackBar.dismiss();
    }
}
