import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  NavigationStart,
  CanDeactivate,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardPage } from '@sections/dashboard/dashboard.page';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';

@Injectable({ providedIn: 'root' })
export class SwipeBackGuard implements CanDeactivate<DashboardPage> {
  urlDestination: string;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.urlDestination = event.url;
      }
    });
  }

  canDeactivate(
    component: DashboardPage,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (
      !this.urlDestination ||
      this.urlDestination.includes(ANONYMOUS_ROUTES.pre_login) ||
      this.urlDestination.includes(ANONYMOUS_ROUTES.login)
    ) {
      return false;
    }
    return true;
  }
}
