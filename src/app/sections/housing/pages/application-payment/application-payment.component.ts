import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from '@core/model/account/account.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { CREDITCARD_ICONS, CREDITCARD_TYPE } from '@sections/accounts/accounts.config';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { AccountsService } from '@sections/dashboard/services';
import { GUEST_FORM_CONTROL_NAMES } from '@sections/guest/guest-deposits/components/add-funds/guest-add-funds.component';
import { accountsType, cardCs } from '@sections/settings/creditCards/credit-card-mgmt/cards/cards.component';
import { firstValueFrom } from '@shared/utils';
import { take } from 'rxjs/operators';
import { PaymentSystemType } from 'src/app/app.global';

@Component({
  selector: 'st-application-payment',
  templateUrl: './application-payment.component.html',
  styleUrls: ['./application-payment.component.scss'],
})

export class ApplicationPaymentComponent implements OnInit {
  @Input() contentStrings: cardCs;

  @Input() userAccounts: accountsType = [];

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
  ) {}

  ngOnInit() {

    this.guestDepositForm = this.fb.group({
      [GUEST_FORM_CONTROL_NAMES.mainInput]: ['', Validators.required],
    });
  }

  onAmountChanged() {}
 
  formatInput() {}

  ionViewWillEnter() {
    this.cdRef.detectChanges();
  }

  get mainFormInput(): AbstractControl {
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.mainInput);
  }
  
  async addCreditCard() {
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
    this.depositService.feePayment(acc.account?.id, this.mainFormInput.value).pipe(take(1)).subscribe();
    alert("This is a bobo " + JSON.stringify(acc.account?.id))
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
}
