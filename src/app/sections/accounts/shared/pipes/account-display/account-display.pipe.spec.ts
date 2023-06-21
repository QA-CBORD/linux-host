import { TestBed } from '@angular/core/testing';
import { CreditCardTypePipe } from '../credit-card-type';
import { AccountDisplayPipe } from './account-display.pipe';

describe('AccountDisplayPipe', () => {
  let pipe: AccountDisplayPipe;

  beforeEach(() => {
    const creditCardTypePipeStub = () => ({ transform: accountTender => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AccountDisplayPipe,
        { provide: CreditCardTypePipe, useFactory: creditCardTypePipeStub }
      ]
    });
    pipe = TestBed.inject(AccountDisplayPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
