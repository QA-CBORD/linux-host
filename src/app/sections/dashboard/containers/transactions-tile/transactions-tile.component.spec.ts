import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { TransactionsTileComponent } from './transactions-tile.component';

describe('TransactionsTileComponent', () => {
  let component: TransactionsTileComponent;
  let fixture: ComponentFixture<TransactionsTileComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const transactionServiceStub = () => ({
      getRecentTransactions: (arg, arg1, transactionsAmount) => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TransactionsTileComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: TransactionService, useFactory: transactionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(TransactionsTileComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`transactions has default value`, () => {
    expect(component.transactions).toEqual([]);
  });

  it(`transactionsAmount has default value`, () => {
    expect(component.transactionsAmount).toEqual(3);
  });

  it(`skeletonArray has default value`, () => {
    expect(component.skeletonArray).toEqual([]);
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'getRecentTransactions');
      component.ngOnInit();
      expect(component.getRecentTransactions).toHaveBeenCalled();
    });
  });

  describe('getRecentTransactions', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const transactionServiceStub: TransactionService = fixture.debugElement.injector.get(
        TransactionService
      );
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
     jest.spyOn(transactionServiceStub, 'getRecentTransactions');
      component.getRecentTransactions();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(transactionServiceStub.getRecentTransactions).toHaveBeenCalled();
    });
  });
});
