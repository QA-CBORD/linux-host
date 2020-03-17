import { Pipe, PipeTransform } from '@angular/core';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { first } from 'rxjs/operators';

@Pipe({
  name: 'merchantDistance',
  pure: false,
})
export class MerchantDistancePipe implements PipeTransform {

 private milesUnits: string = 'mi';
  constructor(private readonly orderingService: OrderingService) {
    this.initContentStrings();
  }

  transform(value: any, args?: any): string {
    return value === null ? '' : `${value.toFixed(2)} ${this.milesUnits}`;
  }

  private async initContentStrings(): Promise<void> {
    this.milesUnits = await this.orderingService
      .getContentStringByName(ORDERING_CONTENT_STRINGS.labelMilesSuffix)
      .pipe(first())
      .toPromise();
  }
}
