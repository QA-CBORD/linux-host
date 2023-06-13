import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderAddressItemComponent } from './order-address-item.component';

describe('OrderAddressItemComponent', () => {
  let component: OrderAddressItemComponent;
  let fixture: ComponentFixture<OrderAddressItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrderAddressItemComponent]
    });
    fixture = TestBed.createComponent(OrderAddressItemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`iconNameDefault has default value`, () => {
    expect(component.iconNameDefault).toEqual(`star-outline.svg`);
  });

  it(`iconNameSelected has default value`, () => {
    expect(component.iconNameSelected).toEqual(`star-filled.svg`);
  });

  it(`isDefault has default value`, () => {
    expect(component.isDefault).toEqual(false);
  });
});
