import { TestBed } from '@angular/core/testing';
import { MerchantInfo } from '@sections/ordering';
import { OrderTypePipe } from './order-type.pipe';

describe('OrderTypePipe', () => {
  let pipe: OrderTypePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [OrderTypePipe] });
    pipe = TestBed.inject(OrderTypePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('Y');
  });
});
