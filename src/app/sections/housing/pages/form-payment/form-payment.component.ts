import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { UserAccount } from '@core/model/account/account.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ModalController, PopoverController } from '@ionic/angular';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { HousingService } from '@sections/housing/housing.service';
import {
  CardCs,
} from '@sections/settings/creditCards/credit-card-mgmt/card-list/credit-card-list.component';
import { defaultCreditCardMgmtCs } from '@shared/model/content-strings/default-strings';
import { AccountsConf, CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { take } from 'rxjs/operators';
import { ConfirmPaymentPopover } from './confirm-payment-popover/confirm-payment-popover.component';
import { SuccessfulPaymentModal } from './successful-payment-modal/successful-payment-modal.component';
import { ContractsService } from '@sections/housing/contracts/contracts.service';
import { ThisReceiver } from '@angular/compiler';


export const FormType = {
  Application: 'application',
  WorkOrder: 'work-order'
}
export interface CurrentForm {
  key: number,
  details: any,
  formValue: FormControl,
  isSubmitted: boolean,
  type: 'application' | 'work-order'
}

interface TransactionalData {
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
  selector: 'st-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPaymentComponent implements OnInit {
  contentStrings: CardCs;
  userAccounts: AccountsConf[] = [];
  currentForm: CurrentForm;
  control: AbstractControl;

  constructor(
    private readonly depositService: DepositService,
    private readonly creditCardService: CreditCardService,
    private readonly popoverCtrl: PopoverController,
    private readonly modalCtrl: ModalController,
    private readonly applicationsService: ApplicationsService,
    private readonly loadingService: LoadingService,
    private readonly cdRef: ChangeDetectorRef,
    private housingService: HousingService,
    private contractsService: ContractsService,
  ) {}

  ngOnInit() {
    this.contentStrings = defaultCreditCardMgmtCs;
    this.userAccounts = <AccountsConf[]>history.state.userAccounts; 
    this.currentForm = <CurrentForm>history.state.currentForm;
    this.control = this.initFormControl();
    this.control.disable();
  }

  private initFormControl() {
     return new FormControl(this.amountDue);
  }

  async addCreditCard() {
    await this.creditCardService.addCreditCard();
    this.userAccounts = await this.creditCardService.retrieveAccounts();
    this.cdRef.detectChanges();
  }

  async confirmPayment(cardInfo?: AccountsConf) {
    const info: TransactionalData = this.buildTransactionInfo(cardInfo?.account, this.amountDue);
    const popover = await this.confirmPaymentPopover(info);
    popover.onDidDismiss().then(async ({ role }) => {
      this.onConfirmation(role, cardInfo?.account, this.amountDue, info);
    });
    await popover.present();
  }

  private onConfirmation(role: string, account: UserAccount, amount: string, info: TransactionalData) {
    if (role == BUTTON_TYPE.OKAY) {
    this.loadingService.showSpinner();
      this.makePayment(account.id, amount).subscribe(
        async () => {
          await this.onPaymentSuccess(info);
        },
        (err) => {
          this.showErrorMessage(err);
        }
      );
    }
  }

  async onBack() {
    this.housingService.handleSuccess();
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

  private async showErrorMessage(err: string) {
    await this.creditCardService.showMessage(err);
    this.loadingService.closeSpinner();
  }

  private async onPaymentSuccess(transaction: TransactionalData) {
    if(this.currentForm.type == FormType.Application) {
      this.applicationsService.submitApplication(this.currentForm).pipe(take(1)).subscribe(async () =>  { 
        await this.openPaymentSuccessModal(transaction); 
        this.loadingService.closeSpinner();
    }); 
    } else if (this.currentForm.type == FormType.WorkOrder) {
      this.contractsService.submitContract(this.currentForm.key).pipe(take(1)).subscribe(
        async () =>  { 
          await this.openPaymentSuccessModal(transaction); 
          this.loadingService.closeSpinner();
        });
    }
    
  }

  private async openPaymentSuccessModal(data: TransactionalData) {
    const modal = await this.modalCtrl.create({
      component: SuccessfulPaymentModal,
      componentProps: {
        data,
        title: this.formTitle,
      },
      animated: false,
      backdropDismiss: false,
    });
    modal.present();
  }

  get formTitle(): string {
    if(this.currentForm.type == FormType.Application) {
      return this.currentForm.details.applicationDefinition.applicationTitle;
    } else if (this.currentForm.type == FormType.WorkOrder) {
      return this.currentForm.details.contractInfo.contractName
    }
  }

  get amountDue(): string {
    if(this.currentForm.type == FormType.Application) {
      return this.currentForm.details.applicationDefinition.amount.toFixed(2);
    } else if (this.currentForm.type == FormType.WorkOrder) {
      return this.currentForm.details.amount.toFixed(2);
    }
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
