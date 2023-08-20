import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { Auth, User, authState } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { INullableUser } from 'src/app/shared/models/IUser.model';

export const fireauthGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    traceUntilFirst('auth'),
    map((user: User | null): boolean => {
      if (!!!user)
        router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
      return !!user;
    })
  );
};
