import { TestBed } from '@angular/core/testing';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [OrderByPipe] });
    pipe = TestBed.inject(OrderByPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
