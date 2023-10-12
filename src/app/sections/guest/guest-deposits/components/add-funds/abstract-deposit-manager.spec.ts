import { PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { AbstractDepositManager } from './abstract-deposit-manager'; 

class ConcreteDepositManager extends AbstractDepositManager {
   
  }

describe('AbstractDepositManager', () => {
  let depositManager: AbstractDepositManager;

  beforeEach(() => {
    depositManager = new ConcreteDepositManager(null, null, null, null);
  });

  it('should define dest accounts properly', () => {
    const target = PAYMENT_TYPE.CREDIT;
    depositManager.defineDestAccounts(target);
    expect(depositManager.activePaymentType).toBe(target);
  });

  it('should check if Apple Pay is enabled', () => {
    const paymentMethod = { accountType: PAYMENT_TYPE.APPLEPAY };
    const isEnabled = depositManager.isApplePayEnabled(paymentMethod);
    expect(isEnabled).toBe(false);
  });

  afterEach(() => {
    depositManager = null;
  });
});
