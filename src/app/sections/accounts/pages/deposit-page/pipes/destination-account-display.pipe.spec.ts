import { TestBed } from '@angular/core/testing';
import { UserAccount } from '@core/model/account/account.model';
import { TransactionUnitsPipe } from '@shared/pipes/transaction-units/transaction-units.pipe';
import { DestinationAccountDisplayPipe } from './destination-account-display.pipe';

describe('DestinationAccountDisplayPipe', () => {
  let pipe: DestinationAccountDisplayPipe;

  beforeEach(() => {
    const transactionUnitsPipeStub = () => ({
      transform: (balance, accountType) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        DestinationAccountDisplayPipe,
        { provide: TransactionUnitsPipe, useFactory: transactionUnitsPipeStub }
      ]
    });
    pipe = TestBed.inject(DestinationAccountDisplayPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
