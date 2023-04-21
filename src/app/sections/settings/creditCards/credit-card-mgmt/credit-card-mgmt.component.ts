import { Component, Input, OnInit } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { AccountsConf, CreditCardService } from '../credit-card.service';
import { CardCs } from './card-list/credit-card-list.component';
import { CreditPaymentMethods } from '@core/model/account/credit-payment-methods.model';

@Component({
  selector: 'st-credit-card-mgmt',
  templateUrl: './credit-card-mgmt.component.html',
  styleUrls: ['./credit-card-mgmt.component.scss'],
})
export class CreditCardMgmtComponent implements OnInit {
  @Input() contentStrings: CardCs = {} as CardCs;
  @Input() userAccounts: AccountsConf[] = [];
  @Input() allowedPaymentsMethods: CreditPaymentMethods[];

  noCreditCardFound = false;

  constructor(
    private readonly modalControler: ModalController,
    private readonly creditCardService: CreditCardService,
    private loadingService: LoadingService,
    private readonly toastService: ToastService,
    protected readonly alertCtrl: AlertController,
    protected readonly popoverCtrl: PopoverController
  ) {}

  ngOnInit(): void {
    this.noCreditCardFound = !this.userAccounts.length;
  }

  async retrieveAccounts(): Promise<AccountsConf[]> {
    this.loadingService.showSpinner();
    const accounts = await this.creditCardService.retrieveAccounts();
    this.loadingService.closeSpinner();
    this.noCreditCardFound = !accounts.length;
    return accounts;
  }

  close(): void {
    this.modalControler.dismiss();
  }

  async onRemoveConfirmed(account: UserAccount, strings: CardCs): Promise<void> {
    this.loadingService.showSpinner();
    try {
      const isSuccess = await this.creditCardService.removeCreditCardAccount(account);
      this.userAccounts = await this.retrieveAccounts();
      if (isSuccess) {
        this.showSuccessMessage(strings.remove_success_msg);
      } else {
        this.showErrorMessage(strings.remove_failure_msg);
      }
    } catch (err) {
      this.showErrorMessage(strings.remove_failure_msg);
    } finally {
      this.loadingService.closeSpinner();
    }
  }

  removeAccount = async ({ account, display }): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const strings = this.contentStrings as any;
    const cardType = display.split(' ')[0];
    const modal = await this.popoverCtrl.create({
      component: ConfirmModalComponent,
      mode: 'md',
      cssClass: 'sc-popover',
      backdropDismiss: false,
      componentProps: {
        titleString: `Remove ${cardType}?`,
        bodyString: `Are you sure you want to remove your ${display}?`,
        primaryBtnText: strings.remove_card_btn,
        secondaryBtnText: strings.cancel_remove_card_btn,
        primaryBtnColor: 'danger',
        secondaryBtnColor: 'light',
        onClickPrimary: async () => {
          await this.onRemoveConfirmed(account, strings);
          await this.popoverCtrl.dismiss({});
        },
        onClickSecondary: async () => {
          await this.popoverCtrl.dismiss({});
        },
      },
    });

    await modal.present();
  };

  async addCreditCard(): Promise<void> {
    await this.creditCardService.addCreditCard();
    this.userAccounts = await this.retrieveAccounts();
  }

  private showSuccessMessage(message: string, duration = 5000) {
    this.toastService.showToast({ message, duration, icon: 'checkmark-circle', cssClass: 'toast-message-success' });
  }

  private showErrorMessage(message: string, duration = 5000) {
    this.toastService.showError(message, duration);
  }
}
