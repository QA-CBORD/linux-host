import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddresses.ModalComponent } from './delivery-addresses.modal.component';

describe('DeliveryAddresses.ModalComponent', () => {
  let component: DeliveryAddresses.ModalComponent;
  let fixture: ComponentFixture<DeliveryAddresses.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryAddresses.ModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAddresses.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
