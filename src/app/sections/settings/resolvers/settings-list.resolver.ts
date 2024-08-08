import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/app.global';

export const settingsListResolver: ResolveFn<Observable<SettingInfoList>> = (): Observable<SettingInfoList> => {
  const settingsFacade = inject(SettingsFacadeService);

  return settingsFacade.fetchSettingList(Settings.SettingList.MOBILE_CREDENTIALS);
};
