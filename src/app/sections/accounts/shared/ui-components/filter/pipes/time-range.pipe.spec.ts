import { TestBed } from '@angular/core/testing';
import { DateUtilObject } from '../date-util';
import { TimeRangePipe } from './time-range.pipe';

describe('TimeRangePipe', () => {
  let pipe: TimeRangePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TimeRangePipe] });
    pipe = TestBed.inject(TimeRangePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});