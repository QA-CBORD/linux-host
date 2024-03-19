import { TransactionHistory } from "../transactions/transaction-history.model";

export interface TransactionResponse {
  returnCapped: boolean;
  totalCount: number;
  transactions: TransactionHistory[];
}
