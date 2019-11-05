import { Contract } from './contracts.model';

export function generateContract(_: any, index: number): Contract {
  const id: number = index;

  return new Contract(id);
}

export function generateContracts(amount: number): Contract[] {
  return Array.apply(null, Array(amount)).map(generateContract);
}
