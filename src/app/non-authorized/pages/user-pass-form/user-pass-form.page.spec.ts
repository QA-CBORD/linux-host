import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { FormBuilder } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { RegistrationServiceFacade } from '../registration/services/registration-service-facade';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { CommonService } from '@shared/services/common.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { UserPassForm } from './user-pass-form.page';

describe('UserPassForm', () => {
  let component: UserPassForm;
  let fixture: ComponentFixture<UserPassForm>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: { pipe: () => ({ toPromise: () => ({}) }) },
      getInstitutionInfo$: (institutionId, sessionId, arg) => ({
        pipe: () => ({})
      })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const domSanitizerStub = () => ({});
    const authFacadeServiceStub = () => ({
      isGuestUser: () => ({ toPromise: () => ({}) }),
      authenticateUser$: object => ({ pipe: () => ({ toPromise: () => ({}) }) })
    });
    const formBuilderStub = () => ({ group: object => ({}) });
    const loadingServiceStub = () => ({
      closeSpinner: () => ({}),
      showSpinner: () => ({})
    });
    const contentStringsFacadeServiceStub = () => ({
      fetchContentStringModel: forgotPassword => ({ toPromise: () => ({}) }),
      fetchContentString$: (
        get_web_gui,
        login_screen,
        name,
        arg,
        sessionId,
        arg1
      ) => ({ pipe: () => ({ toPromise: () => ({}) }) })
    });
    const inAppBrowserStub = () => ({ create: (link, string) => ({}) });
    const settingsFacadeServiceStub = () => ({
      getSetting: sTANDARD_REGISTRATION_LINK => ({
        pipe: () => ({ toPromise: () => ({}) })
      })
    });
    const identityFacadeServiceStub = () => ({
      pinLoginSetup: arg => ({}),
      getAvailableBiometricHardware: () => ({})
    });
    const sessionFacadeServiceStub = () => ({
      determinePostLoginState: (sessionId, id) => ({})
    });
    const environmentFacadeServiceStub = () => ({ getSitesURL: () => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const accessibilityServiceStub = () => ({ readAloud: arg => ({}) });
    const registrationServiceFacadeStub = () => ({
      registrationConfig: isGuestUser => ({})
    });
    const modalControllerStub = () => ({
      create: object => ({ present: () => ({}), onDidDismiss: () => ({}) })
    });
    const platformStub = () => ({ pause: { subscribe: f => f({}) } });
    const commonServiceStub = () => ({
      sessionId: () => ({}),
      getInstitutionPhoto: (arg, sanitizer) => ({}),
      getInstitutionBgColor: () => ({}),
      getInstitutionName: () => ({}),
      getInstitution: () => ({})
    });
    const messageProxyStub = () => ({
      get: () => ({}),
      put: forgotPasswordCs => ({})
    });
    const globalNavServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserPassForm],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        },
        { provide: InAppBrowser, useFactory: inAppBrowserStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        {
          provide: IdentityFacadeService,
          useFactory: identityFacadeServiceStub
        },
        { provide: SessionFacadeService, useFactory: sessionFacadeServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: AccessibilityService, useFactory: accessibilityServiceStub },
        {
          provide: RegistrationServiceFacade,
          useFactory: registrationServiceFacadeStub
        },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: Platform, useFactory: platformStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: MessageProxy, useFactory: messageProxyStub },
        { provide: GlobalNavService, useFactory: globalNavServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UserPassForm);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ionViewDidEnter', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      component.ionViewDidEnter();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('onSignup', () => {
    it('makes expected calls', () => {
      const messageProxyStub: MessageProxy = fixture.debugElement.injector.get(
        MessageProxy
      );
      spyOn(component, 'doHostedSignup').and.callThrough();
      spyOn(component, 'redirectToSignup').and.callThrough();
      spyOn(messageProxyStub, 'get').and.callThrough();
      component.onSignup();
      expect(component.doHostedSignup).toHaveBeenCalled();
      expect(component.redirectToSignup).toHaveBeenCalled();
      expect(messageProxyStub.get).toHaveBeenCalled();
    });
  });

  describe('redirectToSignup', () => {
    it('makes expected calls', () => {
      const inAppBrowserStub: InAppBrowser = fixture.debugElement.injector.get(
        InAppBrowser
      );
      const environmentFacadeServiceStub: EnvironmentFacadeService = fixture.debugElement.injector.get(
        EnvironmentFacadeService
      );
      spyOn(inAppBrowserStub, 'create').and.callThrough();
      spyOn(environmentFacadeServiceStub, 'getSitesURL').and.callThrough();
      component.redirectToSignup();
      expect(inAppBrowserStub.create).toHaveBeenCalled();
      expect(environmentFacadeServiceStub.getSitesURL).toHaveBeenCalled();
    });
  });

  describe('redirectToForgotPassword', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = fixture.debugElement.injector.get(
        ContentStringsFacadeService
      );
      const messageProxyStub: MessageProxy = fixture.debugElement.injector.get(
        MessageProxy
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(
        contentStringsFacadeServiceStub,
        'fetchContentStringModel'
      ).and.callThrough();
      spyOn(messageProxyStub, 'put').and.callThrough();
      component.redirectToForgotPassword();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(
        contentStringsFacadeServiceStub.fetchContentStringModel
      ).toHaveBeenCalled();
      expect(messageProxyStub.put).toHaveBeenCalled();
    });
  });

  describe('isSignupEnabled$', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = fixture.debugElement.injector.get(
        SettingsFacadeService
      );
      spyOn(settingsFacadeServiceStub, 'getSetting').and.callThrough();
      component.isSignupEnabled$();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });
});
