import { Component, OnInit } from '@angular/core';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { ROLES } from '../../../app.global';
import { GUEST_ROUTES } from '../../non-authorized.config';
import { PATRON_ROUTES } from '@sections/section.config';
import { Router } from '@angular/router';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { from } from 'rxjs';

@Component({
  selector: 'st-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly authFacadeService: AuthFacadeService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    console.log('Startup Page - ViewWillEnter');
    this.doLoginChecks();
  }

  private doLoginChecks() {
    const routeConfig = { replaceUrl: true };
    this.authFacadeService
      .getAuthSessionToken$()
      .pipe(
        switchMap(sessionId =>
          from(this.identityFacadeService.determineFromBackgroundLoginState(sessionId))
        ),
        take(1)
      )
      .subscribe(state => {
        console.log('StartupPage - login state:', state);
        switch (state) {
          case LoginState.SELECT_INSTITUTION:
            this.identityFacadeService.logoutUser();
            this.router.navigate([ROLES.guest, GUEST_ROUTES.entry], routeConfig);
            break;
          case LoginState.BIOMETRIC_LOGIN:
            this.loginUser(true);
            break;
          case LoginState.BIOMETRIC_SET:
            this.router.navigate([ROLES.patron, PATRON_ROUTES.dashboard], routeConfig);
            break;
          case LoginState.PIN_LOGIN:
            this.loginUser(false);
            break;
          case LoginState.PIN_SET:
            this.identityFacadeService.pinOnlyLoginSetup();
            break;
          case LoginState.HOSTED:
            this.router.navigate([ROLES.guest, GUEST_ROUTES.login], routeConfig);
            break;
          case LoginState.EXTERNAL:
            this.router.navigate([ROLES.guest, GUEST_ROUTES.external], routeConfig);
            break;
          case LoginState.DONE:
            this.router.navigate([ROLES.patron, PATRON_ROUTES.dashboard], routeConfig);
            break;
        }
      });
  }

  private loginUser(useBiometric: boolean) {
    try {
      this.identityFacadeService.loginUser(useBiometric);
    } catch (e) {
      console.log('loginUser error: ', e);
    }
  }
}
