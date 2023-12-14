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
        if (route.routeConfig?.path === 'welcome') {
          return router.createUrlTree(['']);
        }

        return true;
      } else {
        if (route.routeConfig?.path === 'welcome') {
          return true;
        }

        return router.createUrlTree(['welcome']);
      }
    })
  );
};
