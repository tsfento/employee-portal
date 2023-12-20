import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
const authService = inject(AuthService);
const router = inject(Router);

// Use rxjs operators to determine if the user is authenticated
return authService.currentUser.pipe(
take(1),
map((user) => {
  const isAuth = !!user;

  // If the user is authenticated, allow access to the route
  if (isAuth) {
    if (route.routeConfig?.path === 'welcome') {
      return router.createUrlTree(['']);
    }
    return true;
  } else {
    // If the user is not authenticated, redirect to the welcome page
    if (route.routeConfig?.path === 'welcome') {
      return true;
    }
    return router.createUrlTree(['welcome']);
  }
}));
};
