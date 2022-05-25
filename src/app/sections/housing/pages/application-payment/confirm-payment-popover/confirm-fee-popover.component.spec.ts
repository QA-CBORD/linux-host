import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPaymentPopover } from './confirm-fee-popover.component';

describe('ConfirmPaymentPopover', () => {
  let component: ConfirmPaymentPopover;
  let fixture: ComponentFixture<ConfirmPaymentPopover>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmPaymentPopover],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPaymentPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
