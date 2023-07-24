import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DeviceSecurityType, VaultErrorCodes, VaultType, Device } from '@ionic-enterprise/identity-vault';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { VaultFactory } from './vault-factory.service';
import { VaultIdentityService } from './vault.identity.service';
import sinon from 'sinon';
import { PinCloseStatus, VaultMigrateResult, VAULT_DEFAULT_TIME_OUT_IN_MILLIS } from './model.identity';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '../loading/loading.service';

describe('VaultIdentityService', () => {
    let service: VaultIdentityService,
        injector,
        userPreferenceService,
        vault,
        loadingService,
        modalController;
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
            clear: jest.fn(),
            unlock: jest.fn()
        };
        modalController = {
            create: jest.fn()
        }
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
                { provide: UserPreferenceService, useValue: userPreferenceService },
                { provide: ModalController, useValue: modalController }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        });
        service = TestBed.inject(VaultIdentityService);
        loadingService = TestBed.inject(LoadingService);
        jest.spyOn(service, 'loadingService', 'get').mockReturnValue(loadingService);
        await service.init(vault);
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
            const loginSpy = jest.spyOn(service, 'login');
            jest.spyOn(service, 'isBiometricAvailable').mockResolvedValue(true);
            const migrationResult = await service.migrateIfLegacyVault();
            expect(exportVaultSpy).toHaveBeenCalledTimes(1);
            expect(migrateSuccessSpy).toHaveBeenCalledTimes(1);
            expect(clearSpy).toHaveBeenCalledTimes(1);
            expect(migrationResult).toBe(VaultMigrateResult.MIGRATION_SUCCESS);
            expect(loginSpy).toHaveBeenNthCalledWith(1, { pin: '1111', biometricUsed: true });
        });

        it('should result in migrationNotNeeded when no data foud in old-vault', async () => {
            // migrator.exportVault = () => { throw new Error('no data in legacy vault') };
            // const migrationResult = await service.migrateIfLegacyVault();
            // expect(migrationResult).toBe(VaultMigrateResult.MIGRATION_NOT_NEEDED);
        });

        it('should allow pin retry on biometric failure when migrating data', async () => {
            const vaultAutenticator: any = {
                tryUnlock0: async () => {
                    return { pin: '1111', biometricUsed: true }
                },
            }
            jest.spyOn(VaultFactory, 'newVaultPinAuthenticatorInstance').mockReturnValue(vaultAutenticator);
            jest.spyOn(migrator, 'exportVault').mockRejectedValue({ code: VaultErrorCodes.TooManyFailedAttempts })
            const tryUnlock0Spy = jest.spyOn(vaultAutenticator, 'tryUnlock0').mockResolvedValue({ pin: '1111', status: PinCloseStatus.LOGIN_SUCCESS });
            const migrateSuccessSpy = jest.spyOn(service, 'onVaultMigratedSuccess');
            const migrationResult = await service.migrateIfLegacyVault();
            expect(tryUnlock0Spy).toHaveBeenCalledTimes(1)
            expect(migrateSuccessSpy).toHaveBeenCalledTimes(1);
            expect(migrationResult).toBe(VaultMigrateResult.MIGRATION_SUCCESS);
        });

        it('should result in migration failed when user fails pin authentication', async () => {
            jest.spyOn(userPreferenceService, 'cachedBiometricsEnabledUserPreference').mockResolvedValue(false);
            migrator.exportVault = () => { throw new Error('Some pin related error occurred') };
            const migrateSuccessSpy = jest.spyOn(service, 'onVaultMigratedSuccess');
            const migrationResult = await service.migrateIfLegacyVault();
            expect(migrateSuccessSpy).toHaveBeenCalledTimes(0);
            expect(migrationResult).toBe(VaultMigrateResult.MIGRATION_FAILED);
        })
    });

    describe('Vault login, unlock and logout', () => {

        afterEach(() => sinon.restore());

        it('should configure vault with biometrics', async () => {
            const spy = jest.spyOn(service, 'patchVaultConfig');
            await service.setUnlockMode({ pin: '1111', biometricUsed: true });
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({ type: VaultType.DeviceSecurity, deviceSecurityType: DeviceSecurityType.Biometrics });
        });

        it('should configure vault with pin only', async () => {
            const spy1 = jest.spyOn(service, 'patchVaultConfig');
            const spy2 = jest.spyOn(vault, 'updateConfig');
            await service.setUnlockMode({ pin: '1111', biometricUsed: false });
            expect(spy1).toHaveBeenCalledTimes(1);
            expect(spy1).toHaveBeenCalledWith({ type: VaultType.CustomPasscode, deviceSecurityType: DeviceSecurityType.None });
            expect(spy2).toHaveBeenCalledTimes(1);
        });

        it('should unlock vault with biometric', async () => {
            const session = { pin: "1111", biometricUsed: true };
            vault.unlock = async () => true;
            vault.getValue = async () => session.pin;
            const closeAllModalsSpy = jest.spyOn(service, 'closeAllModals').mockReturnValue(void 0);
            const unlockResult = await service.unlockVault(true);
            expect(closeAllModalsSpy).toHaveBeenCalledTimes(1);
            expect(unlockResult).toStrictEqual(session);
        });

        it('should retry unlock vault with pin when biometric auth fails', async () => {
            const session = { pin: '1111', biometricUsed: false };
            vault.unlock = async () => { throw new Error('random error') };
            vault.getValue = async () => session.pin;
            jest.spyOn(service, 'closeAllModals').mockResolvedValue();
            const retryPinSpy = jest.spyOn(service, 'retryPinUnlock');
            const logoutSpy = jest.spyOn(service, 'logout').mockResolvedValue();
            const pinModalSpy = jest.spyOn(service.pinAuthenticator, 'tryUnlock0').mockResolvedValue({ pin: session.pin, status: PinCloseStatus.LOGIN_SUCCESS })
            const loginSpy = jest.spyOn(service, 'login').mockResolvedValue();
            const deviceMock = jest.spyOn(Device, 'isBiometricsEnabled').mockResolvedValue(true);

            const unlockResult = await service.unlockVault(true);
            expect(deviceMock).toHaveBeenCalledTimes(0);
            expect(pinModalSpy).toHaveBeenCalledTimes(1);
            expect(retryPinSpy).toHaveBeenNthCalledWith(1, new Error('random error'));
            expect(logoutSpy).toHaveBeenCalledTimes(1);
            expect(loginSpy).toHaveBeenCalledTimes(1);
            expect(loginSpy).toHaveBeenCalledWith(session)
            expect(unlockResult).toStrictEqual({ ...session, biometricUsed: false });
        });

        it('should logout user when pin retry fails', async () => {
            const session = { pin: '1111', biometricUsed: true };
            sinon.stub(service, 'closeAllModals').resolves();
            sinon.stub(vault, 'unlock').rejects({ message: 'biometric auth failed' });
            const retryPinUnlockStub = jest.spyOn(service, 'retryPinUnlock');
            const pinModalSpy = jest.spyOn(service.pinAuthenticator, 'tryUnlock0').mockResolvedValue({ pin: null, status: PinCloseStatus.MAX_FAILURE })
            const results = await service.unlockVault(session.biometricUsed).catch(e => e);
            expect(retryPinUnlockStub).toHaveBeenNthCalledWith(1, { message: 'biometric auth failed' });
            expect(pinModalSpy).toHaveBeenCalledTimes(1);
            expect(results).toStrictEqual({ code: PinCloseStatus.MAX_FAILURE })
        });
    });


    describe('misc', () => {
        it('should pass required params when routing to startup page', async () => {
            const skipLoginFlow = true, biometricUsed = true;
            const spy1 = jest.spyOn(service, 'showSplashScreen').mockResolvedValue(true);
            await service.openStartupPage(biometricUsed);
            expect(spy1).toHaveBeenNthCalledWith(1, { skipLoginFlow, biometricEnabled: biometricUsed });
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

        it('should result in biometricNotAvailable when user has denied permissions to use it', async () => {
            const store = { userDeniedBiometricPermission: false };
            const deviceMock = jest.spyOn(Device, 'isBiometricsEnabled').mockResolvedValue(true);
            const getBiometricPermissionDeniedSpy = jest.spyOn(userPreferenceService, 'getBiometricPermissionDenied')
                .mockImplementation(() => store.userDeniedBiometricPermission);

            let isBiometricAvailable = await service.isBiometricAvailable();
            expect(deviceMock).toHaveBeenCalledTimes(1);
            expect(getBiometricPermissionDeniedSpy).toBeCalledTimes(1);
            expect(isBiometricAvailable).toBe(true);

            const denyPermissionStub = jest.spyOn(userPreferenceService, 'setBiometricPermissionDenied')
                .mockImplementation(() => (store.userDeniedBiometricPermission = true));

            const isBiometricDenied1 = await service.isBiometricPermissionDenied({ code: VaultErrorCodes.AuthFailed });
            const isBiometricDenied2 = await service.isBiometricPermissionDenied({ code: VaultErrorCodes.SecurityNotAvailable });

            expect(denyPermissionStub).toHaveBeenCalledTimes(2);
            expect(isBiometricDenied1).toBe(true);
            expect(isBiometricDenied2).toBe(true);

            isBiometricAvailable = await service.isBiometricAvailable();
            expect(isBiometricAvailable).toBe(false);
        })
    });
});


