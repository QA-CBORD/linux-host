import { TestBed } from '@angular/core/testing';
import { LoadingService } from '@core/service/loading/loading.service';
import { CartService } from '@sections/ordering';
import { MerchantService } from '@sections/ordering';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { CartResolver } from './cart.resolver';

describe('CartResolver', () => {
  let service: CartResolver;

  beforeEach(() => {
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const cartServiceStub = () => ({ merchant$: { pipe: () => ({}) } });
    const merchantServiceStub = () => ({
      getMerchantPaymentAccounts: id => ({})
    });
    const settingsFacadeServiceStub = () => ({
      getSettings: requiredSettings => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        CartResolver,
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(CartResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      const merchantServiceStub: MerchantService = TestBed.inject(
        MerchantService
      );
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(
        merchantServiceStub,
        'getMerchantPaymentAccounts'
      ).and.callThrough();
      spyOn(settingsFacadeServiceStub, 'getSettings').and.callThrough();
      service.resolve();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(merchantServiceStub.getMerchantPaymentAccounts).toHaveBeenCalled();
      expect(settingsFacadeServiceStub.getSettings).toHaveBeenCalled();
    });
  });
});
