import { TransactionUnitsPipe } from './transaction-units.pipe';

describe('TransactionUnitsPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionUnitsPipe(null);
    expect(pipe).toBeTruthy();
  });
});
