import { hasDatePassed } from '@sections/housing/utils/has-date-passed';

describe('DatePassed Checker', () => {
  it('should return false if date has not passed', () => {
    const assert: Date = new Date('2025-12-17T03:24:00');
    const expected: boolean = false;

    const result: boolean = hasDatePassed(assert);

    expect(result).toBe(expected);
  });

  it('should  return true if date has passed', () => {
    const assert: Date = new Date('2015-12-17T03:24:00');
    const expected: boolean = true;

    const result: boolean = hasDatePassed(assert);

    expect(result).toBe(expected);
  });

});
