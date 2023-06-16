import { TestBed } from '@angular/core/testing';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantService } from '@sections/ordering';
import { CommonService } from '@shared/services/common.service';
import { CheckinSuccessResolver } from './check-in-success-resolver.component';

describe('CheckinSuccessResolver', () => {
  let service: CheckinSuccessResolver;

  beforeEach(() => {
    const loadingServiceStub = () => ({ closeSpinner: () => ({}) });
    const merchantServiceStub = () => ({ getRecentOrders: () => ({}) });
    const commonServiceStub = () => ({
      loadContentString: checkinSuccess => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        CheckinSuccessResolver,
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: CommonService, useFactory: commonServiceStub }
      ]
    });
    service = TestBed.inject(CheckinSuccessResolver);
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
      const commonServiceStub: CommonService = TestBed.inject(CommonService);
     jest.spyOn(loadingServiceStub, 'closeSpinner');
     jest.spyOn(merchantServiceStub, 'getRecentOrders');
     jest.spyOn(commonServiceStub, 'loadContentString');
      service.resolve();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(merchantServiceStub.getRecentOrders).toHaveBeenCalled();
      expect(commonServiceStub.loadContentString).toHaveBeenCalled();
    });
  });
});
