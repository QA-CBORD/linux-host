import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { guestDashboardDefaultStrings } from '@shared/model/content-strings/default-strings';

export class DepositSuccessCsModel extends ContentStringModel {
  constructor(contentWrapper: NullableContent) {
    super(contentWrapper, guestDashboardDefaultStrings);
  }

  get title(): string {
    return this.content.screen_title;
  }

  get messageShort(): string {
    return this.content.msg_short;
  }

  get messageLong(): string {
    return this.content.msg_long;
  }

  get depositAmount(): string {
    return `${this.content.amount_text}:`;
  }

  get account(): string {
    return `${this.content.account_text}:`;
  }

  get paymentMethod(): string {
    return `${this.content.payment_card_text}:`
  }

  get ButtonText(): string {
    return this.content.btn_done;
  }

  get billMe(): string{
      return this.content.bill_me;
  }
}
