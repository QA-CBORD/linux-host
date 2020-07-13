import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { take } from 'rxjs/operators';

import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { MerchantOrderTypesInfo } from '../../models/merchant-order-types-info.model';

@Pipe({
  name: 'orderTypePipe',
  pure: false,
})
export class OrderTypePipe implements PipeTransform {
  private labelPickup: string;
  private labelDelivery: string;

  constructor(private readonly orderingService: OrderingService, private readonly cdRef: ChangeDetectorRef) {
    this.initContentStrings();
  }

  transform(value: MerchantOrderTypesInfo): string {
    const { pickup, delivery } = value;
    if (!value || (!delivery && !pickup)) {
      return '';
    }
    if (value.delivery && value.pickup) {
      return `${this.labelPickup} & ${this.labelDelivery}`;
    }

    return delivery ? this.labelDelivery : this.labelPickup;
  }

  private async initContentStrings(): Promise<void> {
    this.labelPickup = await this.orderingService
      .getContentStringByName(ORDERING_CONTENT_STRINGS.labelPickup)
      .pipe(take(1))
      .toPromise();

    this.labelDelivery = await this.orderingService
      .getContentStringByName(ORDERING_CONTENT_STRINGS.labelDelivery)
      .pipe(take(1))
      .toPromise();
    this.cdRef.detectChanges();
  }
}
