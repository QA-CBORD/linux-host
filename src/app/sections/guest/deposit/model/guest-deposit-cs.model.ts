import { DepositCsModel } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';
import { NullableContent } from '@shared/model/content-strings/content-string-models';
import { guestDepositDefaultStrings } from '@shared/model/content-strings/default-strings';

export class GuestDepositCsModel extends DepositCsModel {
  constructor(contentWrapper: NullableContent) {
    super(contentWrapper, guestDepositDefaultStrings);
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
    return this.content.bill_me_pay_method;
  }
}
