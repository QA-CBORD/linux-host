import { Injectable } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { CREDITCARD_ICONS, CREDITCARD_TYPE } from '@sections/accounts/accounts.config';
import { AccountsService } from '@sections/dashboard/services';
import { firstValueFrom } from 'rxjs';
import { PaymentSystemType } from 'src/app/app.global';

export interface AccountsConf {
  display: string;
  account: UserAccount;
  iconSrc: string;
}
@Injectable()
export class CreditCardService {
  constructor(
    private readonly externalPaymentService: ExternalPaymentService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly accountService: AccountsService,
    private readonly translateService: TranslateService
  ) {}

  async addCreditCard(): Promise<void> {
    await this.externalPaymentService
      .addUSAePayCreditCard()
      .then(() => this.loadingService.closeSpinner())
      .catch(errorMessage => this.showErrorMessage(errorMessage))
      .finally(() =>
        this.showSuccessMessage(this.translateService.instant('patron-ui.creditCardMgmt.added_success_msg'))
      );
  }

  private showSuccessMessage(message: string, duration = 5000) {
    this.toastService.showToast({ message, duration, icon: 'checkmark-circle', cssClass: 'toast-message-success' });
  }

  private showErrorMessage(message: string, duration = 5000) {
    this.toastService.showError(message, duration);
  }
  async showMessage(message: string, duration = 5000) {
    await this.toastService.showToast({ message, duration });
  }

  async retrieveAccounts(): Promise<AccountsConf[]> {
    this.loadingService.showSpinner();
    return firstValueFrom(this.accountService.getUserAccounts([PaymentSystemType.MONETRA, PaymentSystemType.USAEPAY]))
      .then(accounts => accounts.map(acc => this.buildStr(acc)))
      .finally(() => this.loadingService.closeSpinner());
  }

  removeCreditCardAccount(userAccount: UserAccount): Promise<boolean> {
    return this.accountService.removeCreditCardAccount(userAccount);
  }

  private buildStr(account: UserAccount): AccountsConf {
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
