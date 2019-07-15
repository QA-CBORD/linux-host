export interface QueryTransactionHistoryCriteria {
  readonly maxReturn: number;
  readonly startingReturnRow: number | null;
  readonly institutionId?: string | null;
  readonly userId?: string | null;
  readonly accountId?: string | null; // account identifier, might be card number, or vault key
  readonly startDate?: string | null;
  readonly endDate?: string | null;
}
