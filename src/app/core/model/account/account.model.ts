export interface UserAccount {
  readonly accountDisplayName: string;
  readonly accountTender: string;
  readonly accountType: number;
  readonly balance: number;
  readonly billingAddressId: string | null;
  readonly depositAccepted: boolean;
  readonly expirationMonth: string | null;
  readonly expirationYear: string | null;
  readonly id: string;
  readonly institutionId: string;
  readonly isActive: boolean;
  readonly lastFour: any;
  readonly nameOnMedia: any;
  readonly paymentSystemId: string;
  readonly paymentSystemType: number;
  readonly userId: string;
}
