import {
  getLowBalanceSuccessBodyMessage,
  getWeeklySuccessBodyMessage,
  getMonthlySuccessBodyMessage,
} from './auto-deposit.config';

describe('AutoDeposit Config Utility Functions', () => {
  describe('getLowBalanceSuccessBodyMessage', () => {
    it('should return the correct message for low balance deposit', () => {
      const amount = '50';
      const lowAmount = '10';
      const accName = 'Savings';
      const expectedMessage = `We'll automatically add $${amount} every time your ${accName} account drops below $${lowAmount}.`;
      expect(getLowBalanceSuccessBodyMessage(amount, lowAmount, accName)).toBe(expectedMessage);
    });
  });

  describe('getWeeklySuccessBodyMessage', () => {
    it('should return the correct message for weekly deposit on a given day', () => {
      const amount = '100';
      const day = 3; // Wednesday
      const accName = 'Checking';
      const expectedMessage = `We'll automatically add $${amount} every week on Wednesday to your ${accName} account.`;
      expect(getWeeklySuccessBodyMessage(amount, day, accName)).toBe(expectedMessage);
    });
  });

  describe('getMonthlySuccessBodyMessage', () => {
    it('should return the correct message for monthly deposit on the 1st day', () => {
      const amount = '200';
      const day = 1;
      const accName = 'Investment';
      const expectedMessage = `We'll automatically add $${amount} every month on 1st to your ${accName} account.`;
      expect(getMonthlySuccessBodyMessage(amount, day, accName)).toBe(expectedMessage);
    });

    it('should return the correct message for monthly deposit on the 2nd day', () => {
      const amount = '300';
      const day = 2;
      const accName = 'Retirement';
      const expectedMessage = `We'll automatically add $${amount} every month on 2nd to your ${accName} account.`;
      expect(getMonthlySuccessBodyMessage(amount, day, accName)).toBe(expectedMessage);
    });

    it('should return the correct message for monthly deposit on the 3rd day', () => {
      const amount = '400';
      const day = 3;
      const accName = 'Education';
      const expectedMessage = `We'll automatically add $${amount} every month on 3rd to your ${accName} account.`;
      expect(getMonthlySuccessBodyMessage(amount, day, accName)).toBe(expectedMessage);
    });

    it('should return the correct message for monthly deposit on the 4th day', () => {
      const amount = '500';
      const day = 4;
      const accName = 'Personal';
      const expectedMessage = `We'll automatically add $${amount} every month on 4th to your ${accName} account.`;
      expect(getMonthlySuccessBodyMessage(amount, day, accName)).toBe(expectedMessage);
    });
  });
});
