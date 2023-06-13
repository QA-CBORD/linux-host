import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { RegistrationServiceFacade } from '../registration/services/registration-service-facade';
import { InstitutionLookupListItem } from '@core/model/institution';
import { CommonService } from '@shared/services/common.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { Platform } from '@ionic/angular';
import { SearchbarCustomEvent } from '@ionic/angular';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { InstitutionsPage } from './institutions.page';

describe('InstitutionsPage', () => {
  let component: InstitutionsPage;
  let fixture: ComponentFixture<InstitutionsPage>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ markForCheck: () => ({}) });
    const institutionFacadeServiceStub = () => ({
      retrieveLookupList$: sessionId => ({}),
      removeGuestSetting: () => ({}),
      saveGuestSetting: guestSettings => ({}),
      clearCurrentInstitution: () => ({}),
      getInstitutionDataByShortName$: (shortName, sessionId) => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const authFacadeServiceStub = () => ({
      getAuthSessionToken$: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      setIsGuestUser: arg => ({}),
      authenticateSystem$: () => ({ pipe: () => ({}) })
    });
    const settingsFacadeServiceStub = () => ({
      cleanCache: () => ({}),
      fetchSettingList: (fEATURES, sessionId, institutionId) => ({}),
      getSettings: (array, sessionId, institutionId) => ({}),
      getSetting: (pIN_ENABLED, sessionId, institutionId) => ({})
    });
    const sessionFacadeServiceStub = () => ({
      determineInstitutionSelectionLoginState: () => ({})
    });
    const environmentFacadeServiceStub = () => ({
      getEnvironmentObject: () => ({}),
      resetEnvironmentAndCreateSession: () => ({}),
      overrideEnvironment: environmentName => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const registrationServiceFacadeStub = () => ({
      preloginContents: acuteCare => ({ toPromise: () => ({}) })
    });
    const commonServiceStub = () => ({
      getInstitution: (id, arg) => ({}),
      getInstitutionPhoto: (arg, arg1) => ({}),
      getInstitutionBgColor: arg => ({})
    });
    const messageProxyStub = () => ({ put: preLoginCs => ({}) });
    const platformStub = () => ({ is: string => ({}) });
    const nativeProviderStub = () => ({ isMobile: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InstitutionsPage],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: SessionFacadeService, useFactory: sessionFacadeServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: ToastService, useFactory: toastServiceStub },
        {
          provide: RegistrationServiceFacade,
          useFactory: registrationServiceFacadeStub
        },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: MessageProxy, useFactory: messageProxyStub },
        { provide: Platform, useFactory: platformStub },
        { provide: NativeProvider, useFactory: nativeProviderStub }
      ]
    });
    fixture = TestBed.createComponent(InstitutionsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(true);
  });

  describe('onInstitutionSelected', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const settingsFacadeServiceStub: SettingsFacadeService = fixture.debugElement.injector.get(
        SettingsFacadeService
      );
      const institutionLookupListItemStub: InstitutionLookupListItem = <any>{};
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      spyOn(
        component,
        'checkForInstitutionEnvironmentAndOverride'
      ).and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(settingsFacadeServiceStub, 'cleanCache').and.callThrough();
      spyOn(commonServiceStub, 'getInstitution').and.callThrough();
      spyOn(commonServiceStub, 'getInstitutionPhoto').and.callThrough();
      spyOn(commonServiceStub, 'getInstitutionBgColor').and.callThrough();
      component.onInstitutionSelected(institutionLookupListItemStub);
      expect(
        component.checkForInstitutionEnvironmentAndOverride
      ).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(settingsFacadeServiceStub.cleanCache).toHaveBeenCalled();
      expect(commonServiceStub.getInstitution).toHaveBeenCalled();
      expect(commonServiceStub.getInstitutionPhoto).toHaveBeenCalled();
      expect(commonServiceStub.getInstitutionBgColor).toHaveBeenCalled();
    });
  });

  describe('checkForInstitutionEnvironmentAndOverride', () => {
    it('makes expected calls', () => {
      const institutionFacadeServiceStub: InstitutionFacadeService = fixture.debugElement.injector.get(
        InstitutionFacadeService
      );
      const authFacadeServiceStub: AuthFacadeService = fixture.debugElement.injector.get(
        AuthFacadeService
      );
      const environmentFacadeServiceStub: EnvironmentFacadeService = fixture.debugElement.injector.get(
        EnvironmentFacadeService
      );
      const institutionLookupListItemStub: InstitutionLookupListItem = <any>{};
      spyOn(
        institutionFacadeServiceStub,
        'getInstitutionDataByShortName$'
      ).and.callThrough();
      spyOn(authFacadeServiceStub, 'authenticateSystem$').and.callThrough();
      spyOn(
        environmentFacadeServiceStub,
        'overrideEnvironment'
      ).and.callThrough();
      spyOn(
        environmentFacadeServiceStub,
        'resetEnvironmentAndCreateSession'
      ).and.callThrough();
      component.checkForInstitutionEnvironmentAndOverride(
        institutionLookupListItemStub
      );
      expect(
        institutionFacadeServiceStub.getInstitutionDataByShortName$
      ).toHaveBeenCalled();
      expect(authFacadeServiceStub.authenticateSystem$).toHaveBeenCalled();
      expect(
        environmentFacadeServiceStub.overrideEnvironment
      ).toHaveBeenCalled();
      expect(
        environmentFacadeServiceStub.resetEnvironmentAndCreateSession
      ).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'setNativeEnvironment').and.callThrough();
      component.ngOnInit();
      expect(component.setNativeEnvironment).toHaveBeenCalled();
    });
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      spyOn(component, 'performInstitutionCleanUp').and.callThrough();
      component.ionViewWillEnter();
      expect(component.performInstitutionCleanUp).toHaveBeenCalled();
    });
  });

  describe('onEnterKeyClicked', () => {
    it('makes expected calls', () => {
      const nativeProviderStub: NativeProvider = fixture.debugElement.injector.get(
        NativeProvider
      );
      spyOn(nativeProviderStub, 'isMobile').and.callThrough();
      component.onEnterKeyClicked();
      expect(nativeProviderStub.isMobile).toHaveBeenCalled();
    });
  });

  describe('setNativeEnvironment', () => {
    it('makes expected calls', () => {
      const environmentFacadeServiceStub: EnvironmentFacadeService = fixture.debugElement.injector.get(
        EnvironmentFacadeService
      );
      const platformStub: Platform = fixture.debugElement.injector.get(
        Platform
      );
      spyOn(
        environmentFacadeServiceStub,
        'getEnvironmentObject'
      ).and.callThrough();
      spyOn(platformStub, 'is').and.callThrough();
      component.setNativeEnvironment();
      expect(
        environmentFacadeServiceStub.getEnvironmentObject
      ).toHaveBeenCalled();
      expect(platformStub.is).toHaveBeenCalled();
    });
  });

  describe('performInstitutionCleanUp', () => {
    it('makes expected calls', () => {
      const institutionFacadeServiceStub: InstitutionFacadeService = fixture.debugElement.injector.get(
        InstitutionFacadeService
      );
      const environmentFacadeServiceStub: EnvironmentFacadeService = fixture.debugElement.injector.get(
        EnvironmentFacadeService
      );
      spyOn(
        institutionFacadeServiceStub,
        'clearCurrentInstitution'
      ).and.callThrough();
      spyOn(
        environmentFacadeServiceStub,
        'resetEnvironmentAndCreateSession'
      ).and.callThrough();
      component.performInstitutionCleanUp();
      expect(
        institutionFacadeServiceStub.clearCurrentInstitution
      ).toHaveBeenCalled();
      expect(
        environmentFacadeServiceStub.resetEnvironmentAndCreateSession
      ).toHaveBeenCalled();
    });
  });
});
