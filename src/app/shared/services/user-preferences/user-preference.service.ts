import { Injectable } from "@angular/core";
import { StorageStateService } from "@core/states/storage/storage-state.service";
import { firstValueFrom } from "@shared/utils";

@Injectable({
    providedIn: 'root',
})
export class UserPreferenceService {

    private pinEnabledUserPreference = 'get_pinEnabledUserPreference';
    private biometricsEnabledUserPreference = 'get_biometricsEnabledUserPreference';

    constructor(private readonly storageStateService: StorageStateService) {

    }


    async cachedBiometricsEnabledUserPreference(): Promise<boolean> {
        return await this.isEnabledByKey(this.biometricsEnabledUserPreference);
    }

    async cachedPinEnabledUserPreference(): Promise<boolean> {
        return await this.isEnabledByKey(this.pinEnabledUserPreference);
    }

    private async isEnabledByKey(key: string): Promise<boolean> {
        const data = await firstValueFrom(this.storageStateService.getStateEntityByKey$<string>(key));
        console.log("getStoredValues: ", data, "  key: ", key);
        return data && Boolean(data.value) || true;
    }

    setPinEnabledUserPreference(value: boolean) {
        this.storageStateService.updateStateEntity(this.pinEnabledUserPreference, value, { highPriorityKey: true });
    }

    setBiometricsEnabledUserPreference(value: boolean) {
        this.storageStateService.updateStateEntity(this.biometricsEnabledUserPreference, value, { highPriorityKey: true });
    }
}