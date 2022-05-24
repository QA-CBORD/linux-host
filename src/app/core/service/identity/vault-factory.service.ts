import { Capacitor } from "@capacitor/core";
import { BrowserVault, DeviceSecurityType, IdentityVaultConfig, Vault, VaultMigrator, VaultType } from "@ionic-enterprise/identity-vault";


export const VAULT_DEFAULT_TIME_OUT_IN_MILLIS = 5000;

export const vaultConfig: IdentityVaultConfig = {
    key: 'get.cbord.com',
    type: VaultType.CustomPasscode,
    deviceSecurityType: DeviceSecurityType.None,
    lockAfterBackgrounded: VAULT_DEFAULT_TIME_OUT_IN_MILLIS
};

export class VaultFactory {

    static newVaultInstance(config: IdentityVaultConfig = vaultConfig): Vault | BrowserVault {
        return Capacitor.getPlatform() === 'web' ? new BrowserVault(config) : new Vault(config);
    }


    static newVaultMigratorInstance(onPasscodeRequested: (v: boolean) => Promise<string>): VaultMigrator {
        // old V4 config
        const oldVaultConfig = {
            restoreSessionOnReady: false,
            unlockOnReady: false,
            unlockOnAccess: false,
            lockAfter: 5000,
            hideScreenOnBackground: false,
            allowSystemPinFallback: false,
            shouldClearVaultAfterTooManyFailedAttempts: false
        };
        return new VaultMigrator(oldVaultConfig, () => onPasscodeRequested(false));
    }

}