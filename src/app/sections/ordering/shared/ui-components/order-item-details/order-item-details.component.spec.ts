import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceUnitsResolverModule } from '../../pipes/price-units-resolver/price-units-resolver.module';

import { OrderItemDetailsComponent } from './order-item-details.component';

describe('OrderItemDetailsComponent', () => {
  let component: OrderItemDetailsComponent;
  let fixture: ComponentFixture<OrderItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemDetailsComponent],
      imports: [PriceUnitsResolverModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
