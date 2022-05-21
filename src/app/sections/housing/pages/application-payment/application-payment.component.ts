import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from '@core/model/account/account.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { buttons, BUTTON_TYPE } from '@core/utils/buttons.config';
import { ModalController, PopoverController } from '@ionic/angular';
import { CREDITCARD_ICONS, CREDITCARD_TYPE } from '@sections/accounts/accounts.config';
import { ConfirmDepositCs, DepositCsModel } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ConfirmDepositPopoverComponent } from '@sections/accounts/shared/ui-components/confirm-deposit-popover';
import { ConfirmDepositPopoverModule } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module';
import { DepositModalComponent } from '@sections/accounts/shared/ui-components/deposit-modal';
import { AccountsService } from '@sections/dashboard/services';
import { GUEST_FORM_CONTROL_NAMES } from '@sections/guest/guest-deposits/components/add-funds/guest-add-funds.component';
import { accountsType, cardCs } from '@sections/settings/creditCards/credit-card-mgmt/cards/cards.component';
import { StGlobalPopoverComponent } from '@shared/ui-components';
import { firstValueFrom } from '@shared/utils';
import { take } from 'rxjs/operators';
import { PaymentSystemType } from 'src/app/app.global';
import { ConfirmFeePopoverComponent } from './confirm-fee-popover/confirm-fee-popover.component';

@Component({
  selector: 'st-application-payment',
  templateUrl: './application-payment.component.html',
  styleUrls: ['./application-payment.component.scss'],
})

export class ApplicationPaymentComponent implements OnInit {
  @Input() contentStrings: cardCs;

  @Input() userAccounts: accountsType = [];

  @Input() amount: number;

  noCreditCardFound: boolean;
  guestDepositForm: FormGroup;

