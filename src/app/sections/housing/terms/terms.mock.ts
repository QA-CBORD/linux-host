import { Term } from './terms.model';

export function generateTerm(_: any, index: number): Term {
  const now: number = Date.now();
  const termId: number = index;
  const termStartDate: string = new Date(now).toISOString();
  const termEndDate: string = new Date(now + index).toISOString();
  const termName = `Term ${index}`;

  return new Term({
    termId,
    termStartDate,
    termEndDate,
    termName,
  });
}

export function generateTerms(amount = 3): Term[] {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateTerm);
}
