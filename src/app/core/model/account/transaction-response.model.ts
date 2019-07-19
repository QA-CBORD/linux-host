import { TransactionHistory } from '../../../pages/accounts/models/transaction-history.model';

export interface TransactionResponse {
  returnCapped: boolean;
  totalCount: number;
  transactions: TransactionHistory[];
}
