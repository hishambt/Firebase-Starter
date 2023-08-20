import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize, map, take, tap } from 'rxjs';
import { authState } from '@angular/fire/auth';
import { StorageAccessorService } from 'src/app/shared/services/storage-accessor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  isWaiting: boolean = false;

  constructor(
    private storage: StorageAccessorService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if(this.storage.checkExistance("user")) {
      this.router.navigate(['home']);
    }
  }

  submitRecord() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isWaiting = true;

    this.authService
      .loginWithEmailAndPassword(
        this.form.controls['email'].value,
        this.form.controls['password'].value
      )
      .pipe(
        finalize(() => {
          this.isWaiting = false;
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
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .pipe(
        finalize(() => {
          this.isWaiting = false;
        })
      )
      .subscribe({
        next: () => this.onLoginSuccess(),
        error: (error: Error) =>  this.onLoginFailure(error.message)
      });
  }
}
