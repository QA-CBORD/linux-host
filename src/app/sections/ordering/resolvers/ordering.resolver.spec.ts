import { TestBed } from '@angular/core/testing';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { MerchantService } from '../services';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { OrderingResolver } from './ordering.resolver';

describe('OrderingResolver', () => {
  let service: OrderingResolver;

  beforeEach(() => {
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const merchantServiceStub = () => ({
      getMerchantsWithFavoriteInfo: () => ({})
    });
    const contentStringsFacadeServiceStub = () => ({
      fetchContentStrings$: (patronUi, usStates) => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        OrderingResolver,
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(OrderingResolver);
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
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(
        ContentStringsFacadeService
      );
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(
        merchantServiceStub,
        'getMerchantsWithFavoriteInfo'
      ).and.callThrough();
      spyOn(
        contentStringsFacadeServiceStub,
        'fetchContentStrings$'
      ).and.callThrough();
      service.resolve();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(
        merchantServiceStub.getMerchantsWithFavoriteInfo
      ).toHaveBeenCalled();
      expect(
        contentStringsFacadeServiceStub.fetchContentStrings$
      ).toHaveBeenCalled();
    });
  });
});
