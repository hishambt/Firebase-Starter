import { AuthPipeGenerator, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, of, switchMap } from 'rxjs';

import { AuthUser } from '../../shared/models/IUser.model';

// if user is not authorized to access a page, the user will be redirected to the login with a return URL
export const authGuard: AuthPipeGenerator = (_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) =>
	switchMap((user: AuthUser) => {
		return of(user).pipe(
			redirectUnauthorizedTo(`/auth/login?returnUrl=${_state.url}`),
			map((result) => {
				if (result === true) {
					if (user!.emailVerified) {
						return true;
					} else {
						return `/auth/verify-email?returnUrl=${_state.url}`;
					}
				} else {
					return result;
				}
			}),
		);
	});
export const verifyGuard: AuthPipeGenerator = (_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) =>
	switchMap((user: AuthUser) => {
		return of(user).pipe(
			redirectLoggedInTo('/home'),
			map((result) => {
				if (result == true) {
					return '/auth/login';
				} else if (user?.emailVerified) {
					return result;
				} else {
					return true;
				}
			}),
		);
	});
