import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddressItemComponent } from './order-address-item.component';

describe('OrderAddressItemComponent', () => {
  let component: OrderAddressItemComponent;
  let fixture: ComponentFixture<OrderAddressItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddressItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
