import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort_by_date',
})
export class SortByDatePipe implements PipeTransform {
  transform(value: object[], key?: string | number): object[] {
    return value.sort(
      (a: object, b: object) =>
      new Date(b[key]).getTime() - new Date(a[key]).getTime()
    );
  }
}
