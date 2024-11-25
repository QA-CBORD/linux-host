import { TestBed } from '@angular/core/testing';
import { OrderItemsSummaryPipe } from './order-items-summary.pipe';

describe('OrderItemsSummaryPipe', () => {
  let pipe: OrderItemsSummaryPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [OrderItemsSummaryPipe] });
    pipe = TestBed.inject(OrderItemsSummaryPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
