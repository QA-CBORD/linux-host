import {
  ContentStringModel,
  NullableContent,
  RawContentStringObject,
} from '@shared/model/content-strings/content-string-models';
import { depositDefaultStrings } from '@shared/model/content-strings/default-strings';

class DepositBase {
  constructor(protected content: RawContentStringObject) {}

  get title(): string {
    return this.content.title;
  }
  get lblDepositAmount(): string {
    return this.content.lbl_deposit_amount;
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
}

export class ConfirmDepositCs extends DepositBase {
  constructor(protected content: RawContentStringObject) {
    super(content);
  }

  get policyTitle(): string {
    return this.content.policy_title;
  }

  get lblOkButton(): string {
    return this.content.lbl_ok_button;
  }

  get lblCancelButton(): string {
    return this.content.lbl_cancel_button;
  }

  get convenienceFeeLabel(): string {
    return this.content.convenience_fee;
  }

  get totalPaymentLabel(): string {
    return this.content.total_payment;
  }

  get billMeLabel(): string {
    return this.content.bill_me_pay_method;
  }

  get depositReviewBillMe(): string {
    return this.content['label_deposit-billme_review-instructions'];
  }
  get depositReviewCredit(): string {
    return this.content['label_deposit-credit_review-instructions'];
  }
}

export class DepositSuccessCs extends DepositBase {
  constructor(protected content: RawContentStringObject) {
    super(content);
  }

  get doneButtonText(): string {
    return this.content.done_button_text;
  }

  get title(): string {
    return this.content.success_screen_title;
  }

  get subTitleSummary(): string {
    return this.content.subtitle_summary_text;
  }

  get subTitleDetail(): string {
    return this.content.subtitle_detail_text;
  }

  set subTitleDetail(text: string) {
    this.content.subtitle_detail_text = text;
  }

  get billMeText(): string {
    return this.content.bill_me_pay_method;
  }

}


export class DepositCsModel extends ContentStringModel {
  private confirmDeposit: ConfirmDepositCs;
  private depositSuccess: DepositSuccessCs;

  constructor(contentWrapper: NullableContent, defaultString?: RawContentStringObject) {
    super(contentWrapper.getConfig(), defaultString || depositDefaultStrings);
    this.initialize(this.content);
  }

  protected initialize(content): void {
    this.confirmDeposit = new ConfirmDepositCs(content);
    this.depositSuccess = new DepositSuccessCs(content);
  }

  get depositSuccessCs(): DepositSuccessCs {
    return this.depositSuccess;
  }

  get confirmDepositCs(): ConfirmDepositCs {
    return this.confirmDeposit;
  }

  get lblSelectPaymentMethod(): string {
    return this.content.lbl_select_payment_method;
  }

  get newCreditCardText(): string {
    return this.content.new_credit_card_text;
  }

  get lblCardSecurityCode(): string {
    return this.content.lbl_card_security_code;
  }

  get cardSecurityCodeError(): string {
    return this.content.card_security_code_error_text;
  }

  get lblSelectAccountForDeposit(): string {
    return this.content.lbl_select_account_for_deposit;
  }

  get lblSelectAmountForDeposit(): string {
    return this.content.lbl_select_amount_for_deposit;
  }

  get maxAmountError(): string {
    return this.content.max_amount_error_text;
  }

  get minAmountError(): string {
    return this.content.min_amount_error_text;
  }

  get amountPatternError(): string {
    return this.content.amount_pattern_error_text;
  }

  get submitButtonText(): string {
    return this.content.submit_button_lbl;
  }

  get selectPlaceHolderText(): string {
    return this.content.choose_action_placeholder_text;
  }
}
