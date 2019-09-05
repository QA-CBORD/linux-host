import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'merchantDistance'
})
export class MerchantDistancePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    if(value === null){
      return '';
    }

    return value.toFixed(2) + " mi";
  }

  private formatInputData(value): string {
    const withDecimal = value.toFixed(2);
    const firstPartIndex = withDecimal.indexOf('.');
    const first = withDecimal.slice(0, firstPartIndex);
    const finalFirst = parseFloat(first).toLocaleString('en-US');

    return finalFirst + withDecimal.slice(firstPartIndex);
  }

}
