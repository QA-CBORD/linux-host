import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { VaultMigrateResult } from '@core/service/identity/model.identity';
import { LoadingService } from '@core/service/loading/loading.service';
import { NavigationService } from '@shared/services/navigation.service';
import { ExecStatus } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { ConnectivityAwareFacadeService } from './connectivity-aware-facade.service';
import { StartupPage } from './startup.page';

describe('Application Startup Flow', () => {
  let component: StartupPage;
  let fixture: ComponentFixture<StartupPage>;
  let elementRef,
    environmentFacadeService,
    location,
    loadingService,
    sessionFacadeService,
    identityFacadeService,
    authFacadeService,
    navigationService,
    connectivityFacade;
  beforeEach(async () => {

    elementRef = {};
    environmentFacadeService = {
      initialization: jest.fn()
    };
    location = {
      getState: jest.fn()
    };
    loadingService = {
      showSpinner: jest.fn(),
      closeSpinner: jest.fn()
    };
    sessionFacadeService = {
      determineAppLoginState: jest.fn()
    };
    identityFacadeService = {
      migrateIfLegacyVault: jest.fn(),
      clearAll: jest.fn(),
      isVaultLocked: jest.fn(),
      unlockVault: jest.fn()
    };
    authFacadeService = {
      getAuthSessionToken$: jest.fn()
    };
    navigationService = {
      navigateAnonymous: jest.fn()
    };
    connectivityFacade = {
      execute: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [StartupPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ElementRef, useValue: elementRef },
        { provide: EnvironmentFacadeService, useValue: environmentFacadeService },
        { provide: Location, useValue: location },
        { provide: LoadingService, useValue: loadingService },
        { provide: SessionFacadeService, useValue: sessionFacadeService },
        { provide: IdentityFacadeService, useValue: identityFacadeService },
        { provide: AuthFacadeService, useValue: authFacadeService },
        { provide: NavigationService, useValue: navigationService },
        { provide: ConnectivityAwareFacadeService, useValue: connectivityFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });


  describe('StartupPage.ionViewDidEnter', () => {

    it('should call "unlockVault" when skipLoginFlow is true', async () => {
      jest.spyOn(location, 'getState').mockReturnValue({ skipLoginFlow: true, biometricEnabled: false });
      const spy1 = jest.spyOn(component, 'unlockVault').mockResolvedValue(true);
      const spy2 = jest.spyOn(component, 'checkLoginFlow').mockResolvedValue(true);

      component.ionViewDidEnter();
      expect(spy1).toBeCalled();
      expect(spy2).not.toBeCalled();
    });

    it('should call "checkLoginFlow" when skipLoginFlow is false', async () => {
      jest.spyOn(location, 'getState').mockReturnValue({ skipLoginFlow: false, biometricEnabled: false });
      const spy1 = jest.spyOn(component, 'unlockVault').mockResolvedValue(true);
      const spy2 = jest.spyOn(component, 'checkLoginFlow').mockResolvedValue(true);
      component.ionViewDidEnter();
      expect(spy1).not.toBeCalled();
      expect(spy2).toBeCalled();
    });

  });

  describe('StartupPage.checkLoginFlow', () => {
    let initEnvSpy, execSpy, clearAllSpy;
    const results = { data: "1122334455", execStatus: ExecStatus.Execution_success };
    beforeEach(() => {
      jest.spyOn(navigationService, 'navigateAnonymous').mockResolvedValue(true);
      initEnvSpy = jest.spyOn(environmentFacadeService, 'initialization').mockResolvedValue(true);
      execSpy = jest.spyOn(connectivityFacade, 'execute').mockReturnValue(results);
      clearAllSpy = jest.spyOn(identityFacadeService, 'clearAll').mockResolvedValue(true);
    });

    it('should logout user when authencation fails during vault migration', async () => {
      jest.spyOn(component, 'unlockVaultIfSetup').mockResolvedValue({ pin: null });
      const migrateVaultSpy = jest.spyOn(identityFacadeService, 'migrateIfLegacyVault').mockReturnValue(VaultMigrateResult.MIGRATION_FAILED);
      const logoutSpy = jest.spyOn(navigationService, 'navigateAnonymous').mockResolvedValue(true);
      await component.checkLoginFlow();
      expect(clearAllSpy).toHaveBeenCalled();
      expect(execSpy).toHaveBeenCalled();
      expect(initEnvSpy).toHaveBeenCalledTimes(1);
      expect(migrateVaultSpy).toHaveBeenCalledTimes(1);
      expect(migrateVaultSpy).toHaveReturnedWith(VaultMigrateResult.MIGRATION_FAILED);
      expect(logoutSpy).toHaveBeenCalledTimes(1);
      expect(logoutSpy).toHaveBeenLastCalledWith(ANONYMOUS_ROUTES.entry, {});
    });

    it('should not call "unlockVault" when vault migration succeeds', async () => {
      jest.spyOn(component, 'unlockVaultIfSetup').mockResolvedValue({pin: null })
      const migrateVaultSpy = jest.spyOn(identityFacadeService, 'migrateIfLegacyVault').mockReturnValue(VaultMigrateResult.MIGRATION_SUCCESS);
      const unlockVaultSpy = jest.spyOn(component, 'unlockVault').mockResolvedValue(null);
      await component.checkLoginFlow();
      expect(unlockVaultSpy).not.toHaveBeenCalled();
      expect(migrateVaultSpy).toHaveBeenCalledTimes(1);
      expect(migrateVaultSpy).toHaveReturnedWith(VaultMigrateResult.MIGRATION_SUCCESS);
    });

    it('should call "handleAppLoginState" when user was not logged in', async () => {
      jest.spyOn(identityFacadeService, 'migrateIfLegacyVault').mockReturnValue(VaultMigrateResult.MIGRATION_NOT_NEEDED);
      jest.spyOn(sessionFacadeService, 'determineAppLoginState').mockResolvedValue(LoginState.SELECT_INSTITUTION);
      const unlockVaultSpy = jest.spyOn(component, 'unlockVaultIfSetup').mockResolvedValue({ pin: null });
      const handleStateSpy = jest.spyOn(component, 'handleAppLoginState');
      const go2EntryPageSpy = jest.spyOn(navigationService, 'navigateAnonymous').mockResolvedValue(true);
      await component.checkLoginFlow();
      expect(handleStateSpy).toHaveBeenCalledTimes(1);
      expect(handleStateSpy).toHaveBeenCalledWith(LoginState.SELECT_INSTITUTION);
      expect(go2EntryPageSpy).toHaveBeenCalledWith(ANONYMOUS_ROUTES.entry, { replaceUrl: true });
      expect(unlockVaultSpy).toHaveBeenCalled();
    });

  });


  describe('StartupPage.unlockVault', () => {
    const session = { pin: '1111', biometricUsed: true };
    it('should nav to dashboard on vault authentication success with BIOMETRIC', async () => {
      const unlockIvSpy = jest.spyOn(identityFacadeService, 'unlockVault').mockResolvedValue(session);
      const isLockedSpy = jest.spyOn(identityFacadeService, 'isVaultLocked').mockResolvedValue(false);
      const execSpy = jest.spyOn(connectivityFacade, 'execute').mockResolvedValue({});
      const navDshbrdSpy = jest.spyOn(component, 'navigateToDashboard');
      const onsucessSpy = jest.spyOn(component, 'handleVaultLoginSuccess');
      await component.unlockVault(session.biometricUsed);

      expect(unlockIvSpy).toHaveBeenCalledTimes(1);
      expect(unlockIvSpy).toHaveBeenCalledWith(session.biometricUsed);
      expect(onsucessSpy).toHaveBeenCalledTimes(1);
      expect(isLockedSpy).toHaveBeenCalledTimes(1);
      expect(onsucessSpy).toHaveBeenCalledWith(session);
      expect(navDshbrdSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledTimes(2);
    });

    it('should NOT nav to dashboard on vault authentication success with BIOMETRIC but vault locked after', async () => {
      const unlockIvSpy = jest.spyOn(identityFacadeService, 'unlockVault').mockResolvedValue(session);
      const isLockedSpy = jest.spyOn(identityFacadeService, 'isVaultLocked').mockResolvedValue(true);
      const navDshbrdSpy = jest.spyOn(component, 'navigateToDashboard');
      const onsucessSpy = jest.spyOn(component, 'handleVaultLoginSuccess');
      await component.unlockVault(session.biometricUsed);

      expect(unlockIvSpy).toHaveBeenCalledTimes(1);
      expect(unlockIvSpy).toHaveBeenCalledWith(session.biometricUsed);
      expect(onsucessSpy).toHaveBeenCalledTimes(1);
      expect(isLockedSpy).toHaveBeenCalledTimes(1);
      expect(onsucessSpy).toHaveBeenCalledWith(session);
      expect(navDshbrdSpy).not.toHaveBeenCalled();
    });

    it('should logout on vault authentication failure', async () => {
      jest.spyOn(identityFacadeService, 'unlockVault').mockRejectedValue({});
      const handleVaultFailSpy = jest.spyOn(component, 'handleVaultUnlockFailure');
      const logoutSpy = jest.spyOn(component, 'navigateAnonymous').mockResolvedValue(true);
      await component.unlockVault(session.biometricUsed);
      expect(handleVaultFailSpy).toHaveBeenCalledTimes(1);
      expect(logoutSpy).toHaveBeenCalledTimes(1);
      expect(logoutSpy).toHaveBeenCalledWith(ANONYMOUS_ROUTES.entry);
    });

    it('should nav to dashboard on vault authentication success with PIN ONLY', async () => {
      const sessionCopy = { ...session, biometricUsed: false };
      const unlockIvSpy = jest.spyOn(identityFacadeService, 'unlockVault').mockResolvedValue(sessionCopy);
      const execSpy = jest.spyOn(connectivityFacade, 'execute').mockResolvedValue({});
      const navDshbrdSpy = jest.spyOn(component, 'navigateToDashboard');
      const onsucessSpy = jest.spyOn(component, 'handleVaultLoginSuccess');
      const authenticatePinSpy = jest.spyOn(component, 'authenticatePin');
      await component.unlockVault(sessionCopy.biometricUsed);
      expect(unlockIvSpy).toHaveBeenNthCalledWith(1, sessionCopy.biometricUsed);
      expect(onsucessSpy).toHaveBeenCalledWith(sessionCopy);
      expect(navDshbrdSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledTimes(2);
      expect(authenticatePinSpy).toHaveBeenCalled();
    });
  });

});

