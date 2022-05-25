import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ModalController, PopoverController } from '@ionic/angular';
import { DepositService } from '@sections/accounts/services/deposit.service';
import {
  AccountsType as UserAccountType,
  CardCs,
} from '@sections/settings/creditCards/credit-card-mgmt/cards/cards.component';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { take } from 'rxjs/operators';
import { ConfirmPaymentPopover } from './confirm-payment-popover/confirm-fee-popover.component';
import { SuccessfulPaymentModal } from './successful-payment-modal/successful-payment-modal.component';

@Component({
  selector: 'st-application-payment',
  templateUrl: './application-payment.component.html',
  styleUrls: ['./application-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      component: ConfirmPaymentPopover,
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
         this.depositService.feePayment(acc.account?.id, this.amount.toString()).pipe(take(1)).subscribe((str) => {
             console.log(str)
         });
         // if success then
          await this.successfulPayment(data);
        } else { 
          this.cdRef.detectChanges();
        }
      })  
      .catch(err => console.log(err));
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
   // this.loadingService.showSpinner();
  }
}
