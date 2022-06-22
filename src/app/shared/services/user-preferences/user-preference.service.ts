import { Injectable } from "@angular/core";
import { StorageStateService } from "@core/states/storage/storage-state.service";
import { firstValueFrom } from "@shared/utils";

@Injectable({
    providedIn: 'root',
})
export class UserPreferenceService {

    private readonly pinEnabledUserPreference = 'get_pinEnabledUserPreference';
    private readonly biometricsEnabledUserPreference = 'get_biometricsEnabledUserPreference';
    private readonly biometricPermissionDeniedKey = "userDeniedBiometricPermission";

    constructor(
        private readonly storageStateService: StorageStateService
    ) { }


    async cachedBiometricsEnabledUserPreference(useStrongCheck = false): Promise<boolean> {
        const biometricEnabled = await this.isEnabledByKey(this.biometricsEnabledUserPreference, useStrongCheck);
        return biometricEnabled && !await this.getBiometricPermissionDenied();
    }

    async cachedPinEnabledUserPreference(useStrongCheck = false): Promise<boolean> {
        return await this.isEnabledByKey(this.pinEnabledUserPreference, useStrongCheck);
    }

    private async isEnabledByKey(key: string, useStrongCheck: boolean): Promise<boolean> {
        const storedData = await firstValueFrom(this.storageStateService.getStateEntityByKey$<string>(key));
        if (storedData)
            return Boolean(storedData.value);
        return !useStrongCheck;
    }

    setPinEnabledUserPreference(value: boolean) {
        this.storageStateService.updateStateEntity(this.pinEnabledUserPreference, value, { highPriorityKey: true });
    }

    setBiometricsEnabledUserPreference(value: boolean) {
        this.storageStateService.updateStateEntity(this.biometricsEnabledUserPreference, value, { highPriorityKey: true });
    }

    setBiometricPermissionDenied() {
        this.setBiometricsEnabledUserPreference(false);
        this.storageStateService.updateStateEntity(this.biometricPermissionDeniedKey, true, {
            highPriorityKey: true,
            keepOnLogout: true,
        });
    }

    async getBiometricPermissionDenied(): Promise<boolean> {
        return await this.isEnabledByKey(this.biometricPermissionDeniedKey, true);
    }
}