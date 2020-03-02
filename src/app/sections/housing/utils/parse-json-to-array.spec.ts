import { parseJsonToArray } from './parse-json-to-array';

describe('parseJsonToArray utility function', () => {
  it('should parse json to array', () => {
    const assert: string = '["Value1", "Value2", "Value3"]';
    const expected: string[] = ['Value1', 'Value2', 'Value3'];

    const result: string[] = parseJsonToArray(assert);

    expect(result).toEqual(expected);
  });

  it('should return empty array if json string is not array', () => {
    const assert: string = '{"firstName": "Value1", "lastName": "Value2", "middleName": "Value3"}';
    const expected: string[] = [];

    const result: string[] = parseJsonToArray(assert);

    expect(result).toEqual(expected);
  });

  it('should return empty array if json string is not valid', () => {
    const assert: string = '{"firstName": "Value1"]';
    const expected: string[] = [];

    const result: string[] = parseJsonToArray(assert);

    expect(result).toEqual(expected);
  });
});
