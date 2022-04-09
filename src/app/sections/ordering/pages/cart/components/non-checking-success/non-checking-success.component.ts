import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { MerchantOrderTypesInfo, OrderDetailOptions } from '@sections/ordering';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';

@Component({
  selector: 'st-non-checking-success',
  templateUrl: './non-checking-success.component.html',
  styleUrls: ['./non-checking-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonCheckingSuccessComponent implements OnInit {
  @Input() tax: number;
  @Input() discount: number;
  @Input() checkNumber: number;
  @Input() total: number;
  @Input() accountName: string;
  @Input() deliveryFee: number;
  @Input() pickupFee: number;
  @Input() subTotal: number;
  @Input() tip: number;
  @Input() mealBased: boolean;
  @Input() orderType: MerchantOrderTypesInfo;
  @Input() dueTime: string;
  @Input() type: number;
  @Input() orderDetailOptions: OrderDetailOptions;
 
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly routingService: NavigationService,
    private readonly orderingService: OrderingService) {}

  ngOnInit(): void {
    this.initContentStrings();
  }

  async onClosed() {
    this.routingService.navigate([APP_ROUTES.ordering]);
  }

  private initContentStrings() {
    this.contentStrings.buttonDone = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonDone);
    this.contentStrings.labelOrder = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelOrder);
    this.contentStrings.labelOrderPlacedTitle = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOrderPlacedTitle
    );
    this.contentStrings.labelOrderPlacedDescription = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOrderPlacedDescription
    );
  }
}
