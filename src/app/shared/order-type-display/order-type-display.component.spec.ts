import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeDisplayComponent } from './order-type-display.component';
import { TranslateService } from '@ngx-translate/core';
import { MerchantInfo } from '@sections/ordering';

describe('OrderTypeDisplayComponent', () => {
  let component: OrderTypeDisplayComponent;
  let fixture: ComponentFixture<OrderTypeDisplayComponent>;
  const _translateService = {
    instant: jest.fn(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTypeDisplayComponent],
      providers: [{ provide: TranslateService, useValue: _translateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTypeDisplayComponent);
    component = fixture.componentInstance;
    component.merchant = { orderTypes: null } as MerchantInfo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
