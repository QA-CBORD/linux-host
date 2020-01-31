export enum SortDirection {
  ascend,
  descend,
}

export class Category {
  constructor(
    public name: string,
    public selected: boolean,
    public sortDirection: SortDirection = SortDirection.ascend
  ) {}
}
