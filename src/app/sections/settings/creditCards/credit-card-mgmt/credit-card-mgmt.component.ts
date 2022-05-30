import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { CreditCardService } from '../credit-card.service';
import { AccountsType, CardCs } from './card-list/credit-card-list.component';

@Component({
  selector: 'st-credit-card-mgmt',
  templateUrl: './credit-card-mgmt.component.html',
  styleUrls: ['./credit-card-mgmt.component.scss'],
})
export class CreditCardMgmtComponent implements OnInit {
  @Input() contentStrings: CardCs;
  @Input() userAccounts: AccountsType = [];
  noCreditCardFound = false;

  constructor(
    private readonly modalControler: ModalController,
    private readonly creditCardService: CreditCardService,
    private loadingService: LoadingService,
    private readonly toastService: ToastService,
    protected readonly alertCtrl: AlertController,
    protected readonly popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.noCreditCardFound = !this.userAccounts.length;
  }

  async retrieveAccounts() {
    this.loadingService.showSpinner();
    const accounts = await this.creditCardService.retrieveAccounts();
    this.loadingService.closeSpinner();
    this.noCreditCardFound = !accounts.length;
    return accounts;
  }

  close() {
    this.modalControler.dismiss();
  }

  async removeAccount({ account, display }) {
    const strings = this.contentStrings as any;
    const onRemoveConfirmed = async () => {
      this.alertCtrl.dismiss();
      this.loadingService.showSpinner();
      try {
        const isSuccess = await this.creditCardService.removeCreditCardAccount(account);
        this.userAccounts = await this.retrieveAccounts();
        (isSuccess && this.showMessage(strings.remove_success_msg)) || this.showMessage(strings.remove_failure_msg);
      } catch (err) {
        this.showMessage(strings.remove_failure_msg);
      } finally {
        this.loadingService.closeSpinner();
      }
    };

    const cardType = display.split(' ')[0];
    const modal = await this.popoverCtrl.create({
      component: ConfirmModalComponent,
      mode: 'md',
      backdropDismiss: false,
      componentProps: {
        titleString: `Remove ${cardType}?`,
        bodyString: `Are you sure you want to remove your ${display}?`,
        primaryBtnText: strings.remove_card_btn,
        secondaryBtnText: strings.cancel_remove_card_btn,
        primaryBtnColor: 'danger',
        secondaryBtnColor: 'light',
        onClickPrimary: async () => {
          await onRemoveConfirmed();
          this.popoverCtrl.dismiss({});
        },
        onClickSecondary: () => {
          this.popoverCtrl.dismiss({});
        },
      },
    });

    await modal.present();
  }

  async addCreditCard() {
    await this.creditCardService.addCreditCard();
  }

  private async showMessage(message: string, duration = 5000) {
    await this.toastService.showToast({ message, duration });
  }
}
