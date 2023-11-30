import { Pipe, PipeTransform } from '@angular/core';

import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { MerchantInfo } from '../../models/merchant-info.model';
import { TranslateService } from '@ngx-translate/core';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';

@Pipe({
  name: 'orderType',
  pure: false,
})
export class OrderTypePipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  transform({ orderTypes, walkout }: MerchantInfo, isAbleToOrder: boolean): string {
    try {
      if (walkout) {
        return 'Smart Shopping';
      }
      if (!isAbleToOrder && orderTypes) {
        return '';
      }
      const { pickup, delivery } = orderTypes;
      if (!orderTypes || (!delivery && !pickup)) {
        return '';
      }
      const labelDelivery = this.translateService.instant(
        [
          CONTENT_STRINGS_DOMAINS.patronUi,
          CONTENT_STRINGS_CATEGORIES.ordering,
          ORDERING_CONTENT_STRINGS.labelDelivery,
        ].join('.')
      );
      const labelPickup = this.translateService.instant(
        [
          CONTENT_STRINGS_DOMAINS.patronUi,
          CONTENT_STRINGS_CATEGORIES.ordering,
          ORDERING_CONTENT_STRINGS.labelPickup,
        ].join('.')
      );

      if (delivery && pickup) {
        return `${labelDelivery} & ${labelPickup}`;
      }

      return delivery ? labelDelivery : labelPickup;
    } catch (_e) {
      return '';
    }
  }
}
