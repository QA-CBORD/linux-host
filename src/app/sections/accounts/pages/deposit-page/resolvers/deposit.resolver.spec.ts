import { TestBed } from '@angular/core/testing';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { CommonService } from '@shared/services/common.service';
import { DepositResolver } from './deposit.resolver';

describe('DepositResolver', () => {
  let service: DepositResolver;

  beforeEach(() => {
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const depositServiceStub = () => ({
      getUserAccounts: () => ({}),
      getUserSettings: requiredSettings => ({})
    });
    const commonServiceStub = () => ({
      loadContentString: (deposit, object) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        DepositResolver,
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: DepositService, useFactory: depositServiceStub },
        { provide: CommonService, useFactory: commonServiceStub }
      ]
    });
    service = TestBed.inject(DepositResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      const depositServiceStub: DepositService = TestBed.inject(DepositService);
      const commonServiceStub: CommonService = TestBed.inject(CommonService);
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(depositServiceStub, 'getUserAccounts');
     jest.spyOn(depositServiceStub, 'getUserSettings');
     jest.spyOn(commonServiceStub, 'loadContentString');
      service.resolve();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(depositServiceStub.getUserAccounts).toHaveBeenCalled();
      expect(depositServiceStub.getUserSettings).toHaveBeenCalled();
      expect(commonServiceStub.loadContentString).toHaveBeenCalled();
    });
  });
});
