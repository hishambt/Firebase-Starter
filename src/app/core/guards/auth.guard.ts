import { User } from '@angular/fire/auth';
import { AuthPipeGenerator, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, of, switchMap } from 'rxjs';

// if user is not authorized to access a page, the user will be redirected to the login with a return URL
export const authGuard: AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    switchMap((user: User | null) => {
        return of(user).pipe(
            redirectUnauthorizedTo(`/auth/login?returnUrl=${state.url}`),
            map((result) => {
                if (result === true) {
                    if (user!.emailVerified) {
                        return true;
                    } else {
                        return `/auth/verify-email?returnUrl=${state.url}`;
                    }
                } else {
                    return result;
                }
            })
        );
    });

export const verifyGuard: AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    switchMap((user: User | null) => {
        return of(user).pipe(
            redirectLoggedInTo('/home'),
            map((result) => {
                if (result == true) {
                    return '/auth/login';
                } else if (user!.emailVerified) {
                    return result;
                } else {
                    return true;
                }
            })
        );
    });
