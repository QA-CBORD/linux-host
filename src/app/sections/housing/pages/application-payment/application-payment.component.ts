import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { AccountsType, CardCs } from '@sections/settings/creditCards/credit-card-mgmt/card-list/credit-card-list.component';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { take } from 'rxjs/operators';
import { ConfirmFeePopover } from './confirm-fee-popover/confirm-fee-popover.component';
import { SuccessfulPaymentModal } from './successful-payment-modal/successful-payment-modal.component';

@Component({
  selector: 'st-application-payment',
  templateUrl: './application-payment.component.html',
  styleUrls: ['./application-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationPaymentComponent implements OnInit {
  @Input() contentStrings: CardCs;
  @Input() userAccounts: AccountsType = [];
  @Input() amount: number;
  control: AbstractControl;

  constructor(
    private loadingService: LoadingService,
    private readonly depositService: DepositService,
    private readonly creditCard: CreditCardService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly popoverCtrl: PopoverController,
    private readonly modalCtrl: ModalController,
    private readonly toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.control = new FormControl(this.amount);
    this.control.disable();
    this.control.markAsPristine();  
  }

  async addCreditCard() {
    await this.creditCard.addCreditCard();
    this.userAccounts = await this.creditCard.retrieveAccounts();
  }

  confirmationPayment(acc: any) {
    this.confirmationPaymentPopover(acc);
  }

  async confirmationPaymentPopover(acc?: any) {
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
      component: ConfirmFeePopover,
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
         this.depositService.feePayment(acc.account?.id, this.amount.toString()).pipe(take(1)).subscribe(async () => {
          await this.successfulPayment(data);
         }, () => {
             this.toastCtrl.create({ message: "Something went wrong."});
         });
      
        } else { 
          this.cdRef.detectChanges();
        }
      })  
      .catch();
    return await popover.present();
  }

  private async successfulPayment(
    data: any,
  ) {

  const modal = await this.modalCtrl.create({
      component: SuccessfulPaymentModal,
      componentProps: {
        data,
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.present();
  }
}
