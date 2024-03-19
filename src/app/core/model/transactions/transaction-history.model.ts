export interface TransactionHistory {
  readonly transactionId: string;
  readonly transactionKey: string;
  readonly transactionSequence: number;
  readonly transactionType: number;
  readonly amount: number;
  readonly resultingBalance: number;
  readonly postedDate: Date;
  readonly actualDate: string;
  readonly patronId: string;
  readonly planId: string;
  readonly tenderId: string;
  readonly locationId: string;
  readonly locationName: string;
  readonly patronFullName: string;
  readonly accountType: number; // Use AccountType to get constant values
  readonly accountName: string;
  readonly paymentSystemType: number;
}
