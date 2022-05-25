import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ModalController, PopoverController } from '@ionic/angular';
import { ConfirmDepositCs } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';
import { DepositService } from '@sections/accounts/services/deposit.service';
import {
  AccountsType as UserAccountType,
  CardCs,
} from '@sections/settings/creditCards/credit-card-mgmt/cards/cards.component';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { ConfirmPaymentPopover } from './confirm-fee-popover/confirm-fee-popover.component';
import { SuccessfulPaymentModal } from './payment-modal/payment-modal.component';

@Component({
  selector: 'st-application-payment',
  templateUrl: './application-payment.component.html',
  styleUrls: ['./application-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationPaymentComponent implements OnInit {
  @Input() contentStrings: CardCs;
  @Input() userAccounts: UserAccountType = [];
  @Input() amount: number;
  control: AbstractControl;

  constructor(
    private loadingService: LoadingService,
    private readonly depositService: DepositService,
    private readonly creditCard: CreditCardService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly popoverCtrl: PopoverController,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.control = new FormControl(this.amount);
    this.control.disable();
  }

  async addCreditCard() {
    await this.creditCard.addCreditCard(this.contentStrings);
    this.userAccounts = await this.creditCard.retrieveAccounts();
  }

  feePayment(acc) {
    this.confirmationDepositPopover(acc);
    // this.depositService.feePayment(acc.account?.id, this.mainFormInput.value).pipe(take(1)).subscribe();
  }

  async confirmationDepositPopover(acc?: any) {
    const data = {
      sourceAcc: {
        accountTender: acc.account.accountTender,
        lastFour: acc.account.lastFour,
      },
      selectedAccount: {
        accountDisplayName: acc.account.accountDisplayName,
        accountType: acc.account.accountType,
      },
      amount: this.amount.toString(),
    };
    const popover = await this.popoverCtrl.create({
      component: ConfirmPaymentPopover,
      componentProps: {
        data,
      },
      cssClass: 'large-popover',
      animated: false,
      backdropDismiss: true,
    });
    popover
      .onDidDismiss()
      .then(async ({ role }) => {
        if (role === BUTTON_TYPE.OKAY) {
          await this.performPayment(data);
        } else {
          this.cdRef.detectChanges();
        }
      })
      .catch(err => console.log(err));
    return await popover.present();
  }

  private async performPayment(
    data: any,
    contentString?: ConfirmDepositCs
  ) {

      contentString = new ConfirmDepositCs({
      title: 'Confirm Payment',
      policy_title: 'Refund Policy',
      lbl_deposit_amount: 'Pay amount',
      convenience_fee: 'Convenience Fee',
      total_payment: 'Total Payment',
      lbl_account: 'Account',
      bill_me_pay_method: 'Bill me',
      cc_ending_in_text: 'ending in',
      lbl_ok_button: 'Pay',
      lbl_cancel_button: 'Cancel',
      lbl_select_payment_method: 'Card Type',
      new_credit_card_text: 'Add a Credit Card',
      lbl_card_security_code: 'Card Security Code',
      card_security_code_error_text: 'Please enter a valid card security code.',
      lbl_select_account_for_deposit: 'To Account',
      lbl_select_amount_for_deposit: 'Amount to Deposit',
      max_amount_error_text: 'The maximum amount for a deposit is',
      min_amount_error_text: 'The minimum amount for a deposit is',
      amount_pattern_error_text: 'Please enter a valid amount.',
      submit_button_lbl: 'Deposit',
      choose_action_placeholder_text: 'Please Choose',
      success_screen_title: 'Confirm Payment',
      subtitle_detail_text: 'This transaction was successful. You can review it to make sure everything checks out.',
      subtitle_summary_text: 'Success!',
      done_button_text: 'Confirm Payment',
    });

    // this.depositService.feePayment(acc.account?.id, this.mainFormInput.value).pipe(take(1)).subscribe();
    const modal = await this.modalCtrl.create({
      component: SuccessfulPaymentModal,
      componentProps: {
        data,
        contentString,
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.present();
    this.loadingService.showSpinner();
  }
}
