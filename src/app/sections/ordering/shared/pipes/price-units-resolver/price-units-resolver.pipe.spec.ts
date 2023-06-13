import { TestBed } from '@angular/core/testing';
import { CurrencyPipe } from '@angular/common';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { PriceUnitsResolverPipe } from './price-units-resolver.pipe';

describe('PriceUnitsResolverPipe', () => {
  let pipe: PriceUnitsResolverPipe;

  beforeEach(() => {
    const currencyPipeStub = () => ({ transform: value => ({}) });
    const orderingServiceStub = () => ({
      getContentStringByName: labelMealSuffix => ({
        pipe: () => ({ toPromise: () => ({}) })
      })
    });
    TestBed.configureTestingModule({
      providers: [
        PriceUnitsResolverPipe,
        { provide: CurrencyPipe, useFactory: currencyPipeStub },
        { provide: OrderingService, useFactory: orderingServiceStub }
      ]
    });
    pipe = TestBed.inject(PriceUnitsResolverPipe);
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
