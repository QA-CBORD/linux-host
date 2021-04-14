import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { APP_ROUTES } from '@sections/section.config';
import { ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly router: Router, private readonly authFacadeService: AuthFacadeService) {}

  async navigate(params: string[], extras?: any): Promise<boolean> {
    const isGuestUser = await this.authFacadeService.isGuestUser().toPromise();
    const [first, second, more] = params;
    const finalPath = (isGuestUser && `${ROLES.guest}/${first}`) || `${ROLES.patron}/${first}`;
    if(!second){
      return this.router.navigate([finalPath], extras);
    } else if (more) {
      return this.router.navigate([finalPath, second, more], extras);
    } else {
      return this.router.navigate([finalPath, second], extras);
    }
  }


  async navigateAnonymous(path: ANONYMOUS_ROUTES, extras?: any): Promise<boolean> {
   return this.router.navigate([ROLES.anonymous, path], extras);
  }


}



export interface NavParams {
  path: APP_ROUTES;
  ext: LOCAL_ROUTING;
  [key: string]: any;
}
