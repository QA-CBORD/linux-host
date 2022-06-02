import { VaultErrorCodes, VaultMigrator } from "@ionic-enterprise/identity-vault";
import { PinCloseStatus, VaultMigrateResult } from "./model.identity";
import { PinAuthentication } from "./pin-authentication";
import { VaultFactory } from "./vault-factory.service";
import { VaultIdentityService } from "./vault.identity.service";

export class VaultMigration {
    private pinAuthenticator: PinAuthentication;

    constructor(private readonly vaultService: VaultIdentityService) {
        this.pinAuthenticator = VaultFactory.newVaultPinAuthenticatorInstance(vaultService.modalController);
    }

    private initMigrator(onPasscodeRequestedCb: () => Promise<string>): VaultMigrator {
        return VaultFactory.newVaultMigratorInstance(onPasscodeRequestedCb);
    }

    private noDataInLegacyVault({ code, message }) {
        return (!code && /no data in legacy vault/.test(message));
    }

    private userFailedBiometricsAuth(error) {
        return (error.code != VaultErrorCodes.AuthFailed
            && this.vaultService.isBiometricPermissionDenied(error))
            || error.code === VaultErrorCodes.TooManyFailedAttempts
            || error.code === VaultErrorCodes.iOSBiometricsLockedOut
            || error.code === VaultErrorCodes.AndroidBiometricsLockedOut
            || error.code === VaultErrorCodes.BiometricsNotEnabled;
    }


    async doVaultMigration(): Promise<{ pin?: string, migrationResult: VaultMigrateResult, biometricUsed: boolean }> {
        if (await this.vaultService.userPreferenceService.cachedBiometricsEnabledUserPreference()) {
            return this.migrateBiometricLogin()
        } else {
            return this.migratePinLogin();
        }
    }

    private async migrateBiometricLogin(): Promise<{ pin?: string, migrationResult: VaultMigrateResult, biometricUsed: boolean }> {
        const migrator = this.initMigrator(() => this.handleAuthFailureOnVaultMigration().then(({ pin }) => pin || "Failed"));
        let migrationResponse: any = { migrationResult: VaultMigrateResult.MIGRATION_FAILED };
        try {
            const { session } = await migrator.exportVault();
            migrationResponse = this.onMigrateSuccess(session.pin);
        } catch (error) {
            if (this.noDataInLegacyVault(error)) {
                migrationResponse.migrationResult = VaultMigrateResult.MIGRATION_NOT_NEEDED;
            } if (this.userFailedBiometricsAuth(error)) {
                migrationResponse = await this.handleAuthFailureOnVaultMigration();
            }
        } finally {
            migrator.clear();
        }

        return { ...migrationResponse, biometricUsed: await this.vaultService.isBiometricAvailable() };
    }

    /**
 * Will migrate data from old vault to new vault if needed. called externally.
 * @returns 
 */
    private async migratePinLogin(): Promise<{ pin?: string, migrationResult: VaultMigrateResult, biometricUsed: boolean }> {
        let migrationResponse: any = { migrationResult: VaultMigrateResult.MIGRATION_FAILED };
        const migrator = this.initMigrator(() => this.pinAuthenticator.onPasscodeRequested());
        try {
            const { session } = await this.pinAuthenticator.try(() => migrator.exportVault());
            migrationResponse = this.onMigrateSuccess(session.pin);
        } catch (error) {
            if (this.noDataInLegacyVault(error)) {
                migrationResponse.migrationResult = VaultMigrateResult.MIGRATION_NOT_NEEDED;
            }
        } finally {
            migrator.clear();
        }
        return { ...migrationResponse, biometricUsed: false };
    }

    private onMigrateSuccess(pin: string) {
        return { pin, migrationResult: VaultMigrateResult.MIGRATION_SUCCESS };
    }

    private async handleAuthFailureOnVaultMigration(): Promise<{ pin?: string, migrationResult: VaultMigrateResult }> {
        const { pin, status } = await this.pinAuthenticator.tryUnlock0();
        if (PinCloseStatus.LOGIN_SUCCESS != status) {
            return { migrationResult: VaultMigrateResult.MIGRATION_FAILED };
        } else {
            return this.onMigrateSuccess(pin);
        }
    }
}