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

    get headerTitle(): string {
      return this.content.title;
    }
  
    get orderTitle(): string {
      return this.content.order_on_the_way;
    }
  
    get subtitle(): string {
      return this.content.subtitle;
    }
  
    get pickUpTimeLbl(): string {
      return this.content. lbl_pickup_time;
    }

    get pickUpAddressLbl(): string {
      return this.content.lbl_pickup_address;
    }

    get totalLbl(): string {
      return this.content.lbl_total;
    }

    get doneBtn(): string {
      return this.content.lbl_total;
    }
}
