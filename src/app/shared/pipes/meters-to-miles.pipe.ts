import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToMiles',
})
export class MetersToMilesPipe implements PipeTransform {
  private readonly factor: number = 0.00062137;

  transform(value: number, unitName?: string): string {
    const miles = (value * this.factor).toFixed(1);

    return `${miles} ${unitName || 'miles'}`;
  }
}
