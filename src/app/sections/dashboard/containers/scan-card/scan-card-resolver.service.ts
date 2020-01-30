import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { DASHBOARD_SETTINGS_CONFIG } from '@sections/dashboard/dashboard.config';
import { take } from 'rxjs/operators';
import { SettingInfo } from '@core/model/configuration/setting-info.model';

@Injectable()
export class ScanCardResolverService implements Resolve<Observable<SettingInfo>>{

  constructor(private readonly settingsFacadeService: SettingsFacadeService) { }

  resolve(): Observable<SettingInfo> {
    return this.settingsFacadeService.fetchSettingByConfig$(DASHBOARD_SETTINGS_CONFIG.displayMediaType).pipe(take(1));
  }
}
