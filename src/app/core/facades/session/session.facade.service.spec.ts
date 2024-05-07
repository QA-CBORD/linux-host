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
import { of } from 'rxjs';

describe('SessionFacadeService', () => {
  let service: SessionFacadeService;

  const appStatesFacadeServiceStub = {
    getStateChangeEvent$: of(({ isActive: true })),
    getAppUrlOpenEvent$: of({})
  };

  const connectivityAwareFacadeServiceStub = {
    isModalOpened: jest.fn(() => false),
  };

  const platformStub = {
    ready: jest.fn().mockResolvedValue({}),
    resume: of({}),
    pause: of({}),
    is: jest.fn().mockReturnValue(true)
  };

  const nativeProviderStub = {
    dismissTopControllers: jest.fn(),
    getKeepTopModal: {}
  };
  const nativeStartupFacadeServiceStub = {
    blockNavigationStartup: {}
  };

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
        { provide: Platform, useValue: platformStub },
        { provide: NativeProvider, useValue: nativeProviderStub },
        {
          provide: NativeStartupFacadeService,
          useValue: nativeStartupFacadeServiceStub
        },
        {
          provide: ConnectivityAwareFacadeService,
          useValue: connectivityAwareFacadeServiceStub
        },
        {
          provide: AppStatesFacadeService,
          useValue: appStatesFacadeServiceStub
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
    it('checks app state is ready', () => {
      jest.spyOn(platformStub, 'ready');
      jest.spyOn(
        connectivityAwareFacadeServiceStub,
        'isModalOpened'
      );
      service.addAppStateListeners();
      expect(platformStub.ready).toHaveBeenCalled();
    });

    it('should not close all hanging controllers when app state is foreground', () => {
      const spy = jest.spyOn(service as any, 'closeTopControllers');
      service.addAppStateListeners();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should close all hanging controllers when app state is background', () => {
      appStatesFacadeServiceStub.getStateChangeEvent$ = of(({ isActive: false }));
      const spy = jest.spyOn(service as any, 'closeTopControllers');
      service.addAppStateListeners();
      expect(spy).toHaveBeenCalled();
    });

    it('should NOT close controllers on web version', () => {
      appStatesFacadeServiceStub.getStateChangeEvent$ = of(({ isActive: false }));
      platformStub.is = jest.fn().mockReturnValue(false);
      const spy = jest.spyOn(nativeProviderStub as any, 'dismissTopControllers');
      service.addAppStateListeners();
      expect(spy).not.toHaveBeenCalled();
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
