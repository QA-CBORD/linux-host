import { formatAmountValue } from './format-helper';

describe('Format Helpers', () => {
  describe('formatAmountValue', () => {
    test('removes commas from the amount', () => {
      expect(formatAmountValue('1,234', '0')).toBe(1234);
    });

    test('uses amountToDeposit when mainInput is null', () => {
      expect(formatAmountValue(null, '500')).toBe(500);
    });

    test('returns 0 when both inputs are null', () => {
      expect(formatAmountValue(null, null)).toBe(0);
    });

    test('mainInput takes precedence over amountToDeposit', () => {
      expect(formatAmountValue('1000', '200')).toBe(1000);
    });

    test('correctly handles negative amounts', () => {
      expect(formatAmountValue('-1,234', '0')).toBe(-1234);
    });
  });
});
