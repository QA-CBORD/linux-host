import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastService } from '@core/service/toast/toast.service';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { DateUtilObject } from '@sections/accounts/shared/ui-components/filter/date-util';
import { HousingTransactionsOnlyComponent } from './housing-transactions-only.component';

describe('HousingTransactionsOnlyComponent', () => {
  let component: HousingTransactionsOnlyComponent;
  let fixture: ComponentFixture<HousingTransactionsOnlyComponent>;

  beforeEach(() => {
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const accountServiceStub = () => ({
      getUserSettings: requiredSettings => ({}),
      getUserAccounts: () => ({})
    });
    const transactionServiceStub = () => ({
      getNextTransactionsByAccountId: aLL_ACCOUNTS => ({
        pipe: () => ({ subscribe: () => ({}) })
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HousingTransactionsOnlyComponent],
      providers: [
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: TransactionService, useFactory: transactionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(HousingTransactionsOnlyComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('getNextTransactionPackage', () => {
    it('makes expected calls', () => {
      const transactionServiceStub: TransactionService = fixture.debugElement.injector.get(
        TransactionService
      );
      jest.spyOn(
        transactionServiceStub,
        'getNextTransactionsByAccountId'
      );
      component.getNextTransactionPackage();
      expect(
        transactionServiceStub.getNextTransactionsByAccountId
      ).toHaveBeenCalled();
    });
  });
});
