import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardPage } from '@sections/dashboard/dashboard.component';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';

@Injectable({ providedIn: 'root' })
export class SwipeBackGuard {
  canDeactivate(
    component: DashboardPage,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const urlDestination = nextState?.url;
    if (
      !urlDestination ||
      urlDestination.includes(ANONYMOUS_ROUTES.pre_login) ||
      urlDestination.includes(ANONYMOUS_ROUTES.login)
    ) {
      return false;
    }
    return true;
  }
}
