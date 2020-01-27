import { Label } from '../../../rooms-search.model';

export class Unit {
  title: string;
  isFavorite: boolean;
  labels: Label[];

  constructor(options: any) {
    this.title = options.title;
    this.isFavorite = !!options.isFavorite;
    this.labels = Array.isArray(options.labels) ? options.labels : [];
  }
}
