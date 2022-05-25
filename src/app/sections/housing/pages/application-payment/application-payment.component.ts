import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

  feePayment(acc: { account: { id: string } }) {
    this.confirmationDepositPopover();
    // this.depositService.feePayment(acc.account?.id, this.mainFormInput.value).pipe(take(1)).subscribe();
  }

  async confirmationDepositPopover(datax?: any) {
    const data = {
      fee: 0.25,
      sourceAcc: {
        id: 'bb5871a5-1efc-49cc-8d0e-36c0945e5139',
        institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11',
        paymentSystemId: '562f7f07-675c-440c-9ae6-45a38ff20115',
        userId: '56547406-8da1-4b27-8669-eb20cfaff5d5',
        isActive: true,
        accountDisplayName: 'JT',
        paymentSystemType: 4,
        accountTender: '4',
        accountType: 2,
        depositAccepted: false,
        lastFour: '2224',
        nameOnMedia: 'JT',
        expirationMonth: null,
        expirationYear: null,
        billingAddressId: 'e88ae6fd-cba8-458c-a600-2aadbfda9782',
        balance: null,
      },
      selectedAccount: {
        id: 'T:1:56547406-8da1-4b27-8669-eb20cfaff5d5:801',
        institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11',
        paymentSystemId: 'ab34e62b-97b0-4dbb-84a6-d16bc9caf148',
        userId: '56547406-8da1-4b27-8669-eb20cfaff5d5',
        isActive: true,
        accountDisplayName: 'Dining Dollars',
        paymentSystemType: 1,
        accountTender: '801',
        accountType: 3,
        depositAccepted: true,
        lastFour: null,
        nameOnMedia: null,
        expirationMonth: null,
        expirationYear: null,
        billingAddressId: null,
        balance: 390,
      },
      amount: '25',
      billme: false,
    };

    const contentString = new ConfirmDepositCs({
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

    const popover = await this.popoverCtrl.create({
      component: ConfirmPaymentPopover,
      componentProps: {
        data,
        contentString,
      },
      animated: false,
      backdropDismiss: true,
    });
    popover
      .onDidDismiss()
      .then(async ({ role }) => {
        if (role === BUTTON_TYPE.OKAY) {
          await this.performPayment(data, contentString);
        } else {
          this.cdRef.detectChanges();
        }
      })
      .catch(err => console.log(err));

    return await popover.present();
  }

  private async performPayment(
    data: {
      fee: number;
      sourceAcc: {
        id: string;
        institutionId: string;
        paymentSystemId: string;
        userId: string;
        isActive: boolean;
        accountDisplayName: string;
        paymentSystemType: number;
        accountTender: string;
        accountType: number;
        depositAccepted: boolean;
        lastFour: string;
        nameOnMedia: string;
        expirationMonth: any;
        expirationYear: any;
        billingAddressId: string;
        balance: any;
      };
      selectedAccount: {
        id: string;
        institutionId: string;
        paymentSystemId: string;
        userId: string;
        isActive: boolean;
        accountDisplayName: string;
        paymentSystemType: number;
        accountTender: string;
        accountType: number;
        depositAccepted: boolean;
        lastFour: any;
        nameOnMedia: any;
        expirationMonth: any;
        expirationYear: any;
        billingAddressId: any;
        balance: number;
      };
      amount: string;
      billme: boolean;
    },
    contentString: ConfirmDepositCs
  ) {
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
