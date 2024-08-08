import { TestBed } from '@angular/core/testing';
import { AccountNamePipe } from './account-name.pipe';
import { of } from 'rxjs';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { ALL_ACCOUNTS, CONTENT_STRINGS } from '@sections/accounts/accounts.config';

describe('AccountNamePipe', () => {
  let pipe: AccountNamePipe;
  const transactionServiceStub = {  getContentStrings: jest.fn().mockReturnValue({ [CONTENT_STRINGS.allAccountsLabel]: 'test'}) };
  const accountServiceStub = {
    settings$: of([{
      id: "",
      name: "",
      domain: "",
      category: "",
      contentMediaType: 0,
      value: "",
      description: ""
    }]),
    getAccountById: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AccountNamePipe, { provide: TransactionService, useValue: transactionServiceStub }, { provide: AccountService, useValue: accountServiceStub }] });
    pipe = TestBed.inject(AccountNamePipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the value to an observable of account name', () => {
    const expectedName = { accountDisplayName: 'My Account' } as any;

    jest.spyOn(accountServiceStub, 'getAccountById').mockReturnValue(of(expectedName));

    pipe.transform(ALL_ACCOUNTS).subscribe((name) => {
      expect(name).not.toBe(expectedName);
    });
  });

  it('should return an empty string if the value is not provided', () => {
    const value = null;

    pipe.transform(value).subscribe((name) => {
      expect(name).toBe('');
    });
  });
});