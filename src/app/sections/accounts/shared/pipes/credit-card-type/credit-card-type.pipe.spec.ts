import { TestBed } from '@angular/core/testing';
import { CreditCardTypePipe } from './credit-card-type.pipe';

describe('CreditCardTypePipe', () => {
  let pipe: CreditCardTypePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CreditCardTypePipe] });
    pipe = TestBed.inject(CreditCardTypePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    TestBed.compileComponents();
    expect(pipe.transform(value)).toBe('Y');
  });
});
