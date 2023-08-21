import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

export const fireauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.listenToFireAuth().pipe(
    map((user: User | null): boolean => {
      if (!!!user)
        router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
      return !!user;
    })
  );
};
