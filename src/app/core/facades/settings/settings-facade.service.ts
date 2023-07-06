import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { Observable, of, zip } from 'rxjs';
import { SettingsStateService } from '@core/states/settings/settings-state.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { SettingsApiService } from '@core/service/settings-api-service/settings-api.service';
import { UserSettingInfo } from '@core/model/user';
import { finalize, first, map, switchMap, tap } from 'rxjs/operators';
import { UserSettingsStateService } from '@core/states/user-settings/user-settings-state.service';
import { Settings, User } from '../../../app.global';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsFacadeService extends ServiceStateFacade {
  constructor(
    private readonly settingsStateService: SettingsStateService,
    private readonly userSettingsStateService: UserSettingsStateService,
    private readonly settingsApiService: SettingsApiService
  ) {
    super();
  }

  getCachedSettings(): Observable<SettingInfo[]> {
    return this.settingsStateService.state$;
  }

  getSetting(setting: Settings.Setting, sessionId?: string, institutionId?: string): Observable<SettingInfo> {
    return this.settingsStateService
      .getSetting(setting)
      .pipe(switchMap(data => (data ? of(data) : this.fetchSetting(setting, sessionId, institutionId))));
  }

  getIsGuestRegAllowed(institutionId?: string, sessionId?: string): Observable<SettingInfo> {
    const setting = Settings.Setting.INSTITUTION_GUEST_LOGIN_ENABLED;
    const call = this.settingsApiService.getSetting(setting, sessionId, institutionId);
    return this.makeRequestWithUpdatingStateHandler<SettingInfo>(call, this.settingsStateService);
  }

  getSettings(settings: Settings.Setting[], sessionId?: string, institutionId?: string): Observable<SettingInfo[]> {
    return zip(...settings.map(setting => this.getSetting(setting, sessionId, institutionId)));
  }

  fetchSetting(setting: Settings.Setting, sessionId?: string, institutionId?: string): Observable<SettingInfo> {
    const call = this.settingsApiService.getSetting(setting, sessionId, institutionId);
    return this.makeRequestWithUpdatingStateHandler<SettingInfo>(call, this.settingsStateService).pipe(
      tap(sett => this.settingsStateService.updateState(sett))
    );
  }

  fetchSettingValue$(setting: Settings.Setting, sessionId?: string, institutionId?: string): Observable<string> {
    return this.settingsApiService.getSetting(setting, sessionId, institutionId).pipe(
      map(sett => sett?.value)
    );
  }

  private fetchSettings(
    setting: Settings.Setting[],
    sessionId?: string,
    institutionId?: string
  ): Observable<SettingInfo[]> {
    const call = this.settingsApiService.getSettings(setting, sessionId, institutionId);
    return this.makeRequestWithUpdatingStateHandler<SettingInfo[]>(call, this.settingsStateService).pipe(
      tap(sett => {
        this.settingsStateService.updateState(sett);
      })
    );
  }

  fetchSettingList(
    settings: Settings.SettingList,
    sessionId?: string,
    institutionId?: string
  ): Observable<SettingInfoList> {
    const call = this.settingsApiService.getSettingList(settings, sessionId, institutionId);
    return this.makeRequestWithUpdatingStateHandler<SettingInfoList>(call, this.settingsStateService).pipe(
      tap(setting => {
        this.settingsStateService.updateState(setting.list);
      })
    );
  }

  getUserSettingNoCache(setting: User.Settings): Observable<UserSettingInfo> {
    return this.settingsApiService.getUserSetting(setting);
  }

  getUserSetting(setting: User.Settings): Observable<UserSettingInfo> {
    return this.userSettingsStateService
      .getSetting(setting)
      .pipe(switchMap(data => (data ? of(data) : this.fetchUserSetting(setting))));
  }

  private fetchUserSetting(setting: User.Settings): Observable<UserSettingInfo> {
    const call = this.settingsApiService.getUserSetting(setting);
    return this.makeRequestWithUpdatingStateHandler<UserSettingInfo>(call, this.userSettingsStateService).pipe(
      tap(sett => {
        this.userSettingsStateService.updateState(sett);
      })
    );
  }

  deleteUserSetting(setting: User.Settings): Observable<boolean> {
    const call = this.settingsApiService.deleteUserSetting(setting);
    return this.makeRequestWithUpdatingStateHandler<boolean>(call, this.userSettingsStateService).pipe(
      first(),
      finalize(() => this.userSettingsStateService.removeSetting(setting))
    );
  }

  saveUserSetting(setting: User.Settings, value: string): Observable<boolean> {
    const call = this.settingsApiService.saveUserSetting(setting, value);
    return this.makeRequestWithUpdatingStateHandler<boolean>(call, this.userSettingsStateService).pipe(
      tap(success => {
        if (success) {
          this.userSettingsStateService.updateState({ userId: null, name: setting, value });
        }
        return success;
      })
    );
  }

  cleanCache() {
    this.settingsStateService.clearState();
  }
}
