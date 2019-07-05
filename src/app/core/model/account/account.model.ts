export interface UserAccount {
  accountDisplayName: string;
  accountTender: string;
  accountType: number;
  balance: number;
  billingAddressId: string | null;
  depositAccepted: boolean;
  expirationMonth: string | null;
  expirationYear: string | null;
  id: string;
  institutionId: string;
  isActive: boolean;
  lastFour: any;
  nameOnMedia: any;
  paymentSystemId: string;
  paymentSystemType: number;
  userId: string;
}
