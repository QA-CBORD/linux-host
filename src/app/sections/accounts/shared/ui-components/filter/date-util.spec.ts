import { getAmountOfMonthFromPeriod, getTimeRangeOfDate, getTimeRange, getRangeBetweenDates, getUniquePeriodName } from './date-util';

describe('getAmountOfMonthFromPeriod', () => {
    it('should return an array of DateUtilObject with the specified number of months', () => {
        const result = getAmountOfMonthFromPeriod(3);
        expect(result.length).toBe(3);
        expect(result[0].name).toBe('July');
        expect(result[1].name).toBe('June');
        expect(result[2].name).toBe('May');
    });

    it('should return an empty array if the number of months is 0', () => {
        const result = getAmountOfMonthFromPeriod(0);
        expect(result.length).toBe(0);
    });
});

describe('getTimeRangeOfDate', () => {
    it('should return a TimeRange object with the start and end date set to the given date', () => {
        const date = { name: 'January', year: 2022, month: 0 };
        const result = getTimeRangeOfDate(date);
        expect(result.startDate).toMatch(/^2022-02-01/);
        expect(result.endDate).toMatch(/^2022-01-01/);
    });
});

describe('getTimeRange', () => {
    it('should return a TimeRange object with the start and end date set to the first and last day of the given month', () => {
        const date = { name: 'January', year: 2022, month: 0 };
        const result = getTimeRange(date);
        expect(result.startDate).toMatch(/^2022-01-01/);
        expect(result.endDate).toMatch(/^2022-02-01/);
    });
});

describe('getRangeBetweenDates', () => {
    it('should return a TimeRange object with the start and end date set to the first and last day between the source and target dates', () => {
        const sourceDate = { name: 'January', year: 2022, month: 0 };
        const targetDate = { name: 'March', year: 2022, month: 2 };
        const result = getRangeBetweenDates(sourceDate, targetDate);
        expect(result.startDate).toMatch(/2022-04-01/);
        expect(result.endDate).toMatch(/2022-02-01/);
    });
});

describe('getUniquePeriodName', () => {
    it('should return a unique period name based on the given date', () => {
        const date = { name: 'January', year: 2022, month: 0 };
        const result = getUniquePeriodName(date);
        expect(result).toBe('January');
    });
});