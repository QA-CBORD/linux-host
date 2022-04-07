import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { MerchantOrderTypesInfo, OrderDetailOptions } from '@sections/ordering';

@Component({
  selector: 'st-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessModalComponent implements OnInit {
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

  constructor(private readonly modalController: ModalController, private readonly orderingService: OrderingService) {}

  ngOnInit(): void {
    this.initContentStrings();
  }

  async onClosed() {
    await this.modalController.dismiss();
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
