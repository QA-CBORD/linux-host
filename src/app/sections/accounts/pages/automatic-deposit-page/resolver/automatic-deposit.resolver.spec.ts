import { TestBed } from '@angular/core/testing';
import { AutoDepositService } from '../service/auto-deposit.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { AutomaticDepositResolver } from './automatic-deposit.resolver';

describe('AutomaticDepositResolver', () => {
  let service: AutomaticDepositResolver;

  beforeEach(() => {
    const autoDepositServiceStub = () => ({
      getUserAutoDepositInfo: () => ({})
    });
    const depositServiceStub = () => ({ getUserAccounts: () => ({}) });
    const loadingServiceStub = () => ({ closeSpinner: { bind: () => ({}) } });
    TestBed.configureTestingModule({
      providers: [
        AutomaticDepositResolver,
        { provide: AutoDepositService, useFactory: autoDepositServiceStub },
        { provide: DepositService, useFactory: depositServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    service = TestBed.inject(AutomaticDepositResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const autoDepositServiceStub: AutoDepositService = TestBed.inject(
        AutoDepositService
      );
      const depositServiceStub: DepositService = TestBed.inject(DepositService);
      spyOn(autoDepositServiceStub, 'getUserAutoDepositInfo').and.callThrough();
      spyOn(depositServiceStub, 'getUserAccounts').and.callThrough();
      service.resolve();
      expect(autoDepositServiceStub.getUserAutoDepositInfo).toHaveBeenCalled();
      expect(depositServiceStub.getUserAccounts).toHaveBeenCalled();
    });
  });
});
