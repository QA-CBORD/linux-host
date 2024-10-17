import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { CommonService } from '@shared/services/common.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { PreLoginComponent } from './pre-login.component';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { of } from 'rxjs';
import { ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';

describe('PreLoginComponent', () => {
  let component: PreLoginComponent;
  let fixture: ComponentFixture<PreLoginComponent>;
  const nav = { navigate: jest.fn() };
  const loadingService = { showSpinner: jest.fn(), closeSpinner: jest.fn() };
  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const domSanitizerStub = () => ({});
    const institutionFacadeServiceStub = () => ({
      guestSettings: Promise.resolve({}),
      saveGuestSetting: newGuestSetting => ({}),
    });
    const authFacadeServiceStub = () => ({
      setIsGuestUser: isGuestUser => ({}),
    });
    const settingsFacadeServiceStub = () => ({
      fetchSettingList: (fEATURES, sessionId, institutionId) => of({}),
      getSettings: (array, sessionId, institutionId) => of({}),
      getSetting: (pIN_ENABLED, sessionId, institutionId) => of({}),
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({}),
    });
    const sessionFacadeServiceStub = {
      determineInstitutionSelectionLoginState: () => Promise.resolve(LoginState.HOSTED),
    };
    const commonServiceStub = () => ({
      getInstitution: () => Promise.resolve({ id: 'test' }),
      getInstitutionBgColor: () => ({}),
      sessionId: () => ({}),
      getInstitutionName: () => ({}),
      getInstitutionPhoto: (arg, sanitizer) => ({}),
    });
    const messageProxyStub = () => ({ get: () => ({}), put: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PreLoginComponent],
      providers: [
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub,
        },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub,
        },
        { provide: SessionFacadeService, useValue: sessionFacadeServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: MessageProxy, useFactory: messageProxyStub },
        { provide: Router, useValue: nav },
        { provide: LoadingService, useValue: loadingService },
      ],
    });
    fixture = TestBed.createComponent(PreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to external login when loginType is EXTERNAL', async () => {
    const isGuestUser = false;
    const loginState = LoginState.EXTERNAL;

    await component['navigateToLogin'](isGuestUser, loginState);

    expect(loadingService.closeSpinner).toHaveBeenCalled();
    expect(nav.navigate).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.external]);
  });
  describe('continueAsNonGuest', () => {
    it('makes expected calls', () => {
      jest.spyOn(loadingService, 'showSpinner');
      component.continueAsNonGuest();
      expect(loadingService.showSpinner).toHaveBeenCalled();
    });
  });

  describe('continueAsGuest', () => {
    it('makes expected calls', () => {
      jest.spyOn(loadingService, 'showSpinner');
      component.continueAsGuest();
      expect(loadingService.showSpinner).toHaveBeenCalled();
    });
  });
});
