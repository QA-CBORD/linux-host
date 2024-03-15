import { checkTransactionStatus, TransactionCheckStatus, checkPaymentFailed } from './transaction-check';
import { OrderInfo } from '../shared/models';

describe('Transaction Check', () => {
  it('should return PaymentFailed if transactionId is not present and amountDue is greater than 0', () => {
    const order: Partial<OrderInfo> = { transactionId: null, amountDue: 100 };
    expect(checkTransactionStatus(order)).toEqual(TransactionCheckStatus.PaymentFailed);
  });

  it('should return OK if transactionId is present regardless of amountDue', () => {
    const order: Partial<OrderInfo> = { transactionId: '123', amountDue: 100 };
    expect(checkTransactionStatus(order)).toEqual(TransactionCheckStatus.OK);
  });

  it('should return OK if amountDue is 0 regardless of transactionId', () => {
    const order: Partial<OrderInfo> = { transactionId: null, amountDue: 0 };
    expect(checkTransactionStatus(order)).toEqual(TransactionCheckStatus.OK);
  });

  it('should return true if checkPaymentFailed is called and payment has failed', () => {
    const order: Partial<OrderInfo> = { transactionId: null, amountDue: 100 };
    expect(checkPaymentFailed(order)).toEqual(true);
  });

  it('should return false if checkPaymentFailed is called and payment has not failed', () => {
    const order: Partial<OrderInfo> = { transactionId: '123', amountDue: 100 };
    expect(checkPaymentFailed(order)).toEqual(false);
  });
});