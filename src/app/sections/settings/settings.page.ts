import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LOCAL_ROUTING } from '@sections/settings/settings.config';
import { PATRON_NAVIGATION } from '../../app.global';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingItemConfig, SettingsSectionConfig } from './models/setting-items-config.model';
import { SettingsFactoryService } from './services/settings-factory.service';
import { map, take, switchMap, catchError } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { getUserFullName } from '@core/utils/general-helpers';
import { UserInfo } from '@core/model/user';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';
import { APP_PROFILES } from '@sections/dashboard/models';
import { App } from '@capacitor/app';
import { EnvironmentData } from '@environments/environment-data';

@Component({
  selector: 'st-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsPage implements OnInit {
  settingSections: Promise<SettingsSectionConfig[]>;
  appVersion$: Observable<string>;
  userName$: Observable<string>;
  institutionName$: Observable<string>;
  userPhoto$: Observable<string>;
  isGuest: boolean;

  constructor(
    private router: Router,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly settingsFactory: SettingsFactoryService,
    private readonly route: ActivatedRoute,
    private readonly profileService: ProfileServiceFacade
  ) { }

  ngOnInit() {
    this.settingSections = this.settingsFactory.getSettings();
    this.userName$ = this.getUserName$();
    this.institutionName$ = this.getInstitutionName$();
    this.userPhoto$ = this.getUserPhoto$();
    this.appVersion$ = this.getAppVersion$();
    this.authFacadeService.isGuestUser().toPromise().then(isGuest => (this.isGuest = isGuest));
  }

  //couldnt get photo upload route to work correctly, still trying to fix
  async navigateToPhotoUpload() {
    if (!(await this.settingsFactory.photoUploadVisible$.toPromise()) || (await this.profileService.determineCurrentProfile$().toPromise()) == APP_PROFILES.housing) {
      return;
    }
    this.router.navigate([PATRON_NAVIGATION.settings, LOCAL_ROUTING.photoUpload]);
  }

  async settingTap(setting: SettingItemConfig) {
    setting.callback && (await setting.callback());
    setting.navigate && this.router.navigate(setting.navigate, { relativeTo: this.route });
  }

  logout() {
    this.sessionFacadeService.logoutUser();
  }

  getAppVersion$(): Observable<string> {
    return from(App.getInfo()).pipe(
      map(({ version }) => version),
      take(1),
      catchError(() => of(EnvironmentData.version.versionNumber))
    );
  }

  getUserName$(): Observable<string> {
    return this.userFacadeService.getUserData$().pipe(map((userInfo: UserInfo) => getUserFullName(userInfo)));
  }

  getUserPhoto$(): Observable<string> {
    return this.userFacadeService.getAcceptedPhoto$().pipe(
      map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
      take(1),
      catchError(() => of('../../../assets/images/no_photo.svg'))
    );
  }

  getInstitutionName$(): Observable<string> {
    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ institutionId }) => this.institutionFacadeService.getInstitutionInfo$(institutionId)),
      map(({ name }) => name)
    );
  }
}
