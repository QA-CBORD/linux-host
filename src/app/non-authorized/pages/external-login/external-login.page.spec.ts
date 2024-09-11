import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { BUTTON_TYPE, buttons } from '@core/utils/buttons.config';
import { IonicModule, PopoverController } from '@ionic/angular';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { Subscription, of } from 'rxjs';
import { PATRON_NAVIGATION, ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { ExternalLoginPage } from './external-login.page';
import { ElementRef } from '@angular/core';
import { InAppBrowserObject } from '@awesome-cordova-plugins/in-app-browser';
import { Institution } from '@core/model/institution';
import { StGlobalPopoverComponent } from '@shared/ui-components';

const modalSpy = {
  onDidDismiss: jest.fn(() => Promise.resolve({ role: BUTTON_TYPE.RETRY })),
  present: jest.fn(),
};

const _inAppBrowser = {
  create: jest.fn(() => {
    return {
      show: jest.fn(),
      on: jest.fn(() => of('event')),
      close: jest.fn(),
    };
  }),
};
const _loadingService = {
  showSpinner: jest.fn(),
  closeSpinner: jest.fn(),
};
const _popoverCtrl = {
  create: jest.fn(() => Promise.resolve(modalSpy)),
};
const _institutionFacadeService = {
  cachedInstitutionInfo$: { pipe: jest.fn(() => of({} as Institution)) },
};
const _environmentFacadeService = {
  getSitesURL: jest.fn(),
};
const _authFacadeService = {
  getAuthSessionToken$: jest.fn(() => ({
    pipe: jest.fn(() => ({
      toPromise: jest.fn(() => Promise.resolve({})), // Mock the toPromise method to return a resolved promise
    })),
  })),
};
const _sessionFacadeService = {
  determinePostLoginState: jest.fn(),
};
const _identityFacadeService = {
  pinLoginSetup: jest.fn(),
  getAvailableBiometricHardware: jest.fn(),
};
const _settingsFacadeService = {
  getSetting: jest.fn(() => of({ value: '{"native-header-bg":"#000"}' } as SettingInfo)),
};
const _router = {
  navigate: jest.fn(),
};

describe('ExternalLoginPage', () => {
  let component: ExternalLoginPage;
  let fixture: ComponentFixture<ExternalLoginPage>;
  let elementRef = { nativeElement: { remove: jest.fn() } };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalLoginPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: InAppBrowser, useValue: _inAppBrowser },
        { provide: LoadingService, useValue: _loadingService },
        { provide: PopoverController, useValue: _popoverCtrl },
        { provide: InstitutionFacadeService, useValue: _institutionFacadeService },
        { provide: EnvironmentFacadeService, useValue: _environmentFacadeService },
        { provide: AuthFacadeService, useValue: _authFacadeService },
        { provide: SessionFacadeService, useValue: _sessionFacadeService },
        { provide: IdentityFacadeService, useValue: _identityFacadeService },
        { provide: SettingsFacadeService, useValue: _settingsFacadeService },
        { provide: Router, useValue: _router },
        { provide: ElementRef, useValue: elementRef },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ExternalLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadLoginContent', () => {
    const loadLoginContentSpy = jest.spyOn(component, 'loadLoginContent');

    component.ionViewDidEnter();

    expect(loadLoginContentSpy).toHaveBeenCalled();
  });

  it('should call clearSubscriptions and remove the native element', () => {
    const clearSubscriptionsSpy = jest.spyOn(component as any, 'clearSubscriptions');

    component.ionViewDidLeave();

    expect(clearSubscriptionsSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from subscriptions and close the browser', () => {
    component['subscriptions'] = { unsubscribe: jest.fn() } as unknown as Subscription;
    component['browser'] = { close: jest.fn() } as unknown as InAppBrowserObject;

    component['clearSubscriptions']();

    expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
    expect(component['browser'].close).toHaveBeenCalled();
  });
  it('should subscribe to cachedInstitutionInfo$ and initialize InAppBrowser', () => {
    const institutionInfo = { id: 'test' } as Institution;
    const cachedInstitutionInfo$ = of(institutionInfo);
    jest.spyOn(_institutionFacadeService.cachedInstitutionInfo$, 'pipe').mockReturnValue(cachedInstitutionInfo$);
    const initializeInAppBrowserSpy = jest.spyOn(component, 'initializeInAppBrowser');
    const addSpy = jest.spyOn((component as any).subscriptions, 'add');

    component.loadLoginContent();

    expect(initializeInAppBrowserSpy).toHaveBeenCalledWith(institutionInfo);
    expect(addSpy).toHaveBeenCalled();
  });
  it('should parse session ID from URL', () => {
    const urlString = 'http://example.com/mobileapp_login_validator.php?session_id=test';
    const showModalSpy = jest.spyOn(component as any, 'showModal');

    component['getAuthSessionFromUrl'](urlString);

    expect(component['sessionId']).toBe('test');
    expect(showModalSpy).not.toHaveBeenCalled();
  });
  it('should handle post-authentication PIN_SET', async () => {
    const loginState = LoginState.PIN_SET;
    jest.spyOn(_sessionFacadeService, 'determinePostLoginState').mockResolvedValue(loginState);
    const pinLoginSetupSpy = jest.spyOn(_identityFacadeService, 'pinLoginSetup');

    await component['handlePostAuthentication']();

    expect(pinLoginSetupSpy).toHaveBeenCalledWith(false);
  });
  it('should handle post-authentication BIOMETRIC_SET', async () => {
    const loginState = LoginState.BIOMETRIC_SET;
    jest.spyOn(_sessionFacadeService, 'determinePostLoginState').mockResolvedValue(loginState);
    const supportedBiometricType = 'FaceID';
    jest.spyOn(_identityFacadeService, 'getAvailableBiometricHardware').mockResolvedValue(supportedBiometricType);
    const configureBiometricsConfigSpy = jest.spyOn(component as any, 'configureBiometricsConfig');
    const navigateSpy = jest.spyOn(component as any, 'navigate');

    await component['handlePostAuthentication']();

    expect(configureBiometricsConfigSpy).toHaveBeenCalledWith(supportedBiometricType);
    expect(navigateSpy).toHaveBeenCalled();
  });
  it('should handle post-authentication DONE', async () => {
    const loginState = LoginState.DONE;
    jest.spyOn(_sessionFacadeService, 'determinePostLoginState').mockResolvedValue(loginState);
    const navigateToDashboardSpy = jest.spyOn(component as any, 'navigateToDashboard');

    await component['handlePostAuthentication']();

    expect(navigateToDashboardSpy).toHaveBeenCalled();
  });
  it('should configure biometrics config for fingerprint', () => {
    const supportedBiometricType = ['fingerprint'];

    const result = component['configureBiometricsConfig'](supportedBiometricType);

    expect(result).toEqual({ type: 'fingerprint', name: 'Fingerprint' });
  });

  it('should configure biometrics config for face', () => {
    const supportedBiometricType = ['face'];

    const result = component['configureBiometricsConfig'](supportedBiometricType);

    expect(result).toEqual({ type: 'face', name: 'Face ID' });
  });

  it('should configure biometrics config for iris', () => {
    const supportedBiometricType = ['iris'];

    const result = component['configureBiometricsConfig'](supportedBiometricType);

    expect(result).toEqual({ type: 'iris', name: 'Iris' });
  });

  it('should create and present a modal', async () => {
    const title = 'Test Title';
    const message = 'Test Message';
    const modal = {
      onDidDismiss: jest.fn().mockResolvedValue({ role: BUTTON_TYPE.CLOSE }),
      present: jest.fn(),
    };
    jest.spyOn(_popoverCtrl, 'create').mockResolvedValue(modal as any);
    const navigateSpy = jest.spyOn(component as any, 'navigate');
    const loadLoginContentSpy = jest.spyOn(component, 'loadLoginContent');

    await component['showModal'](title, message);

    expect(_popoverCtrl.create).toHaveBeenCalledWith({
      cssClass: 'sc-popover',
      component: StGlobalPopoverComponent,
      componentProps: {
        data: {
          type: PopupTypes.RETRY,
          title,
          message,
          buttons: [{ ...buttons.RETRY, label: 'RETRY' }],
          closeBtn: true,
        },
      },
      animated: false,
      backdropDismiss: false,
    });
    expect(modal.present).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.entry]);
    expect(loadLoginContentSpy).not.toHaveBeenCalled();
  });

  it('should handle RETRY button type', async () => {
    const title = 'Test Title';
    const message = 'Test Message';
    const modal = {
      onDidDismiss: jest.fn().mockResolvedValue({ role: BUTTON_TYPE.RETRY }),
      present: jest.fn(),
    };
    jest.spyOn(_popoverCtrl, 'create').mockResolvedValue(modal as any);
    const loadLoginContentSpy = jest.spyOn(component, 'loadLoginContent');
  
    await component['showModal'](title, message);
  
    expect(loadLoginContentSpy).toHaveBeenCalled();
  });
  it('should navigate to anonymous entry when modal is dismissed without data or role', async () => {
    const title = 'Test Title';
    const message = 'Test Message';
    const modal = {
      onDidDismiss: jest.fn().mockResolvedValue(null),
      present: jest.fn(),
    };
    jest.spyOn(_popoverCtrl, 'create').mockResolvedValue(modal as any);
    const navigateSpy = jest.spyOn(component as any, 'navigate');
    const loadLoginContentSpy = jest.spyOn(component, 'loadLoginContent');
  
    await component['showModal'](title, message);
  
    expect(navigateSpy).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.entry]);
    expect(loadLoginContentSpy).not.toHaveBeenCalled();
  });
});
