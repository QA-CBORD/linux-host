import { CreditCardTypePipe } from './credit-card-type.pipe';

describe('CreditCardTypePipe', () => {
  it('create an instance', () => {
    const pipe = new CreditCardTypePipe();
    expect(pipe).toBeTruthy();
  });
});
