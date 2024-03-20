import { TransactionHistory } from '@core/model/transactions/transaction-history.model';
import { cleanDuplicateTransactions } from './transactions-helper';

describe('cleanDuplicateTransactions', () => {
  it('should remove duplicate transactions', () => {
    const transactions: TransactionHistory[] = [
      { transactionKey: '1' },
      { transactionKey: '2' },
      { transactionKey: '1' },
      { transactionKey: '3' },
      { transactionKey: '2' },
    ] as TransactionHistory[];

    const result = cleanDuplicateTransactions(transactions);

    expect(result).toHaveLength(3);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ transactionKey: '1' }),
        expect.objectContaining({ transactionKey: '2' }),
        expect.objectContaining({ transactionKey: '3' }),
      ])
    );
  });
});
