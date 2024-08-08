import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TransactionsComponent]
    });
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have transactions input', () => {
    const transactions = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }] as any;
    component.transactions = transactions;
    fixture.detectChanges();
    expect(component.transactions).toEqual(transactions);
  });

  it('should have dividers input', () => {
    const dividers = true;
    component.dividers = dividers;
    fixture.detectChanges();
    expect(component.dividers).toBe(dividers);
  });

  it('should render transactions', () => {
    const transactions = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }] as any;
    component.transactions = transactions;
    fixture.detectChanges();
    const transactionElements = fixture.nativeElement.querySelectorAll('.transactions__item');
    expect(transactionElements.length).toBe(transactions.length);
  });

  it('should not render transactions when transactions input is empty', () => {
    const transactions = [];
    component.transactions = transactions;
    fixture.detectChanges();
    const transactionElements = fixture.nativeElement.querySelectorAll('.transaction');
    expect(transactionElements.length).toBe(0);
  });
});
