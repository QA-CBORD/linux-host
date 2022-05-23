import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'merchantDistance',
  pure: false,
})
export class MerchantDistancePipe implements PipeTransform {
  transform(value: number): string {
    return !value ? '' : `${value.toFixed(2)} mi`;
  }
}
