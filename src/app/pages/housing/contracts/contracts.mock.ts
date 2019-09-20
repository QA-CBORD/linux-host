export function generateContract(index: number): any {
  return {
    id: index,
  };
}

export function generateContracts(amount: number): any[] {
  return Array.apply(null, Array(amount)).map(generateContract);
}
