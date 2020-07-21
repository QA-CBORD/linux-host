import { take } from 'rxjs/operators';
import { ROLES } from './../../../app.global';
import { GUEST_ROUTES } from './../../non-authorized.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

@Component({
  selector: 'st-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  private changeEnvClicks: number = 0;

  constructor(
    private readonly route: Router,
    private readonly authFacadeService: AuthFacadeService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService
  ) {}

  ngOnInit() {
    this.initialization();
  }

  private async initialization(logoutUser: boolean = false) {
    try {
      logoutUser = this.route.getCurrentNavigation().extras.state.logoutUser;
    } catch (e) {}

    if (logoutUser) {
      await this.sessionFacadeService.logoutUser(false);
    }

    this.authFacadeService
      .authenticateSystem$()
      .pipe(take(1))
      .toPromise();
  }

  redirectTo() {
    this.route.navigate([ROLES.guest, GUEST_ROUTES.institutions]);
  }

  checkLocation() {
    console.log('checkLocation');
  }

  async changeEnv() {
    this.changeEnvClicks++;
    if (this.changeEnvClicks > 4) {
      this.changeEnvClicks = 0;
      await this.sessionFacadeService.logoutUser(false);
      await this.environmentFacadeService.changeEnvironment();
      this.initialization();
    }
  }
}
