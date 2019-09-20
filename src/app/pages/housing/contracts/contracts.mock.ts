import { Contract } from './contracts.model';

export function generateContract(_: any, index: number): Contract {
  return {
    id: index,
  };
}

export function generateContracts(amount: number): Contract[] {
  return Array.apply(null, Array(amount)).map(generateContract);
}
