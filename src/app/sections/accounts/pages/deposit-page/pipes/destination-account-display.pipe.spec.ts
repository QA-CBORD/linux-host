import { TestBed } from '@angular/core/testing';
import { UserAccount } from '@core/model/account/account.model';
import { TransactionUnitsPipe } from '@shared/pipes/transaction-units/transaction-units.pipe';
import { DestinationAccountDisplayPipe } from './destination-account-display.pipe';

describe('DestinationAccountDisplayPipe', () => {
  let pipe: DestinationAccountDisplayPipe;

  beforeEach(() => {
    const transactionUnitsPipeMock = {
      transform: jest.fn().mockReturnValue({})
    };
    TestBed.configureTestingModule({
      providers: [
        DestinationAccountDisplayPipe,
        { provide: TransactionUnitsPipe, useValue: transactionUnitsPipeMock }
      ]
    });
    pipe = TestBed.inject(DestinationAccountDisplayPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string if account is falsy', () => {
    expect(pipe.transform(undefined)).toEqual('');
    expect(pipe.transform(null)).toEqual('');
    expect(pipe.transform('')).toEqual('');
  });

  it('should return the account string if the account is a string', () => {
    const account = 'AccountName';
    expect(pipe.transform(account)).toEqual(account);
  });

  it('should return the account display name only if hideBalance is true', () => {
    const account: UserAccount = {
      accountDisplayName: 'Account Name',
      balance: 1000,
      accountType: 1,
    } as UserAccount;

    const result = pipe.transform(account, true);
    expect(result).toEqual(account.accountDisplayName);
  });

  it('should return an empty value', () => {
    const account = null;
    const result = pipe.transform(account, true);
    expect(result).toBe('');
  });

  it('should return hide the balance', () => {
    const account: UserAccount = {
      accountDisplayName: 'Account Name',
      balance: 1000,
      accountType: 1,
    } as UserAccount;
    const result = pipe.transform(account, false);
    expect(result).toMatch(/Account Name\s[(]\[[\w\s]+\][)]/);
  });
});
