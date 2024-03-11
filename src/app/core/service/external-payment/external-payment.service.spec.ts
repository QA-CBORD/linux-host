import { TestBed } from '@angular/core/testing';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { ApplePay } from '@core/model/add-funds/applepay-response.model';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { ToastService } from '../toast/toast.service';
import { ExternalPaymentService } from './external-payment.service';
import { of } from 'rxjs';

describe('ExternalPaymentService', () => {
  let service: ExternalPaymentService;

  beforeEach(() => {
    const inAppBrowserStub = {
      create: jest.fn().mockResolvedValue({}),
    };
    const authFacadeServiceStub = {
      getAuthenticationToken$: jest.fn().mockReturnValue(of({})),
    };
    const environmentFacadeServiceStub = () => ({ getSitesURL: () => ({}) });
    const institutionFacadeServiceStub = {
      cachedInstitutionInfo$: of({}),
    };
    const accessibilityServiceStub = () => ({
      hideElementsByClassName: () => ({}),
    });
    const toastServiceStub = () => ({ showError: message => ({}) });
    TestBed.configureTestingModule({
      providers: [
        ExternalPaymentService,
        { provide: InAppBrowser, useValue: inAppBrowserStub },
        { provide: AuthFacadeService, useValue: authFacadeServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub,
        },
        {
          provide: InstitutionFacadeService,
          useValue: institutionFacadeServiceStub,
        },
        { provide: AccessibilityService, useFactory: accessibilityServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
      ],
    });
    service = TestBed.inject(ExternalPaymentService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('addUSAePayCreditCard', () => {
    it('makes expected calls', async () => {
      jest.spyOn(service as any, 'browserListeners').mockImplementation((browser, resolve: any, reject) => {
        resolve({ success: true });
      });
      const result = await service.addUSAePayCreditCard();
      expect(result).toBeTruthy();
    });
  });

  it('invokes payWithApplePay', async () => {
    jest.spyOn(service as any, 'openApplePayPage').mockResolvedValue({});
    jest.spyOn(service as any, 'handleApplePayResponse').mockImplementation((resolve: any, reject) => {
      resolve({ success: true });
    });
    const result = await service.payWithApplePay({} as any, {} as any);
    expect(result).toBeTruthy();
  });
});
