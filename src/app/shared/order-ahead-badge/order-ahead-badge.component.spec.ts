import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAheadBadgeComponent } from './order-ahead-badge.component';

describe('OrderAheadBadgeComponent', () => {
  let component: OrderAheadBadgeComponent;
  let fixture: ComponentFixture<OrderAheadBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAheadBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAheadBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.merchant = null;
    expect(component).toBeTruthy();
  });
});
