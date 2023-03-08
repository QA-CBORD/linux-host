import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { COMMA_REGEXP } from '@core/utils/regexp-patterns';

@Pipe({
  name: 'customCurrency',
  pure: false,
})
export class CustomCurrencyPipe implements PipeTransform {
  transform({ value }: AbstractControl): string {
    if (!value || value.length < 1) {
      return '';
    }
    const result = value.toString().replace(COMMA_REGEXP, '');
    const num = parseFloat(result);

    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
}
