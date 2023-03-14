export interface ApplePayResponse {
    success: boolean;
    errorMessage: string;
    accountId: string;
    selectedAccount?: { accountDisplayName: string };
    amount?: string;
    sourceAcc?: { accountTender: string };
  }

  export enum ApplePay {
    ORDERS_WITH_APPLE_PAY,
    DEPOSITS_WITH_APPLE_PAY,
  }
