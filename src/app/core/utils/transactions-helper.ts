import { TransactionHistory } from "@core/model/transactions/transaction-history.model";

export function cleanDuplicateTransactions(arr: TransactionHistory[]): TransactionHistory[] {
  const transactionMap = new Map<string, TransactionHistory>();
  arr.forEach(transaction => transactionMap.set(transaction.transactionKey, transaction));
  return Array.from(transactionMap.values());
}
