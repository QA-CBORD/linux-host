import { Pipe, PipeTransform } from '@angular/core';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { first } from 'rxjs/operators';

@Pipe({
  name: 'merchantDistance',
  pure: false,
})
export class MerchantDistancePipe implements PipeTransform {
  transform(value: number): string {
    return !value ? '' : `${value.toFixed(2)} mi`;
  }
}
