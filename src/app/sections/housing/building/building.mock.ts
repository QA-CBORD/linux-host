import { generateLabels } from '@shared/ui-components/label/label.mock';

import { Label } from '@shared/ui-components/label/label.model';
import { Building } from './building.model';

export function generateBuilding(_: any, index: number): Building {
  const title: string = `Merion Hall ${index}`;
  const isFavorite: boolean = index % 2 !== 0;
  const labels: Label[] = generateLabels();

  return new Building({
    title,
    isFavorite,
    labels,
  });
}

export function generateBuildings(amount: number = 2): Building[] {
  return Array.apply(null, Array(amount)).map(generateBuilding);
}