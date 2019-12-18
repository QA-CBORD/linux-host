export interface OrderPayment {
  orderId: string;
  accountId: string;
  accountName: string;
  transactionId: string;
  sequence: number;
  amount: number;
  cvv: string;
  paymentSystemType: number;
}
