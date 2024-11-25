import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardPage } from '@sections/dashboard/dashboard.component';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';

@Injectable({ providedIn: 'root' })
export class SwipeBackGuard implements CanDeactivate<DashboardPage> {
  canDeactivate(
    _component: DashboardPage,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot,
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
