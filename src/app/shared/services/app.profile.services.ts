import { Injectable } from "@angular/core";
import { SettingsFacadeService } from "@core/facades/settings/settings-facade.service";
import { SettingInfo } from "@core/model/configuration/setting-info.model";
import { APP_PROFILES } from "@sections/dashboard/models";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";



@Injectable({ providedIn: "root" })
export class ProfileService {

    constructor(private readonly settingsFacadeService: SettingsFacadeService) { }

    determineCurrentProfile(settings: SettingInfo[]): APP_PROFILES {
        //Note: Guest profile will never be returned since a different dashboard is currently being used for guest profiles
        const ENABLE_HOUSING_ONLY = "enable_housing_only";
        const housingOnlySetting = settings.find(({ name }) => name == ENABLE_HOUSING_ONLY);
        const housingOnlyEnabled = housingOnlySetting && !!Number(housingOnlySetting.value);
        return housingOnlyEnabled && APP_PROFILES.housing || APP_PROFILES.patron;
    }


    determineCurrentProfile$(): Observable<APP_PROFILES> {
        return this.settingsFacadeService.getCachedSettings()
            .pipe(take(1), map((settings) => this.determineCurrentProfile(settings)));
    }

}