import { TestBed } from '@angular/core/testing';
import { CurrencyPipe } from '@angular/common';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { PriceUnitsResolverPipe } from './price-units-resolver.pipe';
import { TranslateService } from '@ngx-translate/core';

describe('PriceUnitsResolverPipe', () => {
  let pipe: PriceUnitsResolverPipe;
  let translateService = {
    instant: jest.fn(),
  };
  beforeEach(() => {
    const currencyPipeStub = () => ({ transform: value => ({}) });
    TestBed.configureTestingModule({
      providers: [
        PriceUnitsResolverPipe,
        { provide: CurrencyPipe, useFactory: currencyPipeStub },
        { provide: TranslateService, useValue: translateService },
      ],
    });
    pipe = TestBed.inject(PriceUnitsResolverPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform method should return empty string if ignoreZeros is true and value is 0', () => {
    const value = 0;
    const ignoreZeros = true;
    const result = pipe.transform(value, false, ignoreZeros);
    expect(result).toBe('');
  });
});
