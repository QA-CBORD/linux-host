import { Injectable } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { UserSettingInfo } from '@core/model/user';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of, timer, zip } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Settings, User } from 'src/app/app.global';
import { BarcodeService } from './barcode.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { BARDCODE_GENERATION_TIMER } from '@shared/model/generic-constants';

@Injectable({
    providedIn: 'root',
})
export class BarcodeFacadeService {
  constructor(
    private readonly settingFacadeService: SettingsFacadeService,
    private readonly barcodeService: BarcodeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly storageStateService: StorageStateService
  ) {}

    getSetting(setting: Settings.Setting): Observable<SettingInfo> {
        return this.getInStorage<SettingInfo>(setting).pipe(switchMap((data) => data && of(data) || this.fetchSetting(setting)));
    }

    getUserSetting(setting: User.Settings): Observable<UserSettingInfo> {
        return this.getInStorage<UserSettingInfo>(setting).pipe(switchMap((data) => data && of(data) || this.fetchUserSetting(setting)));
    }

  generateBarcode(withInterval: boolean): Observable<string> {
    return this.getInStorage<boolean>(Settings.Setting.OFFLINE_BARCODE_ENABLED).pipe(
      switchMap(offlineEnabled => {
        if (offlineEnabled || offlineEnabled === null) {
          return zip(this.getUserSetting(User.Settings.CASHLESS_KEY), this.getSetting(Settings.Setting.SOA_KEY)).pipe(
            switchMap(([userSetting, setting]) =>
              this.barcodeService.generateBarcode(userSetting, setting, withInterval)
            )
          );
        }
        if (withInterval) {
          return timer(0, BARDCODE_GENERATION_TIMER).pipe(
            switchMap(() => this.authFacadeService.generateBarcodeFromServer())
          );
        }
        return this.authFacadeService.generateBarcodeFromServer();
      })
    );
  }

    private fetchUserSetting(setting: User.Settings): Observable<UserSettingInfo> {
        return this.settingFacadeService.getUserSetting(setting)
            .pipe(tap((s) => this.storageStateService.updateStateEntity(setting, s, { highPriorityKey: true })))
    }

    private fetchSetting(setting: Settings.Setting) {
        return this.settingFacadeService.getSetting(setting)
            .pipe(tap((s) => this.storageStateService.updateStateEntity(setting, s, { highPriorityKey: true })));
    }

    getInStorage<T>(key: string): Observable<T> {
        return this.storageStateService.getStateEntityByKey$<T>(key).pipe(
            take(1), switchMap(data => data && of(data.value) || of(null)));
    }

}
