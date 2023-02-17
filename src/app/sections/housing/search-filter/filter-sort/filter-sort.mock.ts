import { Category } from './filter-sort.model';

export function generateCategory(_, index: number): Category {
  const name = `Category ${index}`;

  return new Category(name, -1);
}

export function generateCategories(amount = 5): Category[] {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateCategory);
}
