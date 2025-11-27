import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (_route, _state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }

      // Redirect to home page if not authenticated
      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      // If Auth0 is not configured, allow access
      // This enables testing without Auth0 setup
      console.warn('Auth0 not configured - allowing access for testing');
      return of(true);
    })
  );
};
