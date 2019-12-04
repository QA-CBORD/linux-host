import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'priceUnitsResolver'
})
export class PriceUnitsResolverPipe implements PipeTransform {

  constructor(private readonly currencyPipe: CurrencyPipe) {
  }

  transform(value: number, mealBased: boolean = false): string {
    return mealBased
      ? `${value} ${value === 1 ? 'Meal' : 'Meals'}`
      : this.currencyPipe.transform(value);
  }
}
