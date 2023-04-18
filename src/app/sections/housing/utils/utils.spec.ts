import {
  convertObjectToMap,
  define,
  flat,
  hasDatePassed,
  hasValue,
  isDate,
  isDefined,
  isEmptyOrNullString,
  isSuccessful,
  parseJsonToArray,
} from './index';

describe('Utils', () => {
  describe('convertObjectToMap', () => {
    it('should convert an object to a Map', () => {
      const obj = { a: 1, b: 2 };
      const map = convertObjectToMap<number>(obj);
      expect(map.get('a')).toBe(1);
      expect(map.get('b')).toBe(2);
    });
  });

  describe('define', () => {
    it('should return the value if defined', () => {
      const value = 'foo';
      expect(define(value)).toBe(value);
    });

    it('should return the fallback if value is undefined', () => {
      const value = undefined;
      const fallback = 'bar';
      expect(define(value, fallback)).toBe(fallback);
    });
  });

  describe('flat', () => {
    it('should flatten a 2-dimensional array by default', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ];
      expect(flat(arr)).toEqual([1, 2, 3, 4]);
    });

    it('should flatten an n-dimensional array up to the given depth', () => {
      const arr = [
        [[1], 2],
        [3, 4],
      ];
      expect(flat(arr, 2)).toEqual([1, 2, 3, 4]);
    });

    it('should return a copy of the array if depth is 0', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ];
      expect(flat(arr, 0)).toEqual(arr);
    });
  });

  describe('hasDatePassed', () => {
    it('should return true if the given date has passed', () => {
      const date = new Date(2020, 0, 1);
      expect(hasDatePassed(date)).toBe(true);
    });

    it('should return false if the given date has not passed', () => {
      const date = new Date(2030, 0, 1);
      expect(hasDatePassed(date)).toBe(false);
    });
  });

  describe('hasValue', () => {
    it('should return false if value is null', () => {
      expect(hasValue(null)).toBe(false);
    });

    it('should return false if value is undefined', () => {
      expect(hasValue(undefined)).toBe(false);
    });

    it('should return false if value is an empty string', () => {
      expect(hasValue('')).toBe(false);
    });

    it('should return false if value is an array with null or empty items', () => {
      expect(hasValue([1, null, '', 2])).toBe(false);
    });

    it('should return true if value is a non-empty string', () => {
      expect(hasValue('foo')).toBe(true);
    });

    it('should return true if value is a non-empty array', () => {
      expect(hasValue([1, 2, 3])).toBe(true);
    });

    it('should return true if value is a non-empty object', () => {
      expect(hasValue({ a: 1, b: 2 })).toBe(true);
    });
  });
  describe('parseJsonToArray', () => {
    it('should return an empty array when given an empty string', () => {
      expect(parseJsonToArray('')).toEqual([]);
    });

    it('should return an empty array when given invalid JSON', () => {
      expect(parseJsonToArray('invalid json')).toEqual([]);
    });

    it('should return an array when given valid JSON', () => {
      const json = '[1, 2, 3]';
      expect(parseJsonToArray<number>(json)).toEqual([1, 2, 3]);
    });
  });

  describe('isSuccessful', () => {
    it('should return true when status code is 200', () => {
      const status = {
        details: null,
        message: '',
        status: '',
        statusCode: 200,
        traceId: '',
      };
      expect(isSuccessful(status)).toBe(true);
    });

    it('should return true when status code is 204', () => {
      const status = {
        details: null,
        message: null,
        status: '',
        statusCode: 204,
        traceId: '',
      };
      expect(isSuccessful(status)).toBe(true);
    });

    it('should return false when status code is not 200 or 204', () => {
      const status = {
        details: null,
        message: null,
        status: '',
        statusCode: 400,
        traceId: '',
      };
      expect(isSuccessful(status)).toBe(false);
    });
  });

  describe('isEmptyOrNullString', () => {
    it('should return true when given an empty string', () => {
      expect(isEmptyOrNullString('')).toBe(true);
    });

    it('should return true when given null', () => {
      expect(isEmptyOrNullString(null)).toBe(true);
    });

    it('should return true when given "null"', () => {
      expect(isEmptyOrNullString('null')).toBe(true);
    });

    it('should return false when given a non-empty string', () => {
      expect(isEmptyOrNullString('hello')).toBe(false);
    });
  });

  describe('isDefined', () => {
    it('should return false when given null', () => {
      expect(isDefined(null)).toBe(false);
    });

    it('should return false when given undefined', () => {
      expect(isDefined(undefined)).toBe(false);
    });

    it('should return true when given a value', () => {
      expect(isDefined('hello')).toBe(true);
    });
  });
  describe('isDate', () => {
    it('should return true for valid dates in the format MM/DD/YYYY', () => {
      expect(isDate('11/25/2020')).toBe(true);
      expect(isDate('12/31/2022')).toBe(true);
    });

    it('should return true for valid dates in the format YYYY-MM-DDTHH:MM:SS', () => {
      expect(isDate('2019-01-01T00:00:00')).toBe(true);
      expect(isDate('2023-04-18T13:14:15')).toBe(true);
    });

    it('should return false for invalid dates', () => {
      expect(isDate('2020.11.25')).toBe(false);
      expect(isDate('2022,13,31T00:00:00')).toBe(false);
      expect(isDate('2022_12_31T24:00:00')).toBe(false);
      expect(isDate('invalid date')).toBe(false);
    });
  });
});
