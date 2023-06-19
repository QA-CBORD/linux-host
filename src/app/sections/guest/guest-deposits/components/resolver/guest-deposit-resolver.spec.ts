import { TestBed } from '@angular/core/testing';
import { LoadingService } from '@core/service/loading/loading.service';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { CommonService } from '@shared/services/common.service';
import { GuestDepositResolver } from './guest-deposit-resolver';

describe('GuestDepositResolver', () => {
  let service: GuestDepositResolver;

  beforeEach(() => {
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const guestDepositsServiceStub = () => ({
      getRecipientList: () => ({ pipe: () => ({}) })
    });
    const commonServiceStub = () => ({
      loadContentString: identifyRecipient => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        GuestDepositResolver,
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: GuestDepositsService, useFactory: guestDepositsServiceStub },
        { provide: CommonService, useFactory: commonServiceStub }
      ]
    });
    service = TestBed.inject(GuestDepositResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      const guestDepositsServiceStub: GuestDepositsService = TestBed.inject(
        GuestDepositsService
      );
      const commonServiceStub: CommonService = TestBed.inject(CommonService);
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(guestDepositsServiceStub, 'getRecipientList');
     jest.spyOn(commonServiceStub, 'loadContentString');
      service.resolve();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(guestDepositsServiceStub.getRecipientList).toHaveBeenCalled();
      expect(commonServiceStub.loadContentString).toHaveBeenCalled();
    });
  });
});
