export interface UserAutoDepositSettingInfo {
  readonly userId: string;
  readonly amount: number;
  readonly fromAccountId: string;
  readonly toAccountId: string;
  readonly dayOfMonth: number;
  readonly dayOfWeek: number;
  readonly active: boolean;
  readonly lowBalanceAmount: number;
  readonly lowBalanceTender: string;
  readonly autoDepositType: number;
  readonly autoDepositFailures: number;
}