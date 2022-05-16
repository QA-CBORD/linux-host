import { Component, Input, OnInit } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { CREDITCARD_ICONS, CREDITCARD_TYPE } from '@sections/accounts/accounts.config';
import { AccountsService } from '@sections/dashboard/services';
import { firstValueFrom } from '@shared/utils';
import { of } from 'rxjs';
import { PaymentSystemType } from 'src/app/app.global';

@Component({
  selector: 'st-application-payment',
  templateUrl: './application-payment.component.html',
  styleUrls: ['./application-payment.component.scss'],
})
export class ApplicationPaymentComponent implements OnInit {
  @Input() contentStrings: {
    screen_title: string;
    no_card_found: string;
    add_new_card_btn_text: string;
    user_info_text: string;
    error_loading_cards: string;
    remove_success_msg: string;
    remove_failure_msg: string;
    added_success_msg: string;
  };

  @Input() userAccounts: { account: UserAccount; display: string; iconSrc: string }[] = [];
  noCreditCardFound: boolean;
  constructor(
    private externalPaymentService: ExternalPaymentService,
    private loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly accountService: AccountsService,
  ) {}

  ngOnInit() {}

  async addCreditCard() {
    alert("bobo")
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
      this.loadingService.closeSpinner();
    }
  }

  private async showMessage(message: string, duration = 5000) {
    await this.toastService.showToast({ message, duration });
  }

  async retrieveAccounts() {
    this.loadingService.showSpinner();
    const accounts = await firstValueFrom(
      this.accountService.getUserAccounts([PaymentSystemType.MONETRA, PaymentSystemType.USAEPAY])
    )
      .then(accounts => accounts.map(acc => this.buildStr(acc)))
      .finally(() => this.loadingService.closeSpinner());
    this.noCreditCardFound = !accounts.length;
    return accounts;
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
