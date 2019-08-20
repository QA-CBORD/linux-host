import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'customCurrency',
  pure: false,
})
export class CustomCurrencyPipe implements PipeTransform {
  transform({ value }: AbstractControl): string {
    if (!value || value === null) {
      return value;
    }
    const regex = /[,\s]/g;
    const result = value.replace(regex, '');
    const num = parseFloat(result);

    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
}
