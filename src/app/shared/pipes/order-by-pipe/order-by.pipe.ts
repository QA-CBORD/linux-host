import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order_by',
})
export class OrderByPipe implements PipeTransform {
  transform(value: object[], propName: string) {

    return value.sort((a, b) => {
       if (a[propName] < b[propName]) {
         return -1;
       } else if (a[propName] === b[propName]) {
         return 0;
       } else if (a[propName] > b[propName]) {
         return 1;
       }
     });

   }
}
