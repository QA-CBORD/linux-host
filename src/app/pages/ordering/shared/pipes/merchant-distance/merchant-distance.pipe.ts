import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'merchantDistance',
})
export class MerchantDistancePipe implements PipeTransform {
  transform(value: any, args?: any): string {
    if (value === null) {
      return '';
    }

    return `${value.toFixed(2)} mi`;
  }
}
