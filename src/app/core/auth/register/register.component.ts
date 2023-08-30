import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, finalize, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators, ConfirmPasswordMatcher } from 'src/app/shared/helpers/confirmed.validator';
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

        this.registerFollowUp(
            this.authService.registerNewAccount(email, password).pipe(
                switchMap((creds: UserCredential) => {
                    return this.authService.sendVerificationEmail(creds.user);
                })
            )
        );
    }

    registerFollowUp(register: Observable<void>) {
        register
            .pipe(
                take(1),
                finalize(() => {
                    this.emailPasswordLoading = false;
                })
            )
            .subscribe({
                next: () => this.onSuccess(),
                error: (error: Error) => this.onFailure(error.message),
            });
    }

    onSuccess() {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigateByUrl(returnUrl);
    }

    onFailure(message: string) {
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
