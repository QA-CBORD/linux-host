import { I18nPluralPipe, NgLocalization } from '@angular/common';

class CustomLocalization extends NgLocalization {
  getPluralCategory(count: number): string {
    return count === 1 ? 'one' : 'other';
  }
}

describe('Plural Pipe', () => {
  const i18nPlural = new I18nPluralPipe(new CustomLocalization());

  const roomsMapping = {
    '=0': 'No rooms left.',
    '=1': '# room left.',
    'other': '# rooms left.'
  };

  it('should return "No rooms left." when count is 0', () => {
    const count = 0;
    const result = i18nPlural.transform(count, roomsMapping);
    expect(result).toBe('No rooms left.');
  });

  it('should return "1 room left." when count is 1', () => {
    const count = 1;
    const result = i18nPlural.transform(count, roomsMapping);
    expect(result).toBe('1 room left.');
  });

  it('should return "{count} rooms left." when count is greater than 1', () => {
    const count = 5;
    const result = i18nPlural.transform(count, roomsMapping);
    expect(result).toBe('5 rooms left.');
  });

});
