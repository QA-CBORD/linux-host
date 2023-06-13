import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { LoadingService } from '@core/service/loading/loading.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Institution } from '@core/model/institution';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { PopoverController } from '@ionic/angular';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { ExternalLoginPage } from './external-login.page';

describe('ExternalLoginPage', () => {
  let component: ExternalLoginPage;
  let fixture: ComponentFixture<ExternalLoginPage>;

  beforeEach(() => {
    const elementRefStub = () => ({ nativeElement: { remove: () => ({}) } });
    const ngZoneStub = () => ({ run: function0 => ({}) });
    const inAppBrowserStub = () => ({ create: (url, target, options) => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    const environmentFacadeServiceStub = () => ({ getSitesURL: () => ({}) });
    const authFacadeServiceStub = () => ({
      cachedAuthSessionToken: {},
      getAuthSessionToken$: () => ({ pipe: () => ({ toPromise: () => ({}) }) })
    });
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const sessionFacadeServiceStub = () => ({
      determinePostLoginState: (sessionId, institutionId) => ({})
    });
    const identityFacadeServiceStub = () => ({
      pinLoginSetup: arg => ({}),
      getAvailableBiometricHardware: () => ({})
    });
    const settingsFacadeServiceStub = () => ({
      getSetting: (mOBILE_HEADER_COLOR, sessionId, id) => ({
        pipe: () => ({ toPromise: () => ({}) })
      })
    });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const nativeStartupFacadeServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExternalLoginPage],
      providers: [
        { provide: ElementRef, useFactory: elementRefStub },
        { provide: NgZone, useFactory: ngZoneStub },
        { provide: InAppBrowser, useFactory: inAppBrowserStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: SessionFacadeService, useFactory: sessionFacadeServiceStub },
        {
          provide: IdentityFacadeService,
          useFactory: identityFacadeServiceStub
        },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: PopoverController, useFactory: popoverControllerStub },
        {
          provide: NativeStartupFacadeService,
          useFactory: nativeStartupFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(ExternalLoginPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('initializeInAppBrowser', () => {
    it('makes expected calls', () => {
      const inAppBrowserStub: InAppBrowser = fixture.debugElement.injector.get(
        InAppBrowser
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const institutionStub: Institution = <any>{};
      spyOn(inAppBrowserStub, 'create').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      component.initializeInAppBrowser(institutionStub);
      expect(inAppBrowserStub.create).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('ionViewDidEnter', () => {
    it('makes expected calls', () => {
      spyOn(component, 'loadLoginContent').and.callThrough();
      component.ionViewDidEnter();
      expect(component.loadLoginContent).toHaveBeenCalled();
    });
  });

  describe('loadLoginContent', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initializeInAppBrowser').and.callThrough();
      component.loadLoginContent();
      expect(component.initializeInAppBrowser).toHaveBeenCalled();
    });
  });
});
