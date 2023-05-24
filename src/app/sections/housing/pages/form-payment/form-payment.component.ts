import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { UserAccount } from '@core/model/account/account.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ModalController, PopoverController } from '@ionic/angular';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import {
  CardCs,
} from '@sections/settings/creditCards/credit-card-mgmt/card-list/credit-card-list.component';
import { defaultCreditCardMgmtCs } from '@shared/model/content-strings/default-strings';
import { AccountsConf, CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { take } from 'rxjs/operators';
import { ConfirmPaymentPopover } from './confirm-payment-popover/confirm-payment-popover.component';
import { SuccessfulPaymentModal } from './successful-payment-modal/successful-payment-modal.component';
import { ContractsService } from '@sections/housing/contracts/contracts.service';
import { FormType } from './form-payment.service';
import { Location } from '@angular/common';
import { ApplicationDetails } from '@sections/housing/applications/applications.model';
import { ContractDetails } from '@sections/housing/contracts/contracts.model';
import { TransactionalData } from './transactional-data.model';
import { ToastService } from '@core/service/toast/toast.service';

export interface CurrentForm {
  key: number,
  details: ApplicationDetails | ContractDetails,
  formControl: FormControl,
  isSubmitted?: boolean,
  type: 'application' | 'work-order',
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
    private readonly toastService:ToastService,
    private readonly popoverCtrl: PopoverController,
    private readonly modalCtrl: ModalController,
    private readonly applicationsService: ApplicationsService,
    private readonly loadingService: LoadingService,
    private readonly cdRef: ChangeDetectorRef,
    private contractsService: ContractsService,
    private location: Location
  ) {}

  async ngOnInit() {
    this.contentStrings = defaultCreditCardMgmtCs;
    this.currentForm = <CurrentForm>history.state.currentForm;
    this.userAccounts = <AccountsConf[]>history.state.userAccounts;
    this.control = this.initFormControl();
  }

  ionViewDidEnter() {
    this.loadingService.closeSpinner();
  }

  async addCreditCard() {
    await this.creditCardService.addCreditCard();
    this.userAccounts = await this.creditCardService.retrieveAccounts();
    this.cdRef.detectChanges();
  }

  async confirmPayment(cardInfo?: AccountsConf) {
    const info: TransactionalData = this.buildTransactionInfo(cardInfo?.account, this.amountDue);
    const popover = await this.confirmPaymentPopover(info);
    popover.onDidDismiss().then(({ role }) => {
      this.onConfirmation(role, cardInfo?.account, this.amountDue, info);
    });
    await popover.present();
  }

  private onConfirmation(role: string, account: UserAccount, amount: string, info: TransactionalData) {
    if (role === BUTTON_TYPE.OKAY) {
    this.loadingService.showSpinner();
      this.makePayment(account.id, amount).pipe(take(1)).subscribe(
        () => {
          this.onPaymentSuccess(info);
        },
        (err) => {
          this.showErrorMessage(err);
        }
      );
    }
  }

  onBack() {
    this.location.back();
  }

  private async confirmPaymentPopover(data: TransactionalData) {
    return this.popoverCtrl.create({
      component: ConfirmPaymentPopover,
      componentProps: {
        data,
        showDisclaimer: this.showDisclaimer()
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
    this.toastService.showError(err, 5000);
    this.loadingService.closeSpinner();
  }

  private async onPaymentSuccess(transaction: TransactionalData) {
    if (this.currentForm.type === FormType.Application) {
      this.applicationsService.submitApplication(this.currentForm).pipe(take(1)).subscribe(async () => {
        await this.openPaymentSuccessModal(transaction);
      });

    } else if (this.currentForm.type === FormType.WorkOrder) {
      this.contractsService.submitContract(this.currentForm.key, (<ContractDetails> this.currentForm.details)?.formKey).pipe(take(1)).subscribe(async () => {
        await this.openPaymentSuccessModal(transaction);
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
    this.loadingService.closeSpinner();
  }

  get formTitle(): string {
    if (this.currentForm.type === FormType.Application) {
      return (<ApplicationDetails> this.currentForm.details).applicationDefinition.applicationTitle;
    } else if (this.currentForm.type === FormType.WorkOrder) {
      return (<ContractDetails> this.currentForm.details).contractInfo.contractName;
    }
  }

  get amountDue(): string {
    if (this.currentForm.type === FormType.Application) {
      return (<ApplicationDetails> this.currentForm.details).applicationDefinition.amount.toFixed(2);
    } else if (this.currentForm.type === FormType.WorkOrder) {
      return (<ContractDetails> this.currentForm.details).amount.toFixed(2);
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

  private initFormControl() {
    const control = new FormControl(this.amountDue);
    control.disable();
    return control;
  }

  private showDisclaimer(): boolean {
    if (this.currentForm.type === FormType.Application) {
       return !(<ApplicationDetails> this.currentForm.details).applicationDefinition.canEdit;
    }

    return false;
  }
}
