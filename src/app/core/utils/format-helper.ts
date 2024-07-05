import { COMMA_REGEXP } from './regexp-patterns';

export function formatAmountValue(mainInput: string, amountToDeposit: string): number {
  let amount = mainInput ?? amountToDeposit ?? '0';
  amount = amount.toString().replace(COMMA_REGEXP, '');
  return Number(amount);
}
