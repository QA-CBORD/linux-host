import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulPaymentModal } from './payment-modal.component';

describe('SuccessfulPaymentModal', () => {
  let component: SuccessfulPaymentModal;
  let fixture: ComponentFixture<SuccessfulPaymentModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessfulPaymentModal],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulPaymentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
