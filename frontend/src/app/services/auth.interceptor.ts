import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Only add token to API requests
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  // Get token and add to request
  return authService.getAccessTokenSilently().pipe(
    switchMap((token) => {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(clonedRequest);
    }),
    catchError(() => {
      // If token retrieval fails, continue without token
      return next(req);
    }),
  );
};
