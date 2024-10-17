import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionsPage } from './institutions.page';
import { IonSearchbar, Platform } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { RegistrationServiceFacade } from '../registration/services/registration-service-facade';
import { CommonService, MessageProxy } from '@shared/services';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { SearchPipeModule } from '@shared/pipes/search-pipe/search.pipe.module';
import { AccessibilityService, PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { Keyboard } from '@capacitor/keyboard';
import { InstitutionLookupListItem } from '@core/model/institution';
import { ROLES, Settings } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { Capacitor, registerPlugin } from '@capacitor/core';
jest.mock('@capacitor/keyboard', () => ({
  Keyboard: {
    hide: jest.fn(),
  },
}));

describe('InstitutionPage', () => {
  let component: InstitutionsPage;
  let fixture: ComponentFixture<InstitutionsPage>;
  let searchbar: DebugElement;
  let institutionFacadeService = {
    clearCurrentInstitution: jest.fn().mockResolvedValue(null),
    retrieveLookupList$: jest.fn().mockReturnValue(of([])),
    removeGuestSetting: jest.fn(),
    saveGuestSetting: jest.fn(),
    getInstitutionDataByShortName$: jest.fn(),
  };
  let settingsFacadeService = {
    cleanCache: jest.fn(),
    fetchSettingList: jest.fn(),
    getSettings: jest.fn(),
    getSetting: jest.fn(),
  };
  let environmentFacadeService = {
    resetEnvironmentAndCreateSession: jest.fn().mockResolvedValue(null),
    getEnvironmentObject: jest.fn().mockReturnValue({}),
    overrideEnvironment: jest.fn(),
  };
  let authFacadeService = {
    getAuthSessionToken$: jest.fn().mockReturnValue(of('')),
    setIsGuestUser: jest.fn(),
    authenticateSystem$: jest.fn().mockReturnValue(of('sessionId')),
  };
  let loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };
  let sessionFacadeService = {
    determineInstitutionSelectionLoginState: jest.fn(),
  };
  let nav = {
    navigate: jest.fn(),
  };
  let toastService = {
    showToast: jest.fn(),
  };
  let registrationServiceFacade = {
    preloginContents: jest.fn().mockReturnValue(of({})),
  };
  let commonService = {
    getInstitution: jest.fn(),
    getInstitutionPhoto: jest.fn(),
    getInstitutionBgColor: jest.fn(),
  };
  let messageProxy = {
    put: jest.fn(),
  };
  let platform = {
    is: jest.fn(),
  };
  let nativeProvider = { isMobile: jest.fn() };
  let a11yService = {
    excuteSearchSpeech: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: InstitutionFacadeService, useValue: institutionFacadeService },
        { provide: SettingsFacadeService, useValue: settingsFacadeService },
        { provide: EnvironmentFacadeService, useValue: environmentFacadeService },
        { provide: AuthFacadeService, useValue: authFacadeService },
        { provide: LoadingService, useValue: loadingService },
        { provide: SessionFacadeService, useValue: sessionFacadeService },
        { provide: Router, useValue: nav },
        { provide: ToastService, useValue: toastService },
        { provide: RegistrationServiceFacade, useValue: registrationServiceFacade },
        { provide: CommonService, useValue: commonService },
        { provide: MessageProxy, useValue: messageProxy },
        { provide: Platform, useValue: platform },
        { provide: NativeProvider, useValue: nativeProvider },
        { provide: AccessibilityService, useValue: a11yService },
      ],
      imports: [SearchPipeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsPage);
    component = fixture.componentInstance;
    component.performInstitutionCleanUp = jest.fn();

    fixture.detectChanges();

    // Wait for ion-searchbar to render
    fixture.whenStable().then(() => {
      searchbar = fixture.debugElement.query(By.directive(IonSearchbar));
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearchedValue when ionInput event is triggered', () => {
    const inputValue = 'example search';
    jest.spyOn(component, 'onSearchedValue');

    fixture.whenStable().then(() => {
      searchbar.triggerEventHandler('ionInput', {
        detail: {
          value: inputValue,
        },
      });
      fixture.detectChanges();

      expect(component.onSearchedValue).toHaveBeenCalledWith(inputValue);
    });
  });

  it('should call onEnterKeyClicked when keyup.enter event is triggered', () => {
    jest.spyOn(component, 'onEnterKeyClicked');

    // Wait for searchbar to be defined
    fixture.whenStable().then(() => {
      searchbar.triggerEventHandler('keyup.enter', {});
      fixture.detectChanges();

      expect(component.onEnterKeyClicked).toHaveBeenCalled();
    });
  });

  it('should call performInstitutionCleanUp when ionViewWillEnter is called', () => {
    component.ionViewWillEnter();

    expect(component.performInstitutionCleanUp).toHaveBeenCalled();
  });
  it('should hide the keyboard when onEnterKeyClicked is called on a mobile device', () => {
    nativeProvider.isMobile.mockReturnValue(true);

    component.onEnterKeyClicked();

    expect(Keyboard.hide).toHaveBeenCalled();
  });
  it('should update searchString when onSearchedValue is called', () => {
    const inputValue = 'example search';

    component.onSearchedValue({ target: { value: inputValue } } as any);

    expect(component.searchString).toEqual(inputValue);
  });
  it('should handle error when getInstitutions is called', () => {
    const errorMessage = 'Something went wrong, please try again...';
    jest.spyOn(component as any, 'onErrorRetrieve');
    authFacadeService.getAuthSessionToken$.mockReturnValue(throwError(new Error()));

    component.getInstitutions();

    expect(component.isLoading).toBe(false);
    expect(component['onErrorRetrieve']).toHaveBeenCalledWith(errorMessage);
  });
  it('should handle institution selection', async () => {
    const selectedInstitution: InstitutionLookupListItem = {
      guestSettings: {
        canLogin: true,
      },
      id: {},
    } as any;
    const checkForInstitutionEnvironmentAndOverride = jest.fn().mockReturnValue(of({}));
    const getInstitution = jest.fn().mockResolvedValue(null);
    const getInstitutionPhoto = jest.fn();
    const getInstitutionBgColor = jest.fn().mockResolvedValue(null);
    const navigate2PreLogin = jest.fn();
    const navigate2Login = jest.fn();

    component.checkForInstitutionEnvironmentAndOverride = checkForInstitutionEnvironmentAndOverride;
    commonService.getInstitution = getInstitution;
    commonService.getInstitutionPhoto = getInstitutionPhoto;
    commonService.getInstitutionBgColor = getInstitutionBgColor;
    component['navigate2PreLogin'] = navigate2PreLogin;
    component['navigate2Login'] = navigate2Login;

    await component.onInstitutionSelected(selectedInstitution);

    expect(loadingService.showSpinner).toHaveBeenCalled();
    expect(checkForInstitutionEnvironmentAndOverride).toHaveBeenCalledWith(selectedInstitution);
    expect(component['settingsFacadeService'].cleanCache).toHaveBeenCalled();
    expect(getInstitution).toHaveBeenCalledWith(selectedInstitution.id, false);
    expect(getInstitutionPhoto).toHaveBeenCalledWith(false, null);
    expect(getInstitutionBgColor).toHaveBeenCalledWith(false);
    expect(loadingService.closeSpinner).toHaveBeenCalled();
    expect(navigate2PreLogin).toHaveBeenCalledWith(selectedInstitution);
    expect(navigate2Login).toHaveBeenCalledWith(selectedInstitution);
  });
  it('should navigate to login', async () => {
    const institution = { id: 'institutionId' };
    const sessionId = 'sessionId';
    const loginType = 'loginType';
    const determineInstitutionSelectionLoginState = jest.fn().mockReturnValue(of(loginType));
    const getAuthSessionToken$ = jest.fn().mockReturnValue(of(sessionId));
    const fetchSettingList = jest.fn().mockReturnValue(of(null));
    const getSettings = jest.fn().mockReturnValue(of(null));
    const getSetting = jest.fn().mockReturnValue(of(null));
    const navigate = jest.fn();
    const preLoginCs = 'preLoginCs';
    const preloginContents = jest.fn().mockReturnValue(of(preLoginCs));
    registrationServiceFacade.preloginContents = preloginContents;

    authFacadeService.getAuthSessionToken$ = getAuthSessionToken$;
    settingsFacadeService.fetchSettingList = fetchSettingList;
    settingsFacadeService.getSettings = getSettings;
    settingsFacadeService.getSetting = getSetting;
    sessionFacadeService.determineInstitutionSelectionLoginState = determineInstitutionSelectionLoginState;
    component['navigate'] = navigate;

    await component['navigate2Login'](institution);

    expect(institutionFacadeService.removeGuestSetting).toHaveBeenCalled();
    expect(authFacadeService.setIsGuestUser).toHaveBeenCalledWith(false);
    expect(getAuthSessionToken$).toHaveBeenCalled();
    expect(fetchSettingList).toHaveBeenCalledWith(Settings.SettingList.FEATURES, sessionId, institution.id);
    expect(getSettings).toHaveBeenCalledWith([Settings.Setting.FEEDBACK_EMAIL], sessionId, institution.id);
    expect(getSetting).toHaveBeenCalledWith(Settings.Setting.PIN_ENABLED, sessionId, institution.id);
    expect(determineInstitutionSelectionLoginState).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(loginType);
  });
  it('should navigate to pre-login', async () => {
    const institution: InstitutionLookupListItem = {} as any;
    const navigate = jest.fn();

    nav.navigate = navigate;

    await component['navigate2PreLogin'](institution);

    expect(institutionFacadeService.saveGuestSetting).toHaveBeenCalledWith(institution.guestSettings);
    expect(registrationServiceFacade.preloginContents).toHaveBeenCalledWith(institution.acuteCare);
    expect(loadingService.closeSpinner).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.pre_login]);
  });
  it('should navigate to login when loginState is HOSTED', async () => {
    await component['navigate'](LoginState.HOSTED);

    expect(loadingService.closeSpinner).toHaveBeenCalled();
    expect(messageProxy.put).toHaveBeenCalledWith({ navParams: { isGuestUser: false } });
    expect(nav.navigate).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.login]);
  });

  it('should navigate to external when loginState is EXTERNAL', async () => {
    const navigate = jest.fn();
    nav.navigate = navigate;

    await component['navigate'](LoginState.EXTERNAL);

    expect(loadingService.closeSpinner).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.external]);
  });
  it('should show error toast on error retrieve', async () => {
    const showToast = jest.fn();
    const message = 'Error message';
    const navigate = jest.fn();

    toastService.showToast = showToast;
    nav.navigate = navigate;

    await component['onErrorRetrieve'](message);

    expect(showToast).toHaveBeenCalledWith({
      message,
      toastButtons: [
        {
          text: 'Retry',
          handler: expect.any(Function),
        },
        {
          text: 'Back',
          handler: expect.any(Function),
        },
      ],
    });
  });
  it('should retry on Retry button click', async () => {
    const showToast = jest.fn();
    const getInstitutions = jest.fn();
    const message = 'Error message';

    toastService.showToast = showToast;
    component.getInstitutions = getInstitutions;

    await component['onErrorRetrieve'](message);

    // Trigger the Retry button handler
    const showToastCall = showToast.mock.calls[0][0];
    const retryButton = showToastCall.toastButtons.find(button => button.text === 'Retry');
    retryButton.handler();

    expect(getInstitutions).toHaveBeenCalled();
  });

  it('should navigate back on Back button click', async () => {
    const showToast = jest.fn();
    const navigate = jest.fn();
    const message = 'Error message';

    toastService.showToast = showToast;
    nav.navigate = navigate;

    await component['onErrorRetrieve'](message);

    // Trigger the Back button handler
    const showToastCall = showToast.mock.calls[0][0];
    const backButton = showToastCall.toastButtons.find(button => button.text === 'Back');
    backButton.handler();

    expect(navigate).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.entry]);
  });

  it('should override environment and get institution data if environmentName is present', () => {
    const selectedInstitution = { environmentName: 'test', shortName: 'test' } as any;
    const overrideEnvironment = jest.fn();
    const authenticateSystem$ = jest.fn().mockReturnValue(of('sessionId'));
    const getInstitutionDataByShortName$ = jest.fn().mockReturnValue(of({ id: 'testId' }));

    environmentFacadeService.overrideEnvironment = overrideEnvironment;
    authFacadeService.authenticateSystem$ = authenticateSystem$;
    institutionFacadeService.getInstitutionDataByShortName$ = getInstitutionDataByShortName$;

    const result$ = component['checkForInstitutionEnvironmentAndOverride'](selectedInstitution);

    result$.subscribe(id => {
      expect(id).toBe('testId');
      expect(overrideEnvironment).toHaveBeenCalledWith(selectedInstitution.environmentName);
      expect(authenticateSystem$).toHaveBeenCalled();
      expect(getInstitutionDataByShortName$).toHaveBeenCalledWith(selectedInstitution.shortName, 'sessionId');
    });
  });

  it('should reset environment and return selected institution if environmentName is not present', () => {
    const selectedInstitution = { shortName: 'test' } as any;
    const resetEnvironmentAndCreateSession = jest.fn();

    environmentFacadeService.resetEnvironmentAndCreateSession = resetEnvironmentAndCreateSession;

    const result$ = component['checkForInstitutionEnvironmentAndOverride'](selectedInstitution);

    result$.subscribe(inst => {
      expect(inst).toBe(selectedInstitution);
      expect(resetEnvironmentAndCreateSession).toHaveBeenCalled();
    });
  });
});
