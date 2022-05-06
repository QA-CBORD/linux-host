import { Injectable } from "@angular/core";
import { StorageEntity } from "@core/classes/extendable-state-manager";
import { StorageStateService } from "@core/states/storage/storage-state.service";
import { firstValueFrom } from "@shared/utils";

@Injectable({
    providedIn: 'root',
})
export class UserPreferenceService {

    private pinEnabledUserPreference = 'get_pinEnabledUserPreference';
    private biometricsEnabledUserPreference = 'get_biometricsEnabledUserPreference';

    constructor(private readonly storageStateService: StorageStateService) { }


    async cachedBiometricsEnabledUserPreference(useStrongCheck: boolean = false): Promise<boolean> {
        return await this.isEnabledByKey(this.biometricsEnabledUserPreference, useStrongCheck);
    }

    async cachedPinEnabledUserPreference(useStrongCheck: boolean = false): Promise<boolean> {
        return await this.isEnabledByKey(this.pinEnabledUserPreference, useStrongCheck);
    }

    private async isEnabledByKey(key: string, useStrongCheck: boolean): Promise<boolean> {
        const storedData = await firstValueFrom(this.storageStateService.getStateEntityByKey$<string>(key));
        console.log("getStoredData: ", storedData, "  key: ", key);
        if (storedData) {
            return Boolean(storedData.value);
        }
        return !useStrongCheck;
    }

    setPinEnabledUserPreference(value: boolean) {
        console.log("setPinEnabledUserPreference: ", value);
        this.storageStateService.updateStateEntity(this.pinEnabledUserPreference, value, { highPriorityKey: true });
    }

    setBiometricsEnabledUserPreference(value: boolean) {
        console.log("setBiometricsEnabledUserPreference: ", value);
        this.storageStateService.updateStateEntity(this.biometricsEnabledUserPreference, value, { highPriorityKey: true });
    }
}