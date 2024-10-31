import { PronounsPipe } from './pronouns.pipe';

describe('PronounsPipe', () => {
  let pipe: PronounsPipe;

  beforeEach(() => {
    pipe = new PronounsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a comma-separated string of pronouns', () => {
    const value = 'he,him,his';
    const result = pipe.transform(value);
    expect(result).toBe('He/Him/His');
  });

  it('should return an empty string if the input is empty', () => {
    const value = '';
    const result = pipe.transform(value);
    expect(result).toBe('');
  });

  it('should transform a string with extra commas', () => {
    const value = 'he,,him,his,';
    const result = pipe.transform(value);
    expect(result).toBe('He/Him/His');
  });

  it('should transform a string with spaces around commas', () => {
    const value = 'he , him , his';
    const result = pipe.transform(value);
    expect(result).toBe('He/Him/His');
  });

  it('should transform a string with mixed case pronouns', () => {
    const value = 'He,him,HIS';
    const result = pipe.transform(value);
    expect(result).toBe('He/Him/His');
  });
});
