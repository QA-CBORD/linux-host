import { Injectable } from '@angular/core';
import { from, merge, Observable, of, zip } from 'rxjs';
import {
  SettingItemConfig,
  SETTINGS_VALIDATIONS,
  SettingsSectionConfig,
  SettingsServices,
  StatusSettingValidation,
} from '../models/setting-items-config.model';
import { SETTINGS_CONFIG } from '../settings.config';
import { catchError, map, reduce, take, tap, mergeMap, switchMap } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { IdentityService } from '@core/service/identity/identity.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { ModalController } from '@ionic/angular';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import Setting = Settings.Setting;
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { configureBiometricsConfig } from '@core/utils/general-helpers';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';

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
  };

  constructor(
    private readonly authFacadeService: AuthFacadeService,
    private readonly settingsFacade: SettingsFacadeService,
    private readonly identityService: IdentityService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly contentStringFacadeService: ContentStringsFacadeService,
    private readonly globalNav: GlobalNavService,
    private readonly appBrowser: InAppBrowser,
    private readonly modalController: ModalController,
    private readonly mobileCredentialFacade: MobileCredentialFacade,
    private readonly sessionFacadeService: SessionFacadeService
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
      const hiddenSettings: { [key: string]: Boolean } = {};

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
    return this.authFacadeService.isGuestUser()
      .pipe(
        switchMap(isGuest => {
          if (isGuest && setting.studentsOnly) {
            return of(false);
          }

          const checks$: Observable<boolean>[] = [of(true)];
          if (setting.validations) {
            for (const validation of setting.validations) {
              if (validation.type === SETTINGS_VALIDATIONS.SettingEnable) {
                checks$.push(
                  this.settingsFacade.getSetting(validation.value as Settings.Setting).pipe(
                    map(({ value }): boolean => parseInt(value) === 1),
                    take(1)
                  )
                );
              } else if (validation.type === SETTINGS_VALIDATIONS.Biometric) {
                checks$.push(
                  this.identityService.areBiometricsAvailable().pipe(
                    switchMap(async biometricsEnabled => {
                      if (biometricsEnabled) {
                        const biometrics = await this.identityFacadeService.getAvailableBiometricHardware();
                        const biometric = configureBiometricsConfig(biometrics);
                        setting.label = biometric.name;
                        setting.icon = biometric.icon;
                      }
                      return biometricsEnabled;
                    }),
                    take(1)
                  )
                );
              } else if (validation.type === SETTINGS_VALIDATIONS.StatusSettingEnable) {
                const statusValidation = validation.value as StatusSettingValidation;
                checks$.push(
                  statusValidation.getStatusValidation(this.services).pipe(
                    switchMap(setting =>
                      this.settingsFacade
                        .getSetting(setting as Settings.Setting)
                        .pipe(map(({ value }): boolean => parseInt(value) === 1))
                    ),
                    take(1)
                  )
                );
              } else if (validation.type === SETTINGS_VALIDATIONS.MobileCredentialEnabled) {
                checks$.push(this.mobileCredentialFacade.showCredentialMetadata().pipe(take(1)));
              } else if (validation.type === SETTINGS_VALIDATIONS.ChangePasswordEnabled) {
                checks$.push(
                  from(this.sessionFacadeService.determineInstitutionSelectionLoginState()).pipe(
                    switchMap(login => {
                      if (login === LoginState.HOSTED) {
                        return of(true);
                      }
                      return of(false);
                    })
                  )
                );
              }
            }
          }
          return zip(...checks$).pipe(
            map(checks => checks.every(checkTrue => checkTrue)),
            take(1)
          );
        }),
        take(1)
      )
      .toPromise();
  }

  get photoUploadEnabled$(): Observable<boolean> {
    return this.settingsFacade.getSetting(Setting.PHOTO_UPLOAD_ENABLED).pipe(
      map(setting => Boolean(JSON.parse(setting.value))),
      take(1),
      catchError(() => of(false))
    );
  }
}
