import { Label, Building } from './building.model';

export function generateLabel(_: any, index: number): Label {
  return new Label(`Honors Building ${index}`);
}

export function generateLabels(amount: number = 2): Label[] {
  return Array.apply(null, Array(amount)).map(generateLabel);
}

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
