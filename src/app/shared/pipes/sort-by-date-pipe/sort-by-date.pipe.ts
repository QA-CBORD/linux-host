import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort_by_date',
})
export class SortByDatePipe implements PipeTransform {
  transform(value: any, key?: any): any {
    return value.sort(
      (a: any, b: any) =>
      new Date(b[key]).getTime() - new Date(a[key]).getTime()
    );
  }
}
