export interface QueryTransactionHistoryCriteriaDateRange {
  readonly institutionId?: string | null;
  readonly userId?: string | null;
  readonly accountId?: string | null; // account identifier, might be card number, or vault key
  readonly newestDate?: string | null;
  readonly oldestDate?: string | null;
  readonly maxReturnMostRecent?: number | null;
}
