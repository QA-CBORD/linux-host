import { hasValue } from './has-value';

describe('hasValue utility function', () => {
  describe('value is primitive', () => {
    it('should return true if value is non-empty string', () => {
      const assert: string = 'some value';
      const expected: boolean = true;

      const result: boolean = hasValue(assert);

      expect(result).toBe(expected);
    });

    it('should return false if value is null', () => {
      const assert: void = null;
      const expected: boolean = false;

      const result: boolean = hasValue(assert);

      expect(result).toBe(expected);
    });

    it('should return false if value is undefined', () => {
      const assert: void = undefined;
      const expected: boolean = false;

      const result: boolean = hasValue(assert);

      expect(result).toBe(expected);
    });

    it('should return false if value is empty string', () => {
      const assert: string = '';
      const expected: boolean = false;

      const result: boolean = hasValue(assert);

      expect(result).toBe(expected);
    });
  });

  describe('value is array', () => {
    it('should return true if all values are non-null, non-undefined and not empty strings', () => {
      const assert: string[] = ['Value1', 'Value2', 'Value3'];
      const expected: boolean = true;

      const result: boolean = hasValue(assert);

      expect(result).toBe(expected);
    });

    it('should return false if at least one value is null', () => {
      const assert: string[] = ['Value1', null, 'Value3'];
      const expected: boolean = false;

      const result: boolean = hasValue(assert);

      expect(result).toBe(expected);
    });

    it('should return false if at least one value is undefined', () => {
      const assert: string[] = ['Value1', undefined, 'Value3'];
      const expected: boolean = false;

      const result: boolean = hasValue(assert);

      expect(result).toBe(expected);
    });

    it('should return false if at least one value is empty string', () => {
      const assert: string[] = ['Value1', '', 'Value3'];
      const expected: boolean = false;

      const result: boolean = hasValue(assert);

      expect(result).toBe(expected);
    });
  });
});
