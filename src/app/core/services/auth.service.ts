import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  authState,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { BehaviorSubject, from, map, take } from 'rxjs';
import { INullableUser } from '../../shared/models/IUser.model';
import { traceUntilFirst } from '@angular/fire/performance';
import { StorageAccessorService } from 'src/app/shared/services/storage-accessor.service';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user$: BehaviorSubject<INullableUser> =
    new BehaviorSubject<INullableUser>(null);

  constructor(
    private auth: Auth,
    private storage: StorageAccessorService,
    private appSettings: AppSettingsService
  ) {
    this.linkUserState();
  }

  linkUserState() {
    this.listenToFireAuth()
      .pipe(
        map((user: User | null): INullableUser => {
          if (!!user) {
            return {
              ...user,
              isLoggedIn: !!user,
              extendedProps: {
                test: 'test',
              },
            };
          } else {
            return null;
          }
        })
      )
      .subscribe((user: INullableUser) => {
        if (user) this.storage.setLocalStorage('user', user, true);
        else this.storage.removeLocalStorageKey('user');
        this.user$.next(user);
      });
  }

  registerNewAccount(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      take(1)
    );
  }

  listenToFireAuth() {
    return authState(this.auth).pipe(traceUntilFirst('auth'));
  }

  loginWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      take(1)
    );
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      take(1)
    );
  }

  forgetPassword(email: string) {
    return from(
      sendPasswordResetEmail(this.auth, email, {
        url: this.appSettings.getUrlOrigin() + '/auth/login?passwordChanged=true',
      })
    ).pipe(take(1));
  }

  logout() {
    return from(signOut(this.auth)).pipe(take(1));
  }
}
