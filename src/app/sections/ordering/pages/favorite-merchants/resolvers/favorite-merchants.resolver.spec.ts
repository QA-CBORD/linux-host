import { TestBed } from '@angular/core/testing';
import { MerchantService } from '@sections/ordering';
import { FavoriteMerchantsService } from '../services/favorite-merchants.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerchantsResolver } from './favorite-merchants.resolver';

describe('FavoriteMerchantsResolver', () => {
  let service: FavoriteMerchantsResolver;

  beforeEach(() => {
    const merchantServiceStub = () => ({ menuMerchants$: {} });
    const favoriteMerchantsServiceStub = () => ({
      getFavoriteMerchants: () => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        FavoriteMerchantsResolver,
        { provide: MerchantService, useFactory: merchantServiceStub },
        {
          provide: FavoriteMerchantsService,
          useFactory: favoriteMerchantsServiceStub
        },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    service = TestBed.inject(FavoriteMerchantsResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const favoriteMerchantsServiceStub: FavoriteMerchantsService = TestBed.inject(
        FavoriteMerchantsService
      );
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      spyOn(
        favoriteMerchantsServiceStub,
        'getFavoriteMerchants'
      ).and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      service.resolve();
      expect(
        favoriteMerchantsServiceStub.getFavoriteMerchants
      ).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });
});
