import { Category } from './filter-sort.model';

export function generateCategory(_: any, index: number): Category {
  const name: string = `Category ${index}`;
  const selected: boolean = false;

  return new Category(name, selected);
}

export function generateCategories(amount: number = 5): Category[] {
  return Array.apply(null, Array(amount)).map(generateCategory);
}
