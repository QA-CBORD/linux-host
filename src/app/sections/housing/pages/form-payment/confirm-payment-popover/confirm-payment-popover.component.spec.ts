import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmPaymentPopover } from './confirm-payment-popover.component';
import { TransactionUnitsPipeModule } from '@shared/pipes/transaction-units';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConfirmPaymentPopover', () => {
  let component: ConfirmPaymentPopover;
  let fixture: ComponentFixture<ConfirmPaymentPopover>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfirmPaymentPopover],
      imports: [TransactionUnitsPipeModule, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmPaymentPopover);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`showDisclaimer has default value`, () => {
    expect(component.showDisclaimer).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'initPopover');
      component.ngOnInit();
      expect(component.initPopover).toHaveBeenCalled();
    });
  });
});
