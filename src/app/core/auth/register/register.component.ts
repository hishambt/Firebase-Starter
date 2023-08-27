import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, finalize, pipe, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators, ConfirmPasswordMatcher } from 'src/app/shared/helpers/confirmed.validator';
import { IUser } from 'src/app/shared/models/IUser.model';
import { UserCredential } from '@angular/fire/auth';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    private authService = inject(AuthService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private _snackBar = inject(MatSnackBar);

    form: FormGroup = new FormGroup(
        {
            email: new FormControl<string>('', [Validators.email, Validators.required]),
            password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl<string>('', [Validators.required]),
        },
        [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );

    matcher = new ConfirmPasswordMatcher();

    emailPasswordLoading: boolean = false;
    googleLoading: boolean = false;

    get passwordMatchError() {
        const hasError = this.form.getError('mismatch') && this.form.get('confirmPassword')?.touched;
        return hasError;
    }

    submitRecord() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.emailPasswordLoading = true;

        const { email, password } = this.form.value;

        this.registerFollowUp(this.authService.registerNewAccount(email, password));
    }

    registerWithGoogle() {
        this.googleLoading = true;
        this.registerFollowUp(this.authService.loginWithGoogle());
    }

    registerFollowUp(register: Observable<UserCredential>) {
        register
            .pipe(
                switchMap(({ user: { uid, displayName, email, phoneNumber, photoURL } }) => {

                    const name = displayName?.split(' ');

                    let firstName = displayName || '', lastName = '';

                    if(name && name?.length > 1) {
                        firstName = name[0];
                        name.shift();
                        lastName = name.join(' ');
                    }

                    const newUser: IUser = {
                        uid,
                        email: email || '',
                        firstName,
                        lastName,
                        phone: phoneNumber || '',
                        address: '',
                        photoURL: photoURL || '',
                    };
                    return this.authService.addUser(newUser);
                }),
                finalize(() => {
                    this.googleLoading = false;
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

    openSnackBar(message: string, error: boolean = false) {
        const snackBarClass = error ? 'mat-warn' : 'mat-primary';
        this._snackBar.open(message, 'Ok', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', snackBarClass],
        });
    }
}
