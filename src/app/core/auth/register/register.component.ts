import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators, ConfirmPasswordMatcher } from 'src/app/shared/helpers/confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private authService =  inject(AuthService);
  private route =  inject(ActivatedRoute);
  private router =  inject(Router);
  private _snackBar =  inject(MatSnackBar);

  form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  }, [CustomValidators.MatchValidator('password', 'confirmPassword')]);

  matcher = new ConfirmPasswordMatcher();

  emailPasswordLoading: boolean = false;
  googleLoading: boolean = false;

  get passwordMatchError() {
    const hasError = this.form.getError('mismatch') &&
    this.form.get('confirmPassword')?.touched;
    return hasError;
  }

  submitRecord() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.emailPasswordLoading = true;

    this.authService.registerNewAccount(this.form.controls['email'].value,
    this.form.controls['password'].value)
    .pipe(
      finalize(() => {
        this.emailPasswordLoading = false;
      })
    )
    .subscribe({
      next: () => this.onLoginSuccess(),
      error: (error: Error) =>  this.onLoginFailure(error.message)
    });
  }

  registerWithGoogle() {
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
        error: (error: Error) =>  this.onLoginFailure(error.message)
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
      panelClass: ['mat-toolbar', snackBarClass]
    });
  }
}
