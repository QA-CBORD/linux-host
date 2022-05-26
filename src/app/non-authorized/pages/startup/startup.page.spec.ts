import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { VaultMigrateResult } from '@core/service/identity/vault.identity.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { NavigationService } from '@shared/services/navigation.service';
import { ExecStatus } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { ConnectivityFacadeService } from './connectivity-facade.service';
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
      unlockVault: jest.fn()
    };
    authFacadeService = {
      getAuthSessionToken$: jest.fn()
    };
    navigationService = {
      navigateAnonymous: jest.fn()
    };
    connectivityFacade = {
      exec: jest.fn()
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
        { provide: ConnectivityFacadeService, useValue: connectivityFacade },
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
      initEnvSpy = jest.spyOn(environmentFacadeService, 'initialization').mockResolvedValue(true);
      execSpy = jest.spyOn(connectivityFacade, 'exec').mockReturnValue(results);
      clearAllSpy = jest.spyOn(identityFacadeService, 'clearAll').mockResolvedValue(true);
    });

    it('should logout user when authencation fails', async () => {
      const migrateVaultSpy = jest.spyOn(identityFacadeService, 'migrateIfLegacyVault').mockReturnValue(VaultMigrateResult.MIGRATION_FAILED);
      const logoutSpy = jest.spyOn(navigationService, 'navigateAnonymous').mockResolvedValue(true);
      await component.checkLoginFlow();
      expect(initEnvSpy).toHaveBeenCalledTimes(1);
      expect(clearAllSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveReturnedWith(results);
      expect(migrateVaultSpy).toHaveBeenCalledTimes(1);
      expect(migrateVaultSpy).toHaveReturnedWith(VaultMigrateResult.MIGRATION_FAILED);
      expect(logoutSpy).toHaveBeenCalledTimes(1);
      expect(logoutSpy).toHaveBeenLastCalledWith(ANONYMOUS_ROUTES.entry, {});
    });

    it('should call "unlockVault" when vault migration succeeds', async () => {
      const migrateVaultSpy = jest.spyOn(identityFacadeService, 'migrateIfLegacyVault').mockReturnValue(VaultMigrateResult.MIGRATION_SUCCESS);
      const loginStateSpy = jest.spyOn(sessionFacadeService, 'determineAppLoginState').mockResolvedValue(LoginState.BIOMETRIC_LOGIN);
      const unlockVaultSpy = jest.spyOn(component, 'unlockVault').mockResolvedValue(null);
      await component.checkLoginFlow();
      expect(loginStateSpy).toHaveBeenCalledTimes(1);
      expect(unlockVaultSpy).toHaveBeenCalledTimes(1);
      expect(unlockVaultSpy).toHaveBeenCalledWith(true);
      expect(migrateVaultSpy).toHaveReturnedWith(VaultMigrateResult.MIGRATION_SUCCESS);
    });

    it('should call "handleAppLoginState" when user was not logged in', async () => {
      jest.spyOn(identityFacadeService, 'migrateIfLegacyVault').mockReturnValue(VaultMigrateResult.MIGRATION_NOT_NEEDED);
      jest.spyOn(sessionFacadeService, 'determineAppLoginState').mockResolvedValue(LoginState.SELECT_INSTITUTION);
      const unlockVaultSpy = jest.spyOn(component, 'unlockVault').mockResolvedValue(null);
      const handleStateSpy = jest.spyOn(component, 'handleAppLoginState');
      const go2EntryPageSpy = jest.spyOn(navigationService, 'navigateAnonymous').mockResolvedValue(true);
      await component.checkLoginFlow();
      expect(handleStateSpy).toHaveBeenCalledTimes(1);
      expect(handleStateSpy).toHaveBeenCalledWith(LoginState.SELECT_INSTITUTION);
      expect(go2EntryPageSpy).toHaveBeenCalledWith(ANONYMOUS_ROUTES.entry, { replaceUrl: true });
      expect(unlockVaultSpy).not.toHaveBeenCalled();
    });

  });


  describe('StartupPage.unlockVault', () => {
    const session = { pin: '1111', biometricEnabled: true };
    it('should nav to dashboard on vault authentication success with BIOMETRIC', async () => {
      const unlockIvSpy = jest.spyOn(identityFacadeService, 'unlockVault').mockResolvedValue(session);
      const execSpy = jest.spyOn(connectivityFacade, 'exec').mockResolvedValue({});
      const navDshbrdSpy = jest.spyOn(component, 'navigateToDashboard');
      const onsucessSpy = jest.spyOn(component, 'handleVaultLoginSuccess');
      await component.unlockVault(session.biometricEnabled);

      expect(unlockIvSpy).toHaveBeenCalledTimes(1);
      expect(unlockIvSpy).toHaveBeenCalledWith(session.biometricEnabled);
      expect(onsucessSpy).toHaveBeenCalledTimes(1);
      expect(onsucessSpy).toHaveBeenCalledWith(session.pin, session.biometricEnabled);
      expect(navDshbrdSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledTimes(2);
    });

    it('should logout on vault authentication failure', async () => {
      jest.spyOn(identityFacadeService, 'unlockVault').mockRejectedValue({});
      const handleVaultFailSpy = jest.spyOn(component, 'handleVaultLoginFailure');
      const logoutSpy = jest.spyOn(component, 'navigateAnonymous').mockResolvedValue(true);
      await component.unlockVault(session.biometricEnabled);
      expect(handleVaultFailSpy).toHaveBeenCalledTimes(1);
      expect(logoutSpy).toHaveBeenCalledTimes(1);
      expect(logoutSpy).toHaveBeenCalledWith(ANONYMOUS_ROUTES.entry);
    });

    it('should nav to dashboard on vault authentication success with PIN ONLY', async () => {
      const sessionCopy = { ...session, biometricEnabled: false };
      const unlockIvSpy = jest.spyOn(identityFacadeService, 'unlockVault').mockResolvedValue(sessionCopy);
      const execSpy = jest.spyOn(connectivityFacade, 'exec').mockResolvedValue({});
      const navDshbrdSpy = jest.spyOn(component, 'navigateToDashboard');
      const onsucessSpy = jest.spyOn(component, 'handleVaultLoginSuccess');
      const biometricLoginSuccessSpy = jest.spyOn(component, 'handleBiometricLoginSuccess');
      await component.unlockVault(sessionCopy.biometricEnabled);
      expect(unlockIvSpy).toHaveBeenCalledWith(sessionCopy.biometricEnabled);
      expect(onsucessSpy).toHaveBeenCalledWith(sessionCopy.pin, sessionCopy.biometricEnabled);
      expect(navDshbrdSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(biometricLoginSuccessSpy).not.toHaveBeenCalled();
    });
  });

});

