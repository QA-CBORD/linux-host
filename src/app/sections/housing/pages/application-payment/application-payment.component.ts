import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { UserAccount } from '@core/model/account/account.model';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ApplicationDetails } from '@sections/housing/applications/applications.model';
import { HousingService } from '@sections/housing/housing.service';
import {
  AccountsType,
  CardCs,
} from '@sections/settings/creditCards/credit-card-mgmt/card-list/credit-card-list.component';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { take } from 'rxjs/operators';
import { ConfirmFeePopover } from './confirm-fee-popover/confirm-fee-popover.component';
import { SuccessfulPaymentModal } from './successful-payment-modal/successful-payment-modal.component';

export interface AccountData {
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationPaymentComponent implements OnInit {
  @Input() contentStrings: CardCs;
  @Input() userAccounts: AccountsType = [];
  @Input() appDetails: ApplicationDetails;
  control: AbstractControl;

  constructor(
    private readonly depositService: DepositService,
    private readonly creditCard: CreditCardService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly popoverCtrl: PopoverController,
    private readonly modalCtrl: ModalController,
    private readonly toastCtrl: ToastController,
    private readonly housingService: HousingService
  ) {}

  ngOnInit() {
    this.control = new FormControl(
      this.getAmount());
    this.control.disable();
  }

  private getAmount() {
    return this.appDetails.applicationDefinition.amount.toString();
  }

  async addCreditCard() {
    await this.creditCard.addCreditCard();
    this.userAccounts = await this.creditCard.retrieveAccounts();
  }

  async confirmPayment(cardInfo?: AccountData) {
    const { account } = cardInfo;
    const amount = this.getAmount();
    const data: TransactionalData = {
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
    const popover = await this.confirmPaymentPopover(data);
    popover
      .onDidDismiss()
      .then(async ({ role }) => {
        if (role === BUTTON_TYPE.OKAY) {
          this.payFee(account.id, amount, data);
        } else {
          this.cdRef.detectChanges();
        }
      })
      .catch();
    return await popover.present();
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  private async confirmPaymentPopover(data: TransactionalData) {
    return await this.popoverCtrl.create({
      component: ConfirmFeePopover,
      componentProps: {
        data,
      },
      cssClass: 'large-popover',
      animated: false,
      backdropDismiss: false,
    });
  }

  private payFee(accountId: string, amount: string, data: TransactionalData) {
    this.depositService
      .feePayment(accountId, amount)
      .pipe(take(1))
      .subscribe(
        async () => {
          this.housingService.updatePaymentSuccess(this.appDetails);
          await this.onPaymentSuccess(data);
        },
        () => {
          this.toastCtrl.create({ message: 'Something went wrong.' });
        }
      );
  }

  private async onPaymentSuccess(data: TransactionalData) {
    this.dismiss();
    const modal = await this.modalCtrl.create({
      component: SuccessfulPaymentModal,
      componentProps: {
        data,
      },
      animated: false,
      backdropDismiss: false,
    });
    modal.present();
  }
}
