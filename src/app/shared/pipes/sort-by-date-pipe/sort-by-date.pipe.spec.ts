import { TestBed } from '@angular/core/testing';
import { SortByDatePipe } from './sort-by-date.pipe';

describe('SortByDatePipe', () => {
  let pipe: SortByDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SortByDatePipe] });
    pipe = TestBed.inject(SortByDatePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});