import { Injectable, NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { APP_ROUTES } from '@sections/section.config';
import { ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private history: string[] = [];
  private notAllowedPaths = [/rooms-search\/\d*?[^/]$/, /building\/\d*?[^/]$/];
  constructor(
    private readonly router: Router,
    private readonly authFacadeService: AuthFacadeService,
    private readonly ngZone: NgZone
  ) {}

  async navigate(params: string[], extras?: Partial<NavigationExtras>): Promise<boolean> {
    const isGuestUser = await this.authFacadeService.isGuestUser().toPromise();
    const [first, second, more] = params;
    const finalPath = (isGuestUser && `${ROLES.guest}/${first}`) || `${ROLES.patron}/${first}`;

    if (!second) {
      return this.ngZone.run(async () => await this.router.navigate([finalPath], extras));
    } else if (more) {
      return this.ngZone.run(async () => await this.router.navigate([finalPath, second, more], extras));
    } else {
      return this.ngZone.run(async () => await this.router.navigate([finalPath, second], extras));
    }
  }

  async navigateAnonymous(path: ANONYMOUS_ROUTES, extras?: Partial<NavigationExtras>): Promise<boolean> {
    return this.ngZone.run(async () => await this.router.navigate([ROLES.anonymous, path], extras));
  }

  navigateByUrl(url: string, extras: Partial<NavigationExtras> = {}): Promise<boolean> {
    return this.router.navigateByUrl(url, extras);
  }

  getUrl(): string {
    return this.router.url;
  }

  isRoute(urlChunk: string): boolean {
    return this.getUrl().includes(urlChunk);
  }

  trackPath(path: string) {
    if (this.isUrlAllowed(path)) {
      const url = this.removeParams(path);
      this.history.push(url);
    }
  }

  private removeParams(path: string) {
    if (path.includes('?')) {
      return path.split('?')[0];
    }
    return path;
  }

  getPreviousTrackedUrl(): string {
    if (this.history.length > 1) {
      this.history.pop();
      return this.history.pop() || '';
    }
  }

  private isPreviousUrl(path: string): boolean {
    return this.history[this.history.length - 1] == path;
  }

  private isUrlAllowed(path: string): boolean {
    return !this.notAllowedPaths.some(rx => rx.test(path)) && !this.isPreviousUrl(path);
  }

  getPreviousUrlParams() {
    if (!document.referrer) {
      return { isExistingOrder: false, openTimeSlot: false };
    }

    const urlObj = new URL(document.referrer);
    const params = new URLSearchParams(urlObj.search);
    const paramsObj = {};

    for (const [key, value] of params.entries()) {
      paramsObj[key] = value;
    }

    return paramsObj;
  }
}

export interface NavParams {
  path: APP_ROUTES;
  ext: LOCAL_ROUTING;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
