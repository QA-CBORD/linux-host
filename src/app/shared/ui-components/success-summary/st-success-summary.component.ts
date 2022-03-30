import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';

@Component({
  selector: 'st-success-summary',
  templateUrl: './st-success-summary.component.html',
  styleUrls: ['./st-success-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StSuccesSummaryComponent {
  @Input() labelOrderPlacedTitle: string;
  @Input() labelOrderPlacedDescription: string;
  @Input() mealBased: boolean;
  @Input() orderType: number;
  @Input() dueTime: string;
  @Input() address: AddressInfo;
  @Input() subTotal: number;
  @Input() total: number;
  @Input() tip: number;
  @Input() fee: number;
  @Input() labelFee: string;
  @Input() tax: number;
  @Input() labelTax: string;
  @Input() discount: number;
  @Input() paymentMethod: string;

  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(private readonly orderingService: OrderingService) {
    this.contentStrings.buttonDone = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonDone);
    this.contentStrings.labelTotal = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelTotal);
    this.contentStrings.labelTip = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelTip);
    this.contentStrings.labelTax = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelTax);
    this.contentStrings.labelSubtotal = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelSubtotal
    );
    this.contentStrings.labelPickupFee = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPickupFee
    );
    this.contentStrings.labelDeliveryFee = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDeliveryFee
    );
    this.contentStrings.labelDiscount = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDiscount
    );
    this.contentStrings.labelPaymentMethod = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPaymentMethod
    );
    this.contentStrings.labelOrder = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelOrder);
    this.contentStrings.labelPickup = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelPickup);
  }
}
