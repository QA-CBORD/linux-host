import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { CustomCurrencyPipe } from './custom-currency.pipe';

describe('CustomCurrencyPipe', () => {
  let pipe: CustomCurrencyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CustomCurrencyPipe] });
    pipe = TestBed.inject(CustomCurrencyPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
