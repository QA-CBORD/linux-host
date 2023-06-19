import { TestBed } from '@angular/core/testing';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { ACCOUNT_TYPES } from '@sections/accounts/accounts.config';
import { TransactionUnitsPipe } from './transaction-units.pipe';

describe('TransactionUnitsPipe', () => {
  let pipe: TransactionUnitsPipe;

  beforeEach(() => {
    const accountServiceStub = () => ({ getContentValueByName: name => ({}) });
    TestBed.configureTestingModule({
      providers: [
        TransactionUnitsPipe,
        { provide: AccountService, useFactory: accountServiceStub }
      ]
    });
    pipe = TestBed.inject(TransactionUnitsPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
