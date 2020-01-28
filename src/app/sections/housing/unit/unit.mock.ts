import { generateLabels } from '../housing.mock';

import { Label } from '../housing.model';
import { Unit } from './unit.model';

export function generateUnit(_: any, index: number): Unit {
  const title: string = `Merion Hall ${index}`;
  const isFavorite: boolean = index % 2 !== 0;
  const labels: Label[] = generateLabels(3);

  return new Unit({
    title,
    isFavorite,
    labels,
  });
}

export function generateUnits(amount: number = 2): Unit[] {
  return Array.apply(null, Array(amount)).map(generateUnit);
}
