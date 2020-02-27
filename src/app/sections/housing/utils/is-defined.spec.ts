import { isDefined } from './is-defined';

describe('isDefined utility function', () => {
  it('should return false if value is null', () => {
    const assert: void = null;
    const expected: boolean = false;

    const result: boolean = isDefined(assert);

    expect(result).toEqual(expected);
  });

  it('should return false if value is undefined', () => {
    const assert: void = undefined;
    const expected: boolean = false;

    const result: boolean = isDefined(assert);

    expect(result).toEqual(expected);
  });

  it('should return true if value is not undefined or null', () => {
    const assert: string = 'Value';
    const expected: boolean = true;

    const result: boolean = isDefined(assert);

    expect(result).toEqual(expected);
  });
});
