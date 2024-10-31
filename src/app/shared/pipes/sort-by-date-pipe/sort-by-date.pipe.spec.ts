import { SortByDatePipe } from './sort-by-date.pipe';

describe('SortByDatePipe', () => {
  let pipe: SortByDatePipe;

  beforeEach(() => {
    pipe = new SortByDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort an array of objects by a date string property', () => {
    const array = [{ date: '2023-01-01' }, { date: '2022-01-01' }, { date: '2024-01-01' }];
    const sortedArray = pipe.transform(array, 'date');
    expect(sortedArray).toEqual([{ date: '2024-01-01' }, { date: '2023-01-01' }, { date: '2022-01-01' }]);
  });

  it('should sort an array of objects by a date number property', () => {
    const array = [
      { date: 1672531199000 }, // 2023-01-01
      { date: 1640995199000 }, // 2022-01-01
      { date: 1704067199000 }, // 2024-01-01
    ];
    const sortedArray = pipe.transform(array, 'date');
    expect(sortedArray).toEqual([{ date: 1704067199000 }, { date: 1672531199000 }, { date: 1640995199000 }]);
  });

  it('should handle an empty array', () => {
    const array: any[] = [];
    const sortedArray = pipe.transform(array, 'date');
    expect(sortedArray).toEqual([]);
  });

  it('should handle an array with one element', () => {
    const array = [{ date: '2023-01-01' }];
    const sortedArray = pipe.transform(array, 'date');
    expect(sortedArray).toEqual([{ date: '2023-01-01' }]);
  });
});
