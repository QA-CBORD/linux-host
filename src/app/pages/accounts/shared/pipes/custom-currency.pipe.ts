import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'customCurrency',
  pure: false,
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private cp: CurrencyPipe) {}

  transform({ value }: AbstractControl, args?: any): any {
    if (!value || value === null) {
      return value;
    }
    const regex = /[.,\s]/g;
    console.log(value);

    const result = value.replace(regex, '');
    const formatInputValue = this.cp.transform(result, 'USD', true);
    return formatInputValue.slice(1);
  }
}
