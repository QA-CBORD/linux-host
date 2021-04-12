import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { guestDepositDefaultStirngs } from '@shared/model/content-strings/default-strings';

export class GuestDepositCsModel extends ContentStringModel {
  constructor(contentWrapper: NullableContent) {
    super(contentWrapper.getConfig(), guestDepositDefaultStirngs);
  }

  get title(): string {
    return this.content.title;
  }

  get lblDepositAmount(): string {
    return this.content.lbl_deposit_amount;
  }

  get convenienceFeeLabel(): string {
    return this.content.convenience_fee;
  }

  get totalPaymentLabel(): string {
    return this.content.total_payment;
  }

  get lblAccount(): string {
    return this.content.lbl_account;
  }

  get lblSelectPaymentMethod(): string {
    return this.content.lbl_select_payment_method;
  }

  get endingInText(): string {
    return this.content.cc_ending_in_text;
  }

  get billMeLabel(): string {
    return this.content.bill_me;
  }
}
