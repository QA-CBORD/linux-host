import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AccountDetailsComponent } from './account-details.component';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ snapshot: { params: { id: {} } } });
    const routerStub = () => ({
      getCurrentNavigation: () => ({
        extras: { state: { backButtonText: {} } }
      })
    });
    const transactionServiceStub = () => ({
      transactions$: {},
      getNextTransactionsByAccountId: currentAccountId => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      activeAccountId: {},
      activeTimeRange: { name: {} },
      getContentStrings: transactionStringNames => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AccountDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: TransactionService, useFactory: transactionServiceStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
     jest.spyOn(component, 'setContentStrings');
     jest.spyOn(routerStub, 'getCurrentNavigation');
      component.ngOnInit();
      expect(component.setContentStrings).toHaveBeenCalled();
      expect(routerStub.getCurrentNavigation).toHaveBeenCalled();
    });
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

  describe('setContentStrings', () => {
    it('makes expected calls', () => {
      const transactionServiceStub: TransactionService = fixture.debugElement.injector.get(
        TransactionService
      );
     jest.spyOn(transactionServiceStub, 'getContentStrings');
      component.setContentStrings();
      expect(transactionServiceStub.getContentStrings).toHaveBeenCalled();
    });
  });
});
