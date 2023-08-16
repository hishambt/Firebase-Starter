import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  UserCredential,
  authState,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subscription,
  from,
  map,
  take,
  tap,
} from 'rxjs';
import { INullableUser } from '../models/IUser.model';
import { traceUntilFirst } from '@angular/fire/performance';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user$: BehaviorSubject<INullableUser> =
    new BehaviorSubject<INullableUser>(null);

  constructor(@Optional() private auth: Auth) {
    if (auth) {
      authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          map((user: User | null): INullableUser => {
            return {
              ...user,
              isLoggedIn: !!user,
              extendedProps: {
                test: "test"
              }
            }
          })
        )
        .subscribe((user: INullableUser) => {
          this.user$.next(user);
        });
    }
  }

  login() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()))
      .pipe(take(1))
      .subscribe();
  }

  logout() {
    return from(signOut(this.auth));
  }
}