  constructor(
    private externalPaymentService: ExternalPaymentService,
    private loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly accountService: AccountsService,
    private readonly depositService: DepositService,
    private readonly fb: FormBuilder,
    private readonly cdRef: ChangeDetectorRef,
    private readonly popoverCtrl: PopoverController,
    private readonly modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.guestDepositForm = this.fb.group({
      [GUEST_FORM_CONTROL_NAMES.mainInput]: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.mainFormInput.setValue(this.amount ?? 0);
    this.mainFormInput.disable()
    this.cdRef.detectChanges();
  }

  get mainFormInput(): AbstractControl {
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.mainInput);
  }
  
  async addCreditCard() {
    alert("getting called?")
    try {
      const strings = this.contentStrings as any;
      const { success, errorMessage } = await this.externalPaymentService.addUSAePayCreditCard();
      if (success) {
        this.userAccounts = await this.retrieveAccounts();
        this.showMessage(strings.added_success_msg);
      } else {
        this.showMessage(errorMessage);
      }
    } finally {
      //this.loadingService.closeSpinner();
    }
  }

  feePayment(acc: { account: { id: string; }; }) {

      this.confirmationDepositPopover()
    // alert(this.mainFormInput.value)
    // this.depositService.feePayment(acc.account?.id, this.mainFormInput.value).pipe(take(1)).subscribe();
  }

  async retrieveAccounts() {
   // this.loadingService.showSpinner();
    const accounts = await firstValueFrom(
      this.accountService.getUserAccounts([PaymentSystemType.MONETRA, PaymentSystemType.USAEPAY])
    )
      .then(accounts => accounts.map(acc => this.buildStr(acc)))
      //.finally(() => this.loadingService.closeSpinner());
    this.noCreditCardFound = !accounts.length;
    return accounts;
  }

  private async showMessage(message: string, duration = 5000) {
    await this.toastService.showToast({ message, duration });
  }

  private buildStr(account: UserAccount) {
    const { accountTender, lastFour } = account;
    const creditCardTypeNumber = parseInt(accountTender) - 1;
    const display = `${CREDITCARD_TYPE[creditCardTypeNumber]} ending in ${lastFour}`;
    const iconSrc = CREDITCARD_ICONS[creditCardTypeNumber];
    return {
      display,
      account,
      iconSrc,
    };
  }

  async confirmationDepositPopover(datax?: any) {
    const data = {
      fee: 0.25,
      sourceAcc: {
          id: "bb5871a5-1efc-49cc-8d0e-36c0945e5139",
          institutionId: "1e418ca8-7148-4956-b7c4-1f35db6d8a11",
          paymentSystemId: "562f7f07-675c-440c-9ae6-45a38ff20115",
          userId: "56547406-8da1-4b27-8669-eb20cfaff5d5",
          isActive: true,
          accountDisplayName: "JT",
          paymentSystemType: 4,
          accountTender: "4",
          accountType: 2,
          depositAccepted: false,
          lastFour: "2224",
          nameOnMedia: "JT",
          expirationMonth: null,
          expirationYear: null,
          billingAddressId: "e88ae6fd-cba8-458c-a600-2aadbfda9782",
          balance: null
      },
      selectedAccount: {
          id: "T:1:56547406-8da1-4b27-8669-eb20cfaff5d5:801",
          institutionId: "1e418ca8-7148-4956-b7c4-1f35db6d8a11",
          paymentSystemId: "ab34e62b-97b0-4dbb-84a6-d16bc9caf148",
          userId: "56547406-8da1-4b27-8669-eb20cfaff5d5",
          isActive: true,
          accountDisplayName: "Dining Dollars",
          paymentSystemType: 1,
        accountTender: "801",
          accountType: 3,
          depositAccepted: true,
          lastFour: null,
          nameOnMedia: null,
          expirationMonth: null,
          expirationYear: null,
          billingAddressId: null,
          balance: 390
      },
      amount: "25",
      billme: false
   };
  
    const contentString =  new ConfirmDepositCs(
      ({
        title: "Confirm Deposit",
        policy_title: "Refund Policy",
        lbl_deposit_amount: "Deposit Amount",
        convenience_fee: "Convenience Fee",
        total_payment: "Total Payment",
        lbl_account: "Account",
        bill_me_pay_method: "Bill me",
        cc_ending_in_text: "ending in",
        lbl_ok_button: "DEPOSIT",
        lbl_cancel_button: "CANCEL",
        lbl_select_payment_method: "Payment Method",
        new_credit_card_text: "Add a Credit Card",
        lbl_card_security_code: "Card Security Code",
        card_security_code_error_text: "Please enter a valid card security code.",
        lbl_select_account_for_deposit: "To Account",
        lbl_select_amount_for_deposit: "Amount to Deposit",
        max_amount_error_text: "The maximum amount for a deposit is",
        min_amount_error_text: "The minimum amount for a deposit is",
        amount_pattern_error_text: "Please enter a valid amount.",
        submit_button_lbl: "Deposit",
        choose_action_placeholder_text: "Please Choose",
        success_screen_title: "Deposit",
        subtitle_detail_text: "This transaction was successful. You can review it to make sure everything checks out.",
        subtitle_summary_text: "Success!",
        done_button_text: "DONE",
      })
    );

    // const popover = await this.popoverCtrl.create({
    //   component: ConfirmDepositPopoverComponent,
    //   componentProps: {
    //     data,
    //     contentString,
    //   },
    //   animated: false,
    //   backdropDismiss: false,
    // });
    // let test = JSON.parse(JSON.stringify(data));
    // alert(JSON.stringify(test))
    // let bobo =  JSON.parse(contentString);
    const popover = await this.popoverCtrl.create({ component: ConfirmDepositPopoverComponent,
      componentProps: {
        data,
        contentString
      },
      animated: false,
      backdropDismiss: true,
    });
    popover.onDidDismiss().then(async ({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        alert("good here")
        const modal = await this.modalCtrl.create({ component: DepositModalComponent,
          componentProps: {
            data,
            contentString
          },
          animated: false,
          backdropDismiss: true,
        })
        modal.present();
      
        //this.loadingService.showSpinner();
       // this.performDeposit(data);
      } else {
        //this.isDepositing = false;
        //this.cdRef.detectChanges();
      }
    }).catch((err) => alert("bobo nama" + err));

    return await popover.present();
  }

}
