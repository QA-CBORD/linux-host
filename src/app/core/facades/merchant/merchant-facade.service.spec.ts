import { TestBed } from '@angular/core/testing';
import { MerchantApiService } from '@core/service/merchant-api-service/merchant-api.service';
import { AuthFacadeService } from '../auth/auth.facade.service';
import { MerchantSearchOptions } from '@sections/ordering/utils/merchant-search-options';
import { MerchantInfo } from '@sections/ordering/shared/models/merchant-info.model';
import { MerchantFacadeService } from './merchant-facade.service';

describe('MerchantFacadeService', () => {
  let service: MerchantFacadeService;

  beforeEach(() => {
    const merchantApiServiceStub = () => ({
      getMerchants: options => ({}),
      removeFavoriteMerchant: merchantId => ({}),
      addFavoriteMerchant: merchantId => ({}),
      getFavoriteMerchants: () => ({}),
      getMenuMerchants: options => ({ pipe: () => ({}) })
    });
    const authFacadeServiceStub = () => ({
      isGuestUser: () => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        MerchantFacadeService,
        { provide: MerchantApiService, useFactory: merchantApiServiceStub },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub }
      ]
    });
    service = TestBed.inject(MerchantFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchFavoriteMerchants', () => {
    it('makes expected calls', () => {
      const merchantApiServiceStub: MerchantApiService = TestBed.inject(
        MerchantApiService
      );
     jest.spyOn(merchantApiServiceStub, 'getFavoriteMerchants');
      service.fetchFavoriteMerchants();
      expect(merchantApiServiceStub.getFavoriteMerchants).toHaveBeenCalled();
    });
  });
});
