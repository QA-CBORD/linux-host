import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { UserAccount } from '@core/model/account/account.model';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import {
  AccountsType,
  CardCs,
} from '@sections/settings/creditCards/credit-card-mgmt/card-list/credit-card-list.component';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { take } from 'rxjs/operators';
import { CurrentApplication as CurrentForm } from '../application-details/application-details.page';
import { ConfirmPaymentPopover } from './confirm-payment-popover/confirm-payment-popover.component';
import { SuccessfulPaymentModal } from './successful-payment-modal/successful-payment-modal.component';

export interface CreditCardItem {
  display: string;
  account: UserAccount;
  iconSrc: string;
}

export interface TransactionalData {
  sourceAcc: {
    accountTender: string;
    lastFour: string;
  };
  selectedAccount: {
    accountDisplayName: string;
    accountType: number;
  };
  amount: string;
}

@Component({
  selector: 'st-application-payment',
  templateUrl: './application-payment.component.html',
  styleUrls: ['./application-payment.component.scss'],
})
export class ApplicationPaymentComponent implements OnInit {
  @Input() contentStrings: CardCs;
  @Input() userAccounts: AccountsType = [];
  @Input() currentForm: CurrentForm;
  control: AbstractControl;

  constructor(
    private readonly depositService: DepositService,
    private readonly creditCardService: CreditCardService,
    private readonly popoverCtrl: PopoverController,
    private readonly modalCtrl: ModalController,
    private applicationsService: ApplicationsService
  ) {}

  ngOnInit() {
    this.control = new FormControl(this.getAmount);
    this.control.disable();
  }

  async addCreditCard() {
    await this.creditCardService.addCreditCard();
    this.userAccounts = await this.creditCardService.retrieveAccounts();
  }

  async confirmPayment(cardInfo?: CreditCardItem) {
    const info: TransactionalData = this.buildTransactionInfo(cardInfo?.account, this.getAmount);
    const popover = await this.confirmPaymentPopover(info);
    popover.onDidDismiss().then(async ({ role }) => {
      this.onConfirmation(role, cardInfo?.account, this.getAmount, info);
    });
    await popover.present();
  }

  private onConfirmation(role: string, account: UserAccount, amount: string, info: TransactionalData) {
    if (role == BUTTON_TYPE.OKAY) {
      this.makePayment(account.id, amount).subscribe(
        async () => {
          await this.onPaymentSuccess(info);
        },
        () => {
          this.showErrorMessage();
        }
      );
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  private async confirmPaymentPopover(data: TransactionalData) {
    return await this.popoverCtrl.create({
      component: ConfirmPaymentPopover,
      componentProps: {
        data,
      },
      cssClass: 'large-popover',
      animated: false,
      backdropDismiss: false,
    });
  }

  private makePayment(accountId: string, amount: string) {
    return this.depositService.makePayment(accountId, amount).pipe(take(1));
  }

  private async showErrorMessage() {
    await this.creditCardService.showMessage('Something went wrong, please try again...');
  }

  private async onPaymentSuccess(transaction: TransactionalData) {
    this.applicationsService.submitApplication(this.currentForm).pipe(take(1)).subscribe(async () =>  await this.openPaymentSuccessModal(transaction));
  }

  private async openPaymentSuccessModal(data: TransactionalData) {
    this.dismiss();
    const modal = await this.modalCtrl.create({
      component: SuccessfulPaymentModal,
      componentProps: {
        data,
        title: this.applicationTitle,
      },
      animated: false,
      backdropDismiss: false,
    });
    modal.present();
  }

  get applicationTitle(): string {
    return this.currentForm.details.applicationDefinition.applicationTitle;
  }

  get getAmount(): string {
    return this.currentForm.details.applicationDefinition.amount.toFixed(2);
  }

  private buildTransactionInfo(account: UserAccount, amount: string): TransactionalData {
    return {
      sourceAcc: {
        accountTender: account.accountTender,
        lastFour: account.lastFour,
      },
      selectedAccount: {
        accountDisplayName: account.accountDisplayName,
        accountType: account.accountType,
      },
      amount: amount,
    };
  }
}
