import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { VaultErrorCodes } from '@ionic-enterprise/identity-vault';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { VaultFactory, VAULT_DEFAULT_TIME_OUT_IN_MILLIS } from './vault-factory.service';
import { VaultIdentityService, VaultMigrateResult } from './vault.identity.service';


describe('VaultIdentityService', () => {
    let service: VaultIdentityService,
        injector,
        userPreferenceService,
        vault;
    beforeEach(async () => {
        vault = {
            onError: jest.fn(),
            onPasscodeRequested: jest.fn(),
            setCustomPasscode: jest.fn(),
            importVault: jest.fn(),
            onLock: jest.fn(),
            setValue: jest.fn(),
            getValue: jest.fn(),
            updateConfig: jest.fn(),
            onUnlock: jest.fn(),
            clear: jest.fn()
        };
        injector = {
            get: jest.fn()
        };
        userPreferenceService = {
            cachedBiometricsEnabledUserPreference: jest.fn(async () => true),
            setBiometricPermissionDenied: jest.fn(),
            getBiometricPermissionDenied: jest.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: Injector, useValue: injector },
                { provide: UserPreferenceService, useValue: userPreferenceService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        });
        service = TestBed.inject(VaultIdentityService);
        await service.init(<any>vault);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });


    describe('Vault data migration', () => {
        let migrator;
        beforeEach(async () => {
            migrator = {
                exportVault: () => ({ session: { pin: '1111' } }),
                clear: jest.fn()
            };
            jest.spyOn(VaultFactory, 'newVaultMigratorInstance').mockReturnValue(migrator);
        });


        it('should be successful when user authenticates and there is data in old vault', async () => {
            const exportVaultSpy = jest.spyOn(migrator, 'exportVault');
            const migrateSuccessSpy = jest.spyOn(service, 'onVaultMigratedSuccess');
            const clearSpy = jest.spyOn(migrator, 'clear');
            const migrationResult = await service.migrateIfLegacyVault();
            expect(exportVaultSpy).toHaveBeenCalledTimes(1);
            expect(migrateSuccessSpy).toHaveBeenCalledTimes(1);
            expect(clearSpy).toHaveBeenCalledTimes(1);
            expect(migrationResult).toBe(VaultMigrateResult.MIGRATION_SUCCESS);
        });

        it('should result in migrationNotNeeded when no data foud in old-vault', async () => {
            migrator.exportVault = () => { throw new Error('no data in legacy vault') };
            const migrationResult = await service.migrateIfLegacyVault();
            expect(migrationResult).toBe(VaultMigrateResult.MIGRATION_NOT_NEEDED);
        });

        it('should allow pin retry on biometric failure when migrating data', async () => {
            migrator.exportVault = () => {
                throw {
                    code: VaultErrorCodes.TooManyFailedAttempts
                }
            };

            const retryPinSpy = jest.spyOn(service, 'retryPinUnlock').mockResolvedValue({ pin: '1111', biometricEnabled: true })
            const migrateSuccessSpy = jest.spyOn(service, 'onVaultMigratedSuccess');
            const migrationResult = await service.migrateIfLegacyVault();
            expect(retryPinSpy).toHaveBeenCalledTimes(1);
            expect(migrateSuccessSpy).toHaveBeenCalledTimes(1);
            expect(migrationResult).toBe(VaultMigrateResult.MIGRATION_SUCCESS);
        });

        it('should result in migration failed when user fails pin authentication', async () => {
            jest.spyOn(userPreferenceService, 'cachedBiometricsEnabledUserPreference').mockResolvedValue(false);
            migrator.exportVault = () => { throw new Error('Some pin related error occurred') };
            const migrateSuccessSpy = jest.spyOn(service, 'onVaultMigratedSuccess');
            const retryPinSpy = jest.spyOn(service, 'retryPinUnlock');
            const migrationResult = await service.migrateIfLegacyVault();
            expect(migrateSuccessSpy).toHaveBeenCalledTimes(0);
            expect(retryPinSpy).toHaveBeenCalledTimes(0);
            expect(migrationResult).toBe(VaultMigrateResult.MIGRATION_FAILED);
        })
    });

    describe('Vault login, unlock and logout', () => {

        it('should configure vault with biometrics', async () => {
            const spy = jest.spyOn(service, 'patchVaultConfig');
            await service.setUnlockMode({ pin: '1111', biometricEnabled: true });
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({ type: "DeviceSecurity", deviceSecurityType: "Biometrics" });
        });

        it('should configure vault with pin only', async () => {
            const spy1 = jest.spyOn(service, 'patchVaultConfig');
            const spy2 = jest.spyOn(vault, 'updateConfig');
            await service.setUnlockMode({ pin: '1111', biometricEnabled: false });
            expect(spy1).toHaveBeenCalledTimes(1);
            expect(spy1).toHaveBeenCalledWith({ type: "CustomPasscode", deviceSecurityType: "None" });
            expect(spy2).toHaveBeenCalledTimes(1);
        });

        it('should unlock vault with biometric', async () => {
            let unOnlockCallback;
            const session = { pin: "1111", biometricEnabled: true };
            vault.onUnlock = (callback) => (unOnlockCallback = callback)
            vault.unlock = async () => unOnlockCallback();
            vault.getValue = async () => session.pin;
            const closeAllModalsSpy = jest.spyOn(service, 'closeAllModals').mockResolvedValue();
            const unlockResult = await service.unlockVault(true);
            expect(closeAllModalsSpy).toHaveBeenCalledTimes(1);
            expect(unlockResult).toStrictEqual(session);
        });

        it('should retry unlock vault with pin when biometric fails', async () => {
            const session = { pin: '1111', biometricEnabled: true };
            let onUnlockCallback;
            vault.onUnlock = (cb) => (onUnlockCallback = cb)
            vault.unlock = async () => { throw new Error('random error') };
            vault.getValue = async () => session.pin;
            jest.spyOn(service, 'closeAllModals').mockResolvedValue();
            const retryPinSpy = jest.spyOn(service, 'retryPinUnlock').mockResolvedValue(session);
            const loginSpy = jest.spyOn(service, 'login').mockImplementation(async () => onUnlockCallback());
            const logoutSpy = jest.spyOn(service, 'logout').mockResolvedValue();

            const unlockResult = await service.unlockVault(true);

            expect(retryPinSpy).toHaveBeenCalledTimes(1);
            expect(logoutSpy).toHaveBeenCalledTimes(1);
            expect(loginSpy).toHaveBeenCalledTimes(1);
            expect(loginSpy).toHaveBeenCalledWith(session)
            expect(unlockResult).toStrictEqual(session);
        });
    });


    describe('misc', () => {
        it('should pass required params when routing to startup page', async () => {
            const skipLoginFlow = true, biometricEnabled = true;
            const spy1 = jest.spyOn(service, 'showSplashScreen').mockResolvedValue(true);
            await service.openStartupPage(biometricEnabled, skipLoginFlow);
            expect(spy1).toBeCalledTimes(1);
            expect(spy1).toBeCalledWith({ skipLoginFlow, biometricEnabled });
        });

        it('should only set new timeout if vault if currently not locked: Option V1', async () => {
            const isVaultLockedSpy = jest.spyOn(service, 'isVaultLocked').mockResolvedValue(true);
            const patchVaultConfigSpy = jest.spyOn(service, 'patchVaultConfig').mockResolvedValue();
            const result = await service.setNewVaultTimeoutValue();
            expect(isVaultLockedSpy).toHaveBeenCalledTimes(1);
            expect(patchVaultConfigSpy).not.toHaveBeenCalled();
            expect(result).toBe(false);
        });

        it('should only set new timeout if vault if currently not locked: Option V2', async () => {
            jest.spyOn(service, 'isVaultLocked').mockResolvedValue(false);
            const patchVaultConfigSpy = jest.spyOn(service, 'patchVaultConfig').mockResolvedValue();
            const result = await service.setNewVaultTimeoutValue();
            expect(patchVaultConfigSpy).toHaveBeenCalledTimes(1);
            expect(patchVaultConfigSpy).toHaveBeenCalledWith({ lockAfterBackgrounded: VAULT_DEFAULT_TIME_OUT_IN_MILLIS });
            expect(result).toBe(true);
        });
    });
});


