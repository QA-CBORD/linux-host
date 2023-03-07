import { ContentStringModel, NullableContent } from "@shared/model/content-strings/content-string-models";
import { guestAddFundsDefaultStrings } from "@shared/model/content-strings/default-strings";

export class GuestAddFundsCsModel extends ContentStringModel {
    constructor(contentWrapper: NullableContent) {
        super(contentWrapper.getConfig(), guestAddFundsDefaultStrings);
    }

    get title() {
        return this.content.add_funds_title;
    }

    get noticeText() {
        return this.content.notice_text;
    }

    get paymentMethod() {
        return this.content.source_account_text;
    }

    get toAccount() {
        return this.content.destination_account_text;
    }

    get depositText() {
        return this.content.deposit_label;
    }

    get depositButton() {
        return this.content.deposit_button;
    }

    get refundText() {
        return this.content.refund_text;
    }
}