import { Label } from './rooms-search.model';

export function generateLabel(_: any, index: number): Label {
  return new Label(`Honors Unit ${index}`);
}

export function generateLabels(amount: number = 2): Label[] {
  return Array.apply(null, Array(amount)).map(generateLabel);
}
