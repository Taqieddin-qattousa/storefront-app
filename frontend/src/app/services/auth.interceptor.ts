import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, catchError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Skip auth for public endpoints (products listing, product details)
  const publicEndpoints = [
    '/api/products',
    '/api/products/',
  ];
  
  const isPublicEndpoint = publicEndpoints.some(endpoint => 
    req.url === endpoint || req.url.startsWith(endpoint)
  );

  // Skip authentication for public endpoints
  if (!req.url.startsWith('/api') || isPublicEndpoint) {
    return next(req);
  }

  // Get token and add to request for protected endpoints (orders, users)
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
