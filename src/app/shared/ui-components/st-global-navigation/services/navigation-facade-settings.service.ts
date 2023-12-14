import { Injectable } from '@angular/core';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { from, Observable, zip } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import {
  GUEST_NAVIGATION_BASE_CONFIG,
  NAVIGATION_BASE_CONFIG,
} from '@shared/ui-components/st-global-navigation/config';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { GuestSetting } from '@sections/guest/model/guest-settings';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { TILES_ID } from '@sections/dashboard/dashboard.config';

@Injectable()
export class NavigationFacadeSettingsService extends ServiceStateFacade {
  private readonly key: string = 'NAVIGATION_SETTINGS';
  private readonly firstNavKey: string = 'NAVIGATION_STARTUP';
  private readonly permissionResponse: string = 'ANDROID_PERMISSION_RESPONSE';

  private readonly navigationBottomBarElementCountMap = new Map<string, Observable<string>>([
    [TILES_ID.notificationBell, this.userNotificationsFacadeService.unreadNotificationsCount$],
  ]);

  constructor(
    private readonly storage: StorageStateService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly authService: AuthFacadeService,
    private readonly institutionService: InstitutionFacadeService,
    private readonly profileService: ProfileServiceFacade,
    private readonly userNotificationsFacadeService: UserNotificationsFacadeService
  ) {
    super();
  }

  get settings$(): Observable<NavigationBottomBarElement[]> {
    if (!this.isConfigInStorage()) this.storage.updateStateEntity(this.key, []);
    return this.initSettings().pipe(
      switchMap(() => this.config$),
      map(settings => this.updateReactiveProperties([...settings])),
      tap(() => this.dispatchNavigationElementsIndicatorRequests())
    );
  }

  private get config$(): Observable<NavigationBottomBarElement[]> {
    return this.storage
      .getStateEntityByKey$<NavigationBottomBarElement[]>(this.key)
      .pipe(map(data => (data ? data.value : null)));
  }

  get permissionsPrompted$(): Observable<boolean> {
    return this.storage.getStateEntityByKey$<boolean>(this.firstNavKey).pipe(map(data => !!data));
  }

  promptPermissionsOnce() {
    this.storage.updateStateEntity(this.firstNavKey, true, { highPriorityKey: true, keepOnLogout: true });
  }

  setPermissionResponse(response: { hasPermission: boolean }): void {
    this.storage.updateStateEntity(this.permissionResponse, response.hasPermission, {
      highPriorityKey: true,
      keepOnLogout: true,
    });
  }

  get permissionResponse$(): Observable<boolean> {
    return this.storage
      .getStateEntityByKey$<boolean>(this.permissionResponse)
      .pipe(map(data => (data ? data.value : false)));
  }

  private isConfigInStorage(): boolean {
    return this.storage.isKeyExistInState(this.key);
  }

  private getAllowedSettings(): Observable<NavigationBottomBarElement[]> {
    const GuestSettingObs = this.institutionService.guestSettings;
    const isGuestUserObs = this.authService.isGuestUser();
    const cachedSettingsObs = this.settingsFacadeService.getCachedSettings();
    return zip(cachedSettingsObs, isGuestUserObs, from(GuestSettingObs)).pipe(
      switchMap(async ([settingInfo, guestUser, setting]) => {
        const currentProfile = await this.profileService.determineCurrentProfile(settingInfo);
        return this.getUpdatedConfig(settingInfo, { guestUser, setting }).filter(
          ({ isEnable, supportProfiles }) => isEnable && supportProfiles.includes(currentProfile)
        );
      })
    );
  }

  private initSettings(): Observable<NavigationBottomBarElement[]> {
    return zip(
      this.storage.getStateEntityByKey$<NavigationBottomBarElement[]>(this.key),
      this.getAllowedSettings()
    ).pipe(
      take(1),
      map(([{ value: cashedSettings }, settings]) => this.updateCachedSettings(cashedSettings, settings)),
      tap(settings => this.storage.updateStateEntity(this.key, settings))
    );
  }

  private getUpdatedConfig(
    settings: SettingInfo[],
    args: {
      guestUser: boolean;
      setting: GuestSetting;
    }
  ): NavigationBottomBarElement[] {
    if (args.guestUser) {
      return GUEST_NAVIGATION_BASE_CONFIG.filter(setting => {
        setting.isEnable = setting.visibilityOn ? setting.visibilityOn(args.setting) : false;
        return setting.isEnable;
      });
    }
    return NAVIGATION_BASE_CONFIG.map(setting => {
      const s = settings.find(({ name }) => name === setting.id);
      return s ? { ...setting, isEnable: !!Number(s.value) } : setting;
    });
  }

  private updateCachedSettings(
    cashedSettings: NavigationBottomBarElement[],
    availableSettings: NavigationBottomBarElement[]
  ): NavigationBottomBarElement[] {
    const newConfig = [];
    const cached = [];
    for (let i = 0; i < availableSettings.length; i++) {
      const index = cashedSettings.findIndex(({ id }) => availableSettings[i].id === id);
      if (index !== -1) {
        cached[index] = cashedSettings[index];
      } else {
        newConfig.push(availableSettings[i]);
      }
    }
    return [...cached.filter(Boolean), ...newConfig];
  }

  private updateReactiveProperties(settings: NavigationBottomBarElement[]) {
    return settings.map(setting => {
      if (this.navigationBottomBarElementCountMap.has(setting.id)) {
        setting.indicatorValue$ = this.navigationBottomBarElementCountMap.get(setting.id);
      }
      return setting;
    });
  }
  private dispatchNavigationElementsIndicatorRequests() {
    this.userNotificationsFacadeService.fetchNotificationsCount();
  }
}
