import { TransactionHistory } from '@sections/accounts/models/transaction-history.model';

export interface TransactionResponse {
  returnCapped: boolean;
  totalCount: number;
  transactions: TransactionHistory[];
}
