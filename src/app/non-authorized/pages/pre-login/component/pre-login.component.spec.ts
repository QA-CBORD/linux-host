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

describe('PreLoginComponent', () => {
  let component: PreLoginComponent;
  let fixture: ComponentFixture<PreLoginComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const domSanitizerStub = () => ({});
    const institutionFacadeServiceStub = () => ({
      guestSettings: {},
      saveGuestSetting: newGuestSetting => ({})
    });
    const authFacadeServiceStub = () => ({
      setIsGuestUser: isGuestUser => ({})
    });
    const settingsFacadeServiceStub = () => ({
      fetchSettingList: (fEATURES, sessionId, institutionId) => ({}),
      getSettings: (array, sessionId, institutionId) => ({}),
      getSetting: (pIN_ENABLED, sessionId, institutionId) => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const sessionFacadeServiceStub = () => ({
      determineInstitutionSelectionLoginState: () => ({})
    });
    const commonServiceStub = () => ({
      getInstitution: () => ({}),
      getInstitutionBgColor: () => ({}),
      sessionId: () => ({}),
      getInstitutionName: () => ({}),
      getInstitutionPhoto: (arg, sanitizer) => ({})
    });
    const messageProxyStub = () => ({ get: () => ({}), put: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PreLoginComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: SessionFacadeService, useFactory: sessionFacadeServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: MessageProxy, useFactory: messageProxyStub }
      ]
    });
    fixture = TestBed.createComponent(PreLoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const messageProxyStub: MessageProxy = fixture.debugElement.injector.get(
        MessageProxy
      );
      spyOn(messageProxyStub, 'get').and.callThrough();
      component.ngOnInit();
      expect(messageProxyStub.get).toHaveBeenCalled();
    });
  });

  describe('continueAsNonGuest', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      component.continueAsNonGuest();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    });
  });

  describe('continueAsGuest', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      component.continueAsGuest();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    });
  });
});
