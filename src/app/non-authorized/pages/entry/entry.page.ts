import { map, take } from 'rxjs/operators';
import { ROLES } from './../../../app.global';
import { ANONYMOUS_ROUTES } from './../../non-authorized.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { App } from '@capacitor/app';
import { LoadingService } from '@core/service/loading/loading.service';
import { from, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { ServicesURLProviderService } from '@core/service/service-url/services-urlprovider.service';

@Component({
  selector: 'st-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  private changeEnvClicks: number = 0;
  appVersion$: Observable<string>;

  constructor(
    private readonly route: Router,
    private readonly authFacadeService: AuthFacadeService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly loadingService: LoadingService,
    private readonly servicesURLProviderService: ServicesURLProviderService,
    private readonly platform: Platform
  ) {}

  ngOnInit() {
    this.initialization();
    this.appVersion$ = this.fetchDeviceInfo();
  }

  private async initialization(logoutUser: boolean = false) {
    await this.loadingService.showSpinner();
    try {
      logoutUser = this.route.getCurrentNavigation().extras.state.logoutUser;
    } catch (e) {}

    if (logoutUser) {
      await this.sessionFacadeService.logoutUser(false);
    }
    // Reset services url to current environment after logout and before any other service call
    await this.servicesURLProviderService.resetServicesURL();
    await this.authFacadeService
      .authenticateSystem$()
      .pipe(take(1))
      .toPromise();
    this.loadingService.closeSpinner();
  }

  private fetchDeviceInfo(): Observable<string> {
    if (!this.platform.is('cordova')) return;

    return from(App.getInfo()).pipe(
      map(({ version }) => version),
      take(1)
    );
  }

  async redirectTo() {
    this.route.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.institutions]);
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
