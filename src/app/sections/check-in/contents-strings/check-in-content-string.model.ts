import { ContentStringModel, NullableContent } from "@shared/model/content-strings/content-string-models";
import { checkingDefaultCs, checkingSuccessCs } from "@shared/model/content-strings/default-strings";

export class CheckingContentCsModel extends ContentStringModel {
    constructor(nullable: NullableContent) {
        super(nullable.getConfig(), checkingDefaultCs);
      }
}

export class CheckingSuccessContentCsModel extends ContentStringModel {
  constructor(nullable: NullableContent) {
      super(nullable.getConfig(), checkingSuccessCs);
    }

    get title(): string {
      return this.content.title;
    }

    get subtitle(): string {
      return this.content.subtitle;
    }

    get instructions(): string {
      return this.content.instructions;
    }

    get pickUpTimeLbl(): string {
      return this.content.lbl_pickup_time;
    }

    get orderDetailsLbl(): string {
      return this.content.lbl_btn_order_detail;
    }

    get pickUpAddressLbl(): string {
      return this.content.lbl_pickup_address;
    }

    get totalLbl(): string {
      return this.content.lbl_total;
    }

    get doneBtn(): string {
      return this.content.done;
    }

    get labelOrder(): string {
      return this.content.labelOrder;
    }

    get labelDiscount(): string {
      return this.content.lbl_discount;
    }

    get labelTax(): string {
      return this.content.lbl_tax;
    }

    get labelTip(): string {
      return this.content.lbl_tip;
    }

    get labelSubTotal(): string {
      return this.content.lbl_subtotal;
    }

    get labelPickupFee(): string {
      return this.content.lbl_pickupFee;
    }

    get labelDeliveryFee(): string {
      return this.content.lbl_deliveryFee;
    }
}
