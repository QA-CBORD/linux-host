import { TestBed } from '@angular/core/testing';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ToastService } from '../toast/toast.service';
import { USAePayService } from './usaepayservice.service';

describe('USAePayService', () => {
  let service: USAePayService;

  beforeEach(() => {
    const authFacadeServiceStub = () => ({
      getAuthenticationToken$: () => ({ pipe: () => ({}) })
    });
    const environmentFacadeServiceStub = () => ({ getSitesURL: () => ({}) });
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: { pipe: () => ({}) }
    });
    const inAppBrowserStub = () => ({ create: (url, target, options) => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      providers: [
        USAePayService,
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: InAppBrowser, useFactory: inAppBrowserStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    service = TestBed.inject(USAePayService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('addUSAePayCreditCard', () => {
    it('makes expected calls', () => {
      const authFacadeServiceStub: AuthFacadeService = TestBed.inject(
        AuthFacadeService
      );
      spyOn(authFacadeServiceStub, 'getAuthenticationToken$').and.callThrough();
      service.addUSAePayCreditCard();
      expect(authFacadeServiceStub.getAuthenticationToken$).toHaveBeenCalled();
    });
  });
});
