import { TestBed } from '@angular/core/testing';
import { DateUtilObject } from '../date-util';
import { TimeRangePipe } from './time-range.pipe';
import { CONTENT_STRINGS, TIME_PERIOD } from '@sections/accounts/accounts.config';

describe('TimeRangePipe', () => {
  let pipe: TimeRangePipe;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [TimeRangePipe] });
    pipe = TestBed.inject(TimeRangePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('TimeRangePipe', () => {
    it('can load instance', () => {
      expect(pipe).toBeTruthy();
    });

    it('transforms the value to a time range string', () => {
      const value: DateUtilObject = {
        name: 'test',
        year: 2022,
        month: 0,
      };
      const contentString = { start: 'Start', end: 'End' };
      const result = pipe.transform(value, contentString);
      expect(result).toBe('test 2022');
    });

    it('transforms the value to a time range string', () => {
      const value: DateUtilObject = {
        name: TIME_PERIOD.pastSixMonth,
        year: 2022,
        month: 0,
      };
      const contentString = { [CONTENT_STRINGS.pastSixMonthsLabel]: "Past six months" };
      const result = pipe.transform(value, contentString);
      expect(result).toBe( "Past six months" );
    });

    it('returns an empty string if the value is null', () => {
      const value: DateUtilObject = null;
      const contentString = { start: 'Start', end: 'End' };
      const result = pipe.transform(value, contentString);
      expect(result).toBe('');
    });

    it('returns an empty string if the value is undefined', () => {
      const value: DateUtilObject = undefined;
      const contentString = { start: 'Start', end: 'End' };
      const result = pipe.transform(value, contentString);
      expect(result).toBe('');
    });
  })
});
