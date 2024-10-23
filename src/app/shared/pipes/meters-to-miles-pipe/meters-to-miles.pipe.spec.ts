import { MetersToMilesPipe } from './meters-to-miles.pipe';

describe('MetersToMilesPipe', () => {
  let pipe: MetersToMilesPipe;

  beforeEach(() => {
    pipe = new MetersToMilesPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert meters to miles', () => {
    const meters = 1609.34; // 1 mile in meters
    const result = pipe.transform(meters);
    expect(result).toBe('1.0 miles');
  });

  it('should convert meters to miles with a custom unit name', () => {
    const meters = 1609.34; // 1 mile in meters
    const result = pipe.transform(meters, 'mi');
    expect(result).toBe('1.0 mi');
  });

  it('should handle zero meters', () => {
    const meters = 0;
    const result = pipe.transform(meters);
    expect(result).toBe('0.0 miles');
  });

  it('should handle negative meters', () => {
    const meters = -1609.34; // -1 mile in meters
    const result = pipe.transform(meters);
    expect(result).toBe('-1.0 miles');
  });
});
