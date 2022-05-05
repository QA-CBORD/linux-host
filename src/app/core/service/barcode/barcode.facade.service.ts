import { Injectable } from "@angular/core";
import { SettingsFacadeService } from "@core/facades/settings/settings-facade.service";
import { SettingInfo } from "@core/model/configuration/setting-info.model";
import { UserSettingInfo } from "@core/model/user";
import { StorageStateService } from "@core/states/storage/storage-state.service";
import { Observable, of, zip } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";
import { Settings, User } from "src/app/app.global";
import { BarcodeService } from "./barcode.service";

@Injectable({
    providedIn: 'root',
})
export class BarcodeFacadeService {


    constructor(
        private readonly settingFacadeService: SettingsFacadeService,
        private readonly barcodeService: BarcodeService,
        private readonly storageStateService: StorageStateService) { }

    getSetting(setting: Settings.Setting): Observable<SettingInfo> {
        return this.getInStorage<SettingInfo>(setting).pipe(switchMap((data) => data && of(data) || this.fetchSetting(setting)));
    }

    getUserSetting(setting: User.Settings): Observable<UserSettingInfo> {
        return this.getInStorage<UserSettingInfo>(setting).pipe(switchMap((data) => data && of(data) || this.fetchUserSetting(setting)));
    }

    generateBarcode(arg0: boolean): Observable<string> {
        return zip(
            this.getUserSetting(User.Settings.CASHLESS_KEY),
            this.getSetting(Settings.Setting.SOA_KEY)
        ).pipe(
            switchMap(([userSetting, setting]) => this.barcodeService.generateBarcode(arg0, userSetting, setting))
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