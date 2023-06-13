import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { TransactionsResolver } from './transactions.resolver';

describe('TransactionsResolver', () => {
  let service: TransactionsResolver;

  beforeEach(() => {
    const transactionServiceStub = () => ({
      initContentStringsList: () => ({}),
      getRecentTransactions: (id, object, number) => ({}),
      clearTransactionHistory: () => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const accountServiceStub = () => ({
      initContentStringsList: () => ({}),
      getUserAccounts: () => ({}),
      getUserSettings: requiredSettings => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        TransactionsResolver,
        { provide: TransactionService, useFactory: transactionServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: AccountService, useFactory: accountServiceStub }
      ]
    });
    service = TestBed.inject(TransactionsResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
      const transactionServiceStub: TransactionService = TestBed.inject(
        TransactionService
      );
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      const accountServiceStub: AccountService = TestBed.inject(AccountService);
      spyOn(transactionServiceStub, 'initContentStringsList').and.callThrough();
      spyOn(transactionServiceStub, 'getRecentTransactions').and.callThrough();
      spyOn(
        transactionServiceStub,
        'clearTransactionHistory'
      ).and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(accountServiceStub, 'initContentStringsList').and.callThrough();
      spyOn(accountServiceStub, 'getUserAccounts').and.callThrough();
      spyOn(accountServiceStub, 'getUserSettings').and.callThrough();
      service.resolve(activatedRouteSnapshotStub);
      expect(transactionServiceStub.initContentStringsList).toHaveBeenCalled();
      expect(transactionServiceStub.getRecentTransactions).toHaveBeenCalled();
      expect(transactionServiceStub.clearTransactionHistory).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(accountServiceStub.initContentStringsList).toHaveBeenCalled();
      expect(accountServiceStub.getUserAccounts).toHaveBeenCalled();
      expect(accountServiceStub.getUserSettings).toHaveBeenCalled();
    });
  });
});
