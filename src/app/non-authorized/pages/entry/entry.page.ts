import { map, take } from 'rxjs/operators';
import { ROLES } from './../../../app.global';
import { ANONYMOUS_ROUTES } from './../../non-authorized.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { App } from '@capacitor/app';
import { LoadingService } from '@core/service/loading/loading.service';
import { from, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'st-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  private changeEnvClicks = 0;
  appVersion$: Observable<string>;

  constructor(
    private readonly route: Router,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly loadingService: LoadingService,
    private readonly platform: Platform
  ) {}

  ngOnInit() {
    this.appVersion$ = this.fetchDeviceInfo();
  }

  ionViewWillEnter() {
    this.initialization();
  }

  private async initialization() {
    await this.loadingService.showSpinner();
    // Reset services url to current environment after logout and before any other service call
    this.environmentFacadeService.resetEnvironmentAndCreateSession(true)
      .finally(() => this.loadingService.closeSpinner());
  }

  private fetchDeviceInfo(): Observable<string> {
    if (!this.platform.is('cordova')) return;

    return from(App.getInfo()).pipe(
      map(({ version }) => version),
      take(1)
    );
  }

  redirectTo() {
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
