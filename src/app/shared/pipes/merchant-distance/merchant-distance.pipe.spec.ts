import { TestBed } from '@angular/core/testing';
import { MerchantDistancePipe } from './merchant-distance.pipe';

describe('MerchantDistancePipe', () => {
  let pipe: MerchantDistancePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MerchantDistancePipe] });
    pipe = TestBed.inject(MerchantDistancePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    expect(pipe.transform(value)).toEqual('Y');
  });
});
