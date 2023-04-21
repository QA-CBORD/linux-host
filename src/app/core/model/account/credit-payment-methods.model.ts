export interface CreditPaymentMethods {
  readonly name: string;
  readonly accountTender: string;
  readonly accountType: number;
  readonly active: boolean;
  readonly icon?: string;
}
