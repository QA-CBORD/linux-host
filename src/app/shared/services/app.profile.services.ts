import { Injectable } from "@angular/core";
import { AuthFacadeService } from "@core/facades/auth/auth.facade.service";
import { SettingsFacadeService } from "@core/facades/settings/settings-facade.service";
import { SettingInfo } from "@core/model/configuration/setting-info.model";
import { APP_PROFILES } from "@sections/dashboard/models";
import { firstValueFrom, Observable } from 'rxjs'
import { switchMap, take } from "rxjs/operators";



@Injectable({ providedIn: "root" })
export class ProfileServiceFacade {

    constructor(private readonly settingsFacadeService: SettingsFacadeService,
        private readonly authFacadeService: AuthFacadeService) { }

    async determineCurrentProfile(settings: SettingInfo[]): Promise<APP_PROFILES> {
        const housingOnlySetting = settings.find(({ name }) => name == "enable_housing_only");
        const housingOnlyEnabled = housingOnlySetting && !!Number(housingOnlySetting.value);
        return housingOnlyEnabled && APP_PROFILES.housing || (await firstValueFrom(this.authFacadeService.isGuestUser())) && APP_PROFILES.guest || APP_PROFILES.patron;
    }


    determineCurrentProfile$(): Observable<APP_PROFILES> {
        return this.settingsFacadeService.getCachedSettings()
            .pipe(take(1), switchMap((settings) => this.determineCurrentProfile(settings)));
    }

    async housingOnlyEnabled(): Promise<boolean> {
        return await firstValueFrom(this.determineCurrentProfile$()) == APP_PROFILES.housing;
    }

}