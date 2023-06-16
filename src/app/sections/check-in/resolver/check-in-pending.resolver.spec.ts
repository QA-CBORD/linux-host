import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantService } from '@sections/ordering';
import { CommonService } from '@shared/services/common.service';
import { CheckingServiceFacade } from '../services/check-in-facade.service';
import { CheckinPendingResolver } from './check-in-pending.resolver';

describe('CheckinPendingResolver', () => {
  let service: CheckinPendingResolver;

  beforeEach(() => {
    const userFacadeServiceStub = () => ({ getUserData$: () => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: { bind: () => ({}) }
    });
    const merchantServiceStub = () => ({
      menuMerchants$: {},
      retrievePickupLocations: (storeAddress, arg) => ({ pipe: () => ({}) })
    });
    const commonServiceStub = () => ({ loadContentString: checkin => ({}) });
    const checkingServiceFacadeStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        CheckinPendingResolver,
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        {
          provide: CheckingServiceFacade,
          useFactory: checkingServiceFacadeStub
        }
      ]
    });
    service = TestBed.inject(CheckinPendingResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      const merchantServiceStub: MerchantService = TestBed.inject(
        MerchantService
      );
      const commonServiceStub: CommonService = TestBed.inject(CommonService);
     jest.spyOn(userFacadeServiceStub, 'getUserData$');
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(merchantServiceStub, 'retrievePickupLocations');
     jest.spyOn(commonServiceStub, 'loadContentString');
      service.resolve(activatedRouteSnapshotStub);
      expect(userFacadeServiceStub.getUserData$).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(merchantServiceStub.retrievePickupLocations).toHaveBeenCalled();
      expect(commonServiceStub.loadContentString).toHaveBeenCalled();
    });
  });
});
