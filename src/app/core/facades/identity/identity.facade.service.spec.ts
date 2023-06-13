import { TestBed } from '@angular/core/testing';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Institution } from '@core/model/institution';
import { UserFacadeService } from '../user/user.facade.service';
import { MerchantFacadeService } from '../merchant/merchant-facade.service';
import { ContentStringsFacadeService } from '../content-strings/content-strings.facade.service';
import { NavigationService } from '@shared/services/navigation.service';
import { VaultIdentityService } from '@core/service/identity/vault.identity.service';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { ConnectivityAwareFacadeService } from 'src/app/non-authorized/pages/startup/connectivity-aware-facade.service';
import { VaultTimeoutOptions } from '@core/service/identity/model.identity';
import { PinLoginProps } from '@core/model/authentication/pin-login-props.model';
import { IdentityFacadeService } from './identity.facade.service';

describe('IdentityFacadeService', () => {
  let service: IdentityFacadeService;

  beforeEach(() => {
    const settingsFacadeServiceStub = () => ({
      getSetting: (pIN_ENABLED, sessionId, institutionId) => ({
        pipe: () => ({})
      }),
      cleanCache: () => ({})
    });
    const userFacadeServiceStub = () => ({
      logoutAndRemoveUserNotification: () => ({})
    });
    const merchantFacadeServiceStub = () => ({ clearState: () => ({}) });
    const contentStringsFacadeServiceStub = () => ({ clearState: () => ({}) });
    const navigationServiceStub = () => ({
      navigate: (array, object) => ({}),
      navigateAnonymous: (entry, object) => ({})
    });
    const vaultIdentityServiceStub = () => ({
      presentPinModal: (arg, pinModalProps) => ({}),
      login: session => ({}),
      migrateIfLegacyVault: () => ({}),
      updateVaultTimeout: options => ({}),
      unlockVault: biometricEnabled => ({}),
      unlockVaultIfLocked: () => ({}),
      logout: () => ({}),
      isVaultLocked: () => ({}),
      isBiometricAvailable: () => ({}),
      getAvailableBiometricHardware: () => ({}),
      setBiometricsEnabled: isBiometricsEnabled => ({}),
      hasStoredSession: () => ({}),
      lockVault: () => ({})
    });
    const userPreferenceServiceStub = () => ({});
    const connectivityAwareFacadeServiceStub = () => ({
      execute: (object, arg) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        IdentityFacadeService,
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: MerchantFacadeService,
          useFactory: merchantFacadeServiceStub
        },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        },
        { provide: NavigationService, useFactory: navigationServiceStub },
        { provide: VaultIdentityService, useFactory: vaultIdentityServiceStub },
        {
          provide: UserPreferenceService,
          useFactory: userPreferenceServiceStub
        },
        {
          provide: ConnectivityAwareFacadeService,
          useFactory: connectivityAwareFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(IdentityFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('updateVaultTimeout', () => {
    it('makes expected calls', () => {
      const vaultIdentityServiceStub: VaultIdentityService = TestBed.inject(
        VaultIdentityService
      );
      const vaultTimeoutOptionsStub: VaultTimeoutOptions = <any>{};
      spyOn(vaultIdentityServiceStub, 'updateVaultTimeout').and.callThrough();
      service.updateVaultTimeout(vaultTimeoutOptionsStub);
      expect(vaultIdentityServiceStub.updateVaultTimeout).toHaveBeenCalled();
    });
  });

  describe('migrateIfLegacyVault', () => {
    it('makes expected calls', () => {
      const vaultIdentityServiceStub: VaultIdentityService = TestBed.inject(
        VaultIdentityService
      );
      spyOn(vaultIdentityServiceStub, 'migrateIfLegacyVault').and.callThrough();
      service.migrateIfLegacyVault();
      expect(vaultIdentityServiceStub.migrateIfLegacyVault).toHaveBeenCalled();
    });
  });

  describe('unlockVaultIfLocked', () => {
    it('makes expected calls', () => {
      const vaultIdentityServiceStub: VaultIdentityService = TestBed.inject(
        VaultIdentityService
      );
      spyOn(vaultIdentityServiceStub, 'unlockVaultIfLocked').and.callThrough();
      service.unlockVaultIfLocked();
      expect(vaultIdentityServiceStub.unlockVaultIfLocked).toHaveBeenCalled();
    });
  });

  describe('navigateToDashboard', () => {
    it('makes expected calls', () => {
      const navigationServiceStub: NavigationService = TestBed.inject(
        NavigationService
      );
      const connectivityAwareFacadeServiceStub: ConnectivityAwareFacadeService = TestBed.inject(
        ConnectivityAwareFacadeService
      );
      spyOn(navigationServiceStub, 'navigate').and.callThrough();
      spyOn(connectivityAwareFacadeServiceStub, 'execute').and.callThrough();
      service.navigateToDashboard();
      expect(navigationServiceStub.navigate).toHaveBeenCalled();
      expect(connectivityAwareFacadeServiceStub.execute).toHaveBeenCalled();
    });
  });

  describe('clearAll', () => {
    it('makes expected calls', () => {
      const vaultIdentityServiceStub: VaultIdentityService = TestBed.inject(
        VaultIdentityService
      );
      spyOn(vaultIdentityServiceStub, 'logout').and.callThrough();
      service.clearAll();
      expect(vaultIdentityServiceStub.logout).toHaveBeenCalled();
    });
  });

  describe('isVaultLocked', () => {
    it('makes expected calls', () => {
      const vaultIdentityServiceStub: VaultIdentityService = TestBed.inject(
        VaultIdentityService
      );
      spyOn(vaultIdentityServiceStub, 'isVaultLocked').and.callThrough();
      service.isVaultLocked();
      expect(vaultIdentityServiceStub.isVaultLocked).toHaveBeenCalled();
    });
  });

  describe('isBiometricAvailable', () => {
    it('makes expected calls', () => {
      const vaultIdentityServiceStub: VaultIdentityService = TestBed.inject(
        VaultIdentityService
      );
      spyOn(vaultIdentityServiceStub, 'isBiometricAvailable').and.callThrough();
      service.isBiometricAvailable();
      expect(vaultIdentityServiceStub.isBiometricAvailable).toHaveBeenCalled();
    });
  });

  describe('getAvailableBiometricHardware', () => {
    it('makes expected calls', () => {
      const vaultIdentityServiceStub: VaultIdentityService = TestBed.inject(
        VaultIdentityService
      );
      spyOn(
        vaultIdentityServiceStub,
        'getAvailableBiometricHardware'
      ).and.callThrough();
      service.getAvailableBiometricHardware();
      expect(
        vaultIdentityServiceStub.getAvailableBiometricHardware
      ).toHaveBeenCalled();
    });
  });

  describe('hasStoredSession', () => {
    it('makes expected calls', () => {
      const vaultIdentityServiceStub: VaultIdentityService = TestBed.inject(
        VaultIdentityService
      );
      spyOn(vaultIdentityServiceStub, 'hasStoredSession').and.callThrough();
      service.hasStoredSession();
      expect(vaultIdentityServiceStub.hasStoredSession).toHaveBeenCalled();
    });
  });

  describe('lockVault', () => {
    it('makes expected calls', () => {
      const vaultIdentityServiceStub: VaultIdentityService = TestBed.inject(
        VaultIdentityService
      );
      spyOn(vaultIdentityServiceStub, 'lockVault').and.callThrough();
      service.lockVault();
      expect(vaultIdentityServiceStub.lockVault).toHaveBeenCalled();
    });
  });
});
