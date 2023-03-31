import { OrderInfo } from '../shared/models';

export enum TransactionCheckStatus {
  OK,
  PaymentFailed,
}
export const checkTransactionStatus = ({ transactionId, amountDue }: Partial<OrderInfo>): TransactionCheckStatus => {
  if (!transactionId && amountDue > 0) {
    return TransactionCheckStatus.PaymentFailed;
  }
  return TransactionCheckStatus.OK;
};

export const checkPaymentFailed = (order: Partial<OrderInfo>): boolean => {
  return checkTransactionStatus(order) === TransactionCheckStatus.PaymentFailed;
};
