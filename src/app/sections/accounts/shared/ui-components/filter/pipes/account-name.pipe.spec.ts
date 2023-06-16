import { TestBed } from '@angular/core/testing';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { AccountNamePipe } from './account-name.pipe';

describe('AccountNamePipe', () => {
  let pipe: AccountNamePipe;

  beforeEach(() => {
    const accountServiceStub = () => ({
      getAccountById: value => ({ pipe: () => ({}) })
    });
    const transactionServiceStub = () => ({
      getContentStrings: transactionStringNames => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        AccountNamePipe,
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: TransactionService, useFactory: transactionServiceStub }
      ]
    });
   jest.spyOn(AccountNamePipe.prototype, 'setContentStrings');
    pipe = TestBed.inject(AccountNamePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    expect(pipe.transform(value)).toEqual('Y');
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(AccountNamePipe.prototype.setContentStrings).toHaveBeenCalled();
    });
  });

  describe('setContentStrings', () => {
    it('makes expected calls', () => {
      const transactionServiceStub: TransactionService = TestBed.inject(
        TransactionService
      );
     jest.spyOn(transactionServiceStub, 'getContentStrings');
      (<jasmine.Spy>pipe.setContentStrings);
      pipe.setContentStrings();
      expect(transactionServiceStub.getContentStrings).toHaveBeenCalled();
    });
  });
});
