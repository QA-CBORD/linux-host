import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SettingItemConfig, SettingsSectionConfig, SettingsServices } from '../models/setting-items-config.model';
import { SETTINGS_CONFIG } from '../settings.config';
import { catchError, map, take } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import Setting = Settings.Setting;
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';
import { AccountsService } from '@sections/dashboard/services';
import { LoadingService } from '@core/service/loading/loading.service';

@Injectable()
export class SettingsFactoryService {
  services: SettingsServices = {
    authService: this.authFacadeService,
    identity: this.identityFacadeService,
    userService: this.userFacadeService,
    globalNav: this.globalNav,
    modalController: this.modalController,
    contentString: this.contentStringFacadeService,
    settings: this.settingsFacade,
    institution: this.institutionFacadeService,
    environment: this.environmentFacadeService,
    appBrowser: this.appBrowser,
    mobileCredentialFacade: this.mobileCredentialFacade,
    sessionFacadeService: this.sessionFacadeService,
    profileService: this.profileService,
    accountService: this.accountService,
    loadingService: this.loadingService,
  };

  constructor(
    private readonly authFacadeService: AuthFacadeService,
    private readonly settingsFacade: SettingsFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly contentStringFacadeService: ContentStringsFacadeService,
    private readonly globalNav: GlobalNavService,
    private readonly appBrowser: InAppBrowser,
    private readonly modalController: ModalsService,
    private readonly mobileCredentialFacade: MobileCredentialFacade,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly profileService: ProfileServiceFacade,
    private readonly accountService: AccountsService,
    private readonly loadingService: LoadingService
  ) {}

  async getSettings(): Promise<SettingsSectionConfig[]> {
    const parsedSettings: SettingsSectionConfig[] = SETTINGS_CONFIG.map(settingSection => {
      const settingSectionCopy = { ...settingSection };
      settingSectionCopy.items = [...settingSectionCopy.items];
      return settingSectionCopy;
    });
    for (let sectionIndex = 0; sectionIndex < parsedSettings.length; sectionIndex++) {
      const section = parsedSettings[sectionIndex];
      const promises = [];
      const hiddenSettings: { [key: string]: boolean } = {};

      for (let settingIndex = 0; settingIndex < section.items.length; settingIndex++) {
        const setting = section.items[settingIndex];
        promises.push(
          this.checkDisplayOption(setting).then(enabled => {
            if (enabled) {
              setting.setToggleStatus && setting.setToggleStatus(this.services);
              setting.setCallback && setting.setCallback(this.services);
            } else hiddenSettings[setting.id] = true;
          })
        );
      }

      await Promise.all(promises);
      section.items = section.items.filter(setting => !hiddenSettings[setting.id]);
      section.items.length === 0 && parsedSettings.splice(sectionIndex, 1) && sectionIndex--;
    }
    return parsedSettings;
  }

  private checkDisplayOption(setting: SettingItemConfig): Promise<boolean> {
    return setting.checkIsVisible(this.services);
  }

  get photoUploadEnabled$(): Observable<boolean> {
    return this.settingsFacade.getSetting(Setting.PHOTO_UPLOAD_GRAYEDOUT).pipe(
      map(setting => Boolean(JSON.parse(setting.value))),
      take(1),
      catchError(() => of(false))
    );
  }

  get photoUploadVisible$(): Observable<boolean> {
    return this.settingsFacade.getSetting(Setting.PHOTO_UPLOAD_ENABLED).pipe(
      map(setting => Boolean(JSON.parse(setting.value))),
      take(1),
      catchError(() => of(false))
    );
  }
}
