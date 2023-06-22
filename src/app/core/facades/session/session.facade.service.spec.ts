import { TestBed } from '@angular/core/testing';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Platform } from '@ionic/angular';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { NativeStartupFacadeService } from '../native-startup/native-startup.facade.service';
import { ConnectivityAwareFacadeService } from 'src/app/non-authorized/pages/startup/connectivity-aware-facade.service';
import { AppStatesFacadeService } from '../appEvents/app-events.facade.service';
import { SessionFacadeService } from './session.facade.service';

describe('SessionFacadeService', () => {
  let service: SessionFacadeService;

  beforeEach(() => {
    const userFacadeServiceStub = () => ({
      handlePushNotificationRegistration: () => ({})
    });
    const identityFacadeServiceStub = () => ({
      isPinEnabled: (sessionId, institutionId) => ({}),
      cachedPinEnabledUserPreference$: {},
      isBiometricAvailable: () => ({}),
      cachedBiometricsEnabledUserPreference$: {},
      isExternalLogin: institutionInfo => ({}),
      isVaultLocked: () => ({}),
      hasStoredSession: () => ({}),
      logoutUser: () => ({}),
      lockVault: () => ({})
    });
    const institutionFacadeServiceStub = () => ({ cachedInstitutionInfo$: {} });
    const platformStub = () => ({
      ready: () => ({ then: () => ({}) }),
      resume: { subscribe: f => f({}) },
      pause: { subscribe: f => f({}) },
      is: string => ({})
    });
    const nativeProviderStub = () => ({
      dismissTopControllers: (arg, getKeepTopModal) => ({}),
      getKeepTopModal: {}
    });
    const nativeStartupFacadeServiceStub = () => ({
      blockNavigationStartup: {}
    });
    const connectivityAwareFacadeServiceStub = () => ({
      isModalOpened: () => ({}),
      execute: (object, arg) => ({})
    });
    const appStatesFacadeServiceStub = () => ({
      getStateChangeEvent$: { subscribe: f => f({}) },
      getAppUrlOpenEvent$: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      providers: [
        SessionFacadeService,
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: IdentityFacadeService,
          useFactory: identityFacadeServiceStub
        },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: Platform, useFactory: platformStub },
        { provide: NativeProvider, useFactory: nativeProviderStub },
        {
          provide: NativeStartupFacadeService,
          useFactory: nativeStartupFacadeServiceStub
        },
        {
          provide: ConnectivityAwareFacadeService,
          useFactory: connectivityAwareFacadeServiceStub
        },
        {
          provide: AppStatesFacadeService,
          useFactory: appStatesFacadeServiceStub
        }
      ]
    });
   jest.spyOn(SessionFacadeService.prototype, 'addAppStateListeners');
    service = TestBed.inject(SessionFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(
        SessionFacadeService.prototype.addAppStateListeners
      ).toHaveBeenCalled();
    });
  });

  describe('addAppStateListeners', () => {
    it('makes expected calls', () => {
      const platformStub: Platform = TestBed.inject(Platform);
      const connectivityAwareFacadeServiceStub: ConnectivityAwareFacadeService = TestBed.inject(
        ConnectivityAwareFacadeService
      );
     jest.spyOn(platformStub, 'ready');
     jest.spyOn(
        connectivityAwareFacadeServiceStub,
        'isModalOpened'
      );
      (<jasmine.Spy>service.addAppStateListeners);
      service.addAppStateListeners();
      expect(platformStub.ready).toHaveBeenCalled();
      expect(
        connectivityAwareFacadeServiceStub.isModalOpened
      ).toHaveBeenCalled();
    });
  });

  describe('isVaultLocked', () => {
    it('makes expected calls', () => {
      const identityFacadeServiceStub: IdentityFacadeService = TestBed.inject(
        IdentityFacadeService
      );
     jest.spyOn(identityFacadeServiceStub, 'isVaultLocked');
      service.isVaultLocked();
      expect(identityFacadeServiceStub.isVaultLocked).toHaveBeenCalled();
    });
  });

  describe('handlePushNotificationRegistration', () => {
    it('makes expected calls', () => {
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
     jest.spyOn(
        userFacadeServiceStub,
        'handlePushNotificationRegistration'
      );
      service.handlePushNotificationRegistration();
      expect(
        userFacadeServiceStub.handlePushNotificationRegistration
      ).toHaveBeenCalled();
    });
  });

  describe('getIsWeb', () => {
    it('makes expected calls', () => {
      const platformStub: Platform = TestBed.inject(Platform);
     jest.spyOn(platformStub, 'is');
      service.getIsWeb();
      expect(platformStub.is).toHaveBeenCalled();
    });
  });

  describe('lockVault', () => {
    it('makes expected calls', () => {
      const identityFacadeServiceStub: IdentityFacadeService = TestBed.inject(
        IdentityFacadeService
      );
     jest.spyOn(identityFacadeServiceStub, 'lockVault');
      service.lockVault();
      expect(identityFacadeServiceStub.lockVault).toHaveBeenCalled();
    });
  });
});
