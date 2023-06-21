import { TestBed } from '@angular/core/testing';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { ApplePay } from '@core/model/add-funds/applepay-response.model';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { ToastService } from '../toast/toast.service';
import { ExternalPaymentService } from './external-payment.service';

describe('ExternalPaymentService', () => {
  let service: ExternalPaymentService;

  beforeEach(() => {
    const inAppBrowserStub = () => ({ create: (url, target, options) => ({}) });
    const authFacadeServiceStub = () => ({
      getAuthenticationToken$: () => ({ pipe: () => ({}) })
    });
    const environmentFacadeServiceStub = () => ({ getSitesURL: () => ({}) });
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: { pipe: () => ({}) }
    });
    const accessibilityServiceStub = () => ({
      hideElementsByClassName: () => ({})
    });
    const toastServiceStub = () => ({ showError: message => ({}) });
    TestBed.configureTestingModule({
      providers: [
        ExternalPaymentService,
        { provide: InAppBrowser, useFactory: inAppBrowserStub },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: AccessibilityService, useFactory: accessibilityServiceStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    service = TestBed.inject(ExternalPaymentService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('addUSAePayCreditCard', () => {
    it('makes expected calls', () => {
      const authFacadeServiceStub: AuthFacadeService = TestBed.inject(
        AuthFacadeService
      );
     jest.spyOn(authFacadeServiceStub, 'getAuthenticationToken$');
      service.addUSAePayCreditCard();
      expect(authFacadeServiceStub.getAuthenticationToken$).toHaveBeenCalled();
    });
  });
});
