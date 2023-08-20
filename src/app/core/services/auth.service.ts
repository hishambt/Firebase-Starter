import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  authState,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, from, map, take } from 'rxjs';
import { INullableUser } from '../../shared/models/IUser.model';
import { traceUntilFirst } from '@angular/fire/performance';
import { StorageAccessorService } from 'src/app/shared/services/storage-accessor.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user$: BehaviorSubject<INullableUser> =
    new BehaviorSubject<INullableUser>(null);

  constructor(private auth: Auth, private storage: StorageAccessorService) {
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
        if(user) this.storage.setLocalStorage("user", user, true);
        else this.storage.removeLocalStorageKey("user");
        this.user$.next(user);
      });
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

  logout() {
    return from(signOut(this.auth)).pipe(take(1));
  }
}
