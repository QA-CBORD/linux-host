import { Unit } from './units.model';

export function generateUnit(_: any, index: number): Unit {
  const id: number = index;
  const name = `unit ${index}`;
  const rate = `${640 + index}/mo`;
  const beds: number = index;
  const baths: number = index;

  return new Unit(id, name, rate, beds, baths);
}

export function generateUnits(amount: number): Unit[] {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateUnit);
}
