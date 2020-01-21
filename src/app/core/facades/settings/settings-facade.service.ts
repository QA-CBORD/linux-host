import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { Observable, zip } from 'rxjs';
import { SettingsStateService } from '@core/states/settings/settings-state.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { SettingsApiService } from '@core/service/settings-api-service/settings-api.service';
import { MessageResponse } from '@core/model/service/message-response.model';
import { UserSettingInfo } from '@core/model/user';
import { tap } from 'rxjs/operators';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsFacadeService extends ServiceStateFacade {

  constructor(private readonly stateService: SettingsStateService,
              private readonly settingsApiService: SettingsApiService) {
    super();
  }

  get settings$(): Observable<SettingInfo[]> {
    return this.stateService.state$;
  }

  get isUpdating$(): Observable<boolean> {
    return this.stateService.isUpdating$;
  }

  getSetting$(domain: string, category: string, name: string): Observable<SettingInfo> {
    return this.stateService.getSetting$(domain, category, name);
  }

  saveUserSettingsByName$(settingName: string, settingValue: string): Observable<MessageResponse<boolean>> {
    return this.settingsApiService.saveUserSettingsByName(settingName, settingValue);
  }

  fetchUserSettingsByName$(settingName: string): Observable<UserSettingInfo> {
    const call = this.settingsApiService.getUserSettingsByName(settingName);

    return this.makeRequestWithUpdatingStateHandler<UserSettingInfo>(call, this.stateService).pipe(
      tap((data: UserSettingInfo) => this.addSettingsToState(data))
    );
  }

  addSettingsToState(settings: SettingInfo | SettingInfo[]) {
    this.stateService.updateState(settings);
  }

  fetchSettingByConfig$(config: ContentStringRequest): Observable<SettingInfo> {
    const call = this.settingsApiService.getSettingByConfig(config);

    return this.makeRequestWithUpdatingStateHandler<SettingInfo>(call, this.stateService).pipe(
      tap((data: SettingInfo) => this.addSettingsToState(data))
    );
  }

  fetchSettings$(settings: ContentStringRequest[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.fetchSettingByConfig$(setting));
    const call = zip(...requestArray);

    return this.makeRequestWithUpdatingStateHandler<SettingInfo[]>(call, this.stateService).pipe(
      tap((data: SettingInfo[]) => this.addSettingsToState(data))
    );
  }

  removeSetting(domain: string, category: string, name: string) {
    this.stateService.removeSetting(domain, category, name);
  }
}
