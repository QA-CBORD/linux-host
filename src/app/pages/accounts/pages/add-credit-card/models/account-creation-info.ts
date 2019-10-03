export interface AccountCreationInfo {
  readonly accountDisplayName: string;
  readonly nameOnMedia: string;
  readonly paymentSystemType: number;
  readonly accountTender: string;
  readonly mediaValue: string;
  readonly mediaEntryMethod: number;
  readonly mediaSecurityCode: string;
  readonly expirationMonth: string;
  readonly expirationYear: string;
  readonly usePatronEmail: boolean;
  readonly billingAddress: string;
  readonly externalAccountToken: string;
  readonly externalTransactionToken: string;
}
