export interface TransactionalData {
  sourceAcc: {
    accountTender: string;
    lastFour: string;
  };
  selectedAccount: {
    accountDisplayName: string;
    accountType: number;
  };
  amount: string;
}
