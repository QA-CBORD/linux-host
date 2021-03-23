import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { Observable, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';
import { GuestFacadeService } from './guest.facade.service';
import { MessageChannel } from '@shared/model/shared-api';

@Injectable({
  providedIn: 'root',
})
export class GuestDashboardResolver implements Resolve<Observable<SettingInfoList>> {
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly loadingService: LoadingService,
    private readonly userFacadeService: UserFacadeService,
    private readonly guestFacadeService: GuestFacadeService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SettingInfoList> | Observable<Observable<SettingInfoList>> | Promise<Observable<SettingInfoList>> {
    const dashboardSectionsObs = this.guestFacadeService.configureGuestDashboard().pipe(take(1));
    const settingListObs = this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES).pipe(take(1));
    return zip(settingListObs, dashboardSectionsObs).pipe(map(([settings, dashboardSections]) => {
      MessageChannel.put(dashboardSections);
      return settings;
    }));
  }
}
