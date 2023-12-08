import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { BUTTON_TYPE, buttons } from '@core/utils/buttons.config';
import { IonicModule, PopoverController } from '@ionic/angular';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { of } from 'rxjs';
import { ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { ExternalLoginPage } from './external-login.page';

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
  cachedInstitutionInfo$: { pipe: jest.fn(() => of(true)) },
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
const _sessionFacadeService = {};
const _identityFacadeService = {};
const _settingsFacadeService = {
  getSetting: jest.fn(() => of({ value: '{"native-header-bg":"#000"}' } as SettingInfo)),
};
const _router = {
  navigate: jest.fn(),
};

describe('ExternalLoginPage', () => {
  let component: ExternalLoginPage;
  let fixture: ComponentFixture<ExternalLoginPage>;

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  // TODO: Fix test
  // it('should show modal with proper configuration and handle modal dismissal', fakeAsync(() => {
  //   const popoverConfig: PopoverConfig<string> = {
  //     type: PopupTypes.RETRY,
  //     title: 'Title',
  //     message: 'Message',
  //     buttons: [{ ...buttons.RETRY, label: 'RETRY' }],
  //     closeBtn: true,
  //   };

  //   component['showModal'](popoverConfig.title as string, popoverConfig.message as string);

  //   tick();
  //   fixture.detectChanges();

  //   const navigateSpy = jest.spyOn(_router, 'navigate');
  //   expect(navigateSpy).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.institutions], { replaceUrl: true });
  // }));
});
