import { define } from './define';

describe('define utility function', () => {
  it('should return value if value is defined', () => {
    const assert: string = 'some value';
    const expected: string = assert;

    const result: string = define(assert);

    expect(result).toBe(expected);
  });

  it('should return fallback if value is undefined or null', () => {
    const assert: void = null;
    const expected: any[] = [];

    const result: any[] = define(assert, []);

    expect(result).toEqual(expected);
  });
});
