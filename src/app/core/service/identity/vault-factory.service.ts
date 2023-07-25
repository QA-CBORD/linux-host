import { Capacitor } from '@capacitor/core';
import {
  BrowserVault,
  DeviceSecurityType,
  IdentityVaultConfig,
  Vault,
  VaultErrorCodes,
  VaultMigrator,
  VaultType,
} from '@ionic-enterprise/identity-vault';
import { ModalController } from '@ionic/angular';
import { PinCloseStatus, VaultMigrateResult, VAULT_DEFAULT_TIME_OUT_IN_MILLIS } from './model.identity';
import { PinAuthenticator } from './pin-authentication';
import { VaultIdentityService } from './vault.identity.service';

const vaultConfig: IdentityVaultConfig = {
  key: 'get.cbord.com',
  type: VaultType.CustomPasscode,
  deviceSecurityType: DeviceSecurityType.None,
  lockAfterBackgrounded: VAULT_DEFAULT_TIME_OUT_IN_MILLIS,
  shouldClearVaultAfterTooManyFailedAttempts: true,
  customPasscodeInvalidUnlockAttempts: 5,
};

export class VaultFactory {
  static newVaultInstance(config: IdentityVaultConfig = vaultConfig): Vault | BrowserVault {
    return Capacitor.getPlatform() === 'web' ? new BrowserVault(config) : new Vault(config);
  }

  static newVaultPinAuthenticatorInstance(modalController: ModalController): PinAuthenticator {
    return new PinAuthenticator(modalController);
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
      shouldClearVaultAfterTooManyFailedAttempts: false,
    };
    return new VaultMigrator(oldVaultConfig, () => onPasscodeRequested(false));
  }

  static newVaultMigrationInstance(vaultService: VaultIdentityService): VaultMigration {
    return new VaultMigration(vaultService);
  }
}

class VaultMigration {
  private pinAuthenticator: PinAuthenticator;

  constructor(private readonly vaultService: VaultIdentityService) {
    this.pinAuthenticator = VaultFactory.newVaultPinAuthenticatorInstance(vaultService.modalController);
  }

  private initMigrator(onPasscodeRequestedCb: () => Promise<string>): VaultMigrator {
    return VaultFactory.newVaultMigratorInstance(onPasscodeRequestedCb);
  }

  private noDataInLegacyVault({ code, message }) {
    return !code && /no data in legacy vault/.test(message);
  }

  private async userFailedBiometricsAuth(error) {
    const isDenied = await this.vaultService.isBiometricPermissionDenied(error);
    return (
      (error.code != VaultErrorCodes.AuthFailed && isDenied) ||
      error.code === VaultErrorCodes.TooManyFailedAttempts ||
      error.code === VaultErrorCodes.iOSBiometricsLockedOut ||
      error.code === VaultErrorCodes.AndroidBiometricsLockedOut ||
      error.code === VaultErrorCodes.BiometricsNotEnabled
    );
  }

  async doVaultMigration(): Promise<{ pin?: string; migrationResult: VaultMigrateResult; biometricUsed: boolean }> {
    if (await this.vaultService.userPreferenceService.cachedBiometricsEnabledUserPreference()) {
      return this.migrateBiometricLogin();
    } else {
      return this.migratePinLogin();
    }
  }

  private async migrateBiometricLogin(): Promise<{
    pin?: string;
    migrationResult: VaultMigrateResult;
    biometricUsed: boolean;
  }> {
    const migrator = this.initMigrator(() =>
      this.handleAuthFailureOnVaultMigration().then(({ pin }) => pin || 'Failed')
    );
    let migrationResponse = { migrationResult: VaultMigrateResult.MIGRATION_FAILED };
    try {
      const { session } = await migrator.exportVault();
      migrationResponse = this.onMigrateSuccess(session.pin);
    } catch (error) {
      if (this.noDataInLegacyVault(error)) {
        migrationResponse.migrationResult = VaultMigrateResult.MIGRATION_NOT_NEEDED;
      }
      if (await this.userFailedBiometricsAuth(error)) {
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
  private async migratePinLogin(): Promise<{
    pin?: string;
    migrationResult: VaultMigrateResult;
    biometricUsed: boolean;
  }> {
    let migrationResponse = { migrationResult: VaultMigrateResult.MIGRATION_FAILED };
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

  private async handleAuthFailureOnVaultMigration(): Promise<{ pin?: string; migrationResult: VaultMigrateResult }> {
    const { pin, status } = await this.pinAuthenticator.tryUnlock0();
    if (PinCloseStatus.LOGIN_SUCCESS != status) {
      return { migrationResult: VaultMigrateResult.MIGRATION_FAILED };
    } else {
      return this.onMigrateSuccess(pin);
    }
  }
}
