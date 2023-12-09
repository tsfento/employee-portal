// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   // Method to determine if a route can be activated
//   canActivate(): Observable<boolean> {
//   // See if user is authenticated using AuthService
//     return this.authService.isUserAuthenticated().pipe(
//       map((user) => {
//         if (user) {
//           return true;
//         } else {
//           this.router.navigate(['/auth']);
//           return false;
//         }
//       }),

//       // Error handling during the authentication check
//       catchError(() => {
//         this.router.navigate(['/auth']);
//         return of(false);
//       })
//     );
//   }
// }

import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;

      if (isAuth) {
        if (route.routeConfig?.path === '') {
          return router.createUrlTree(['user']);
        }

        return true;
      } else {
        if (route.routeConfig?.path === '') {
          return true;
        }

        return router.createUrlTree(['']);
      }
    })
  );
};
