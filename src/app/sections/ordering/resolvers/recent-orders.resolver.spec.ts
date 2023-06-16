import { TestBed } from '@angular/core/testing';
import { MerchantService } from '@sections/ordering';
import { LoadingService } from '@core/service/loading/loading.service';
import { RecentOrdersResolver } from './recent-orders.resolver';

describe('RecentOrdersResolver', () => {
  let service: RecentOrdersResolver;

  beforeEach(() => {
    const merchantServiceStub = () => ({
      getRecentOrdersPeriod: () => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        RecentOrdersResolver,
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    service = TestBed.inject(RecentOrdersResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const merchantServiceStub: MerchantService = TestBed.inject(
        MerchantService
      );
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
     jest.spyOn(service, 'resolve');
     jest.spyOn(merchantServiceStub, 'getRecentOrdersPeriod');
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
      service.resolve();
      expect(service.resolve).toHaveBeenCalled();
      expect(merchantServiceStub.getRecentOrdersPeriod).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });
});
