import { TestBed } from '@angular/core/testing';
import { AccountService } from '../services/accounts.service';
import { TransactionService } from '../services/transaction.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { AccountsPageResolver } from './accounts-page.resolver';

describe('AccountsPageResolver', () => {
  let service: AccountsPageResolver;

  beforeEach(() => {
    const accountServiceStub = () => ({
      initContentStringsList: () => ({}),
      getUserAccounts: () => ({}),
      getUserSettings: requiredSettings => ({ pipe: () => ({}) })
    });
    const transactionServiceStub = () => ({
      initContentStringsList: () => ({}),
      getRecentTransactions: (aLL_ACCOUNTS, object, number) => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        AccountsPageResolver,
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: TransactionService, useFactory: transactionServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    service = TestBed.inject(AccountsPageResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const accountServiceStub: AccountService = TestBed.inject(AccountService);
      const transactionServiceStub: TransactionService = TestBed.inject(
        TransactionService
      );
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      spyOn(accountServiceStub, 'initContentStringsList').and.callThrough();
      spyOn(accountServiceStub, 'getUserAccounts').and.callThrough();
      spyOn(accountServiceStub, 'getUserSettings').and.callThrough();
      spyOn(transactionServiceStub, 'initContentStringsList').and.callThrough();
      spyOn(transactionServiceStub, 'getRecentTransactions').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      service.resolve();
      expect(accountServiceStub.initContentStringsList).toHaveBeenCalled();
      expect(accountServiceStub.getUserAccounts).toHaveBeenCalled();
      expect(accountServiceStub.getUserSettings).toHaveBeenCalled();
      expect(transactionServiceStub.initContentStringsList).toHaveBeenCalled();
      expect(transactionServiceStub.getRecentTransactions).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });
});
