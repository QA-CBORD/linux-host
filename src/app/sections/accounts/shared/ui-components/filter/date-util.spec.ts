import { getAmountOfMonthFromPeriod, getTimeRangeOfDate, getTimeRange, getRangeBetweenDates, getUniquePeriodName } from './date-util';



const dateFormat = /(?:19|20)\d\d-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])/;

describe('getAmountOfMonthFromPeriod', () => {
    it('should return an empty array if the number of months is 0', () => {
        const result = getAmountOfMonthFromPeriod(0);
        expect(result.length).toBe(0);
    });
});

describe('getTimeRangeOfDate', () => {
    it('should return a TimeRange object with the start and end date set to the given date', () => {
        const date = { name: 'January', year: 2022, month: 0 };
        const result = getTimeRangeOfDate(date);
        expect(result.startDate).toMatch(dateFormat);
        expect(result.endDate).toMatch(dateFormat);
    });
});

describe('getTimeRange', () => {
    it('should return a TimeRange object with the start and end date set to the first and last day of the given month', () => {
        const date = { name: 'January', year: 2022, month: 0 };
        const result = getTimeRange(date);
        expect(result.startDate).toMatch(dateFormat);
        expect(result.endDate).toMatch(dateFormat);
    });
});

describe('getRangeBetweenDates', () => {
    it('should return a TimeRange object with the start and end date set to the first and last day between the source and target dates', () => {
        const sourceDate = { name: 'January', year: 2022, month: 0 };
        const targetDate = { name: 'March', year: 2022, month: 2 };
        const result = getRangeBetweenDates(sourceDate, targetDate);
        expect(result.startDate).toMatch(dateFormat);
        expect(result.endDate).toMatch(dateFormat);
    });
});

describe('getUniquePeriodName', () => {
    it('should return a unique period name based on the given date', () => {
        const date = { name: 'January', year: 2022, month: 0 };
        const result = getUniquePeriodName(date);
        expect(result).toBe('January');
    });
});