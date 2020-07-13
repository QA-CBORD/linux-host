import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { map, take } from 'rxjs/operators';
import { from, Observable, of, zip } from 'rxjs';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { ROLES } from '../../app.global';
import { GUEST_ROUTES } from '../../non-authorized/non-authorized.config';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { PATRON_ROUTES } from '@sections/section.config';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router,
              private readonly identityFacadeService: IdentityFacadeService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
    // return from(this.identityFacadeService.determineFromBackgroundLoginState()).pipe(
    //   take(1),
    //   map((loginState) => {
    //     switch (loginState) {
    //       case LoginState.SELECT_INSTITUTION:
    //         this.identityFacadeService.logoutUser();
    //         this.router.navigate([ROLES.guest, GUEST_ROUTES.entry]);
    //         break;
    //       case LoginState.BIOMETRIC_LOGIN:
    //         this.loginUser(true);
    //         break;
    //       case LoginState.BIOMETRIC_SET:
    //         this.router.navigate([ROLES.patron, PATRON_ROUTES.dashboard]);
    //         break;
    //       case LoginState.PIN_LOGIN:
    //         this.loginUser(false);
    //         return false;
    //       case LoginState.PIN_SET:
    //         this.identityFacadeService.pinOnlyLoginSetup();
    //         return false;
    //       case LoginState.HOSTED:
    //         this.router.navigate([ROLES.guest, GUEST_ROUTES.login]);
    //         return false;
    //       case LoginState.EXTERNAL:
    //         this.router.navigate([ROLES.guest, GUEST_ROUTES.external]);
    //         return false;
    //       case LoginState.DONE:
    //         this.router.navigate([ROLES.patron, PATRON_ROUTES.dashboard]);
    //         break;
    //     }
        //
        // if (Boolean(authData) && Boolean(institutionData)) {
        //   return true;
        // }

      //   console.log('AuthGuard - nav to entry and return false');
      //   this.router.navigate([ROLES.guest, GUEST_ROUTES.entry]);
      //   return false;
      // }),
    // );
  }

  private loginUser(useBiometric: boolean){
    try {
      this.identityFacadeService.loginUser(useBiometric);
    } catch (e){
      console.log('loginUser error: ', e);
    }
  }
}
