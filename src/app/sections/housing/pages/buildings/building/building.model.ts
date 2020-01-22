export class Building {
  title: string;
  isFavorite: boolean;
  labels: Label[];

  constructor(options: any) {
    this.title = options.title;
    this.isFavorite = !!options.isFavorite;
    this.labels = Array.isArray(options.labels) ? options.labels : [];
  }
}

export class Label {
  constructor(public name: string) {}
}
