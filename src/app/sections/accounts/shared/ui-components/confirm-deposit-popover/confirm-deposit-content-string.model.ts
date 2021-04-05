import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { confirmDepositDefaultStrings } from '@shared/model/content-strings/default-strings';

export class ConfirmDepositCsModel extends ContentStringModel {
  constructor(contentWrapper: NullableContent) {
    super(contentWrapper, confirmDepositDefaultStrings);
  }

  get title(): string {
    return this.content.title;
  }

  get depositAmountLabel(): string {
    return this.content.deposit_amount;
  }

  get convenienceFeeLabel(): string {
    return this.content.convenience_fee;
  }

  get totalPaymentLabel(): string {
    return this.content.total_payment;
  }

  get accountLabel(): string {
    return this.content.account;
  }

  get paymentMethodLabel(): string {
    return this.content.payment_method;
  }

  get endingInLabel(): string {
    return this.content.ending_in;
  }

  get billMeLabel(): string {
    return this.content.bill_me;
  }
}
