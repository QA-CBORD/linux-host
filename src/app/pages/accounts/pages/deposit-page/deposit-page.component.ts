import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController, ModalController, ToastController } from '@ionic/angular';
import { DepositService } from '../../services/deposit.service';
import { tap, map, switchMap, take } from 'rxjs/operators';
import {
  SYSTEM_SETTINGS_CONFIG,
  PAYMENT_TYPE,
  PAYMENT_SYSTEM_TYPE,
  ACCOUNT_TYPES,
  LOCAL_ROUTING,
} from '../../accounts.config';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { Subscription, Observable, of, iif } from 'rxjs';
import { UserAccount } from '../../../../core/model/account/account.model';
import { ConfirmDepositPopoverComponent } from '../../shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component';
import { DepositModalComponent } from '../../shared/ui-components/deposit-modal/deposit-modal.component';
import { BUTTON_TYPE } from 'src/app/core/utils/buttons.config';
import { amountRangeValidator } from './amount-range.validator';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LoadingService } from 'src/app/core/service/loading/loading.service';

@Component({
  selector: 'st-deposit-page',
  templateUrl: './deposit-page.component.html',
  styleUrls: ['./deposit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositPageComponent implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  focusLine: boolean = false;
  depositSettings: SettingInfo[];
  depositForm: FormGroup;
  creditCardSourceAccounts: Array<UserAccount>;
  creditCardDestinationAccounts: Array<UserAccount>;
  billmeDestinationAccounts: Array<UserAccount>;
  destinationAccounts: Array<UserAccount>;
  presetDepositAmounts: Array<string>;
  billmeMappingArr: any[];
  isMaxCharLength: boolean = false;

  customActionSheetOptions: any = {
    cssClass: 'custom-deposit-actionSheet',
  };

  customActionSheetPaymentOptions: any = {
    cssClass: 'custom-deposit-actionSheet custom-deposit-actionSheet-last-btn',
  };

  constructor(
    private readonly depositService: DepositService,
    private readonly fb: FormBuilder,
    private readonly popoverCtrl: PopoverController,
    private readonly modalController: ModalController,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.depositService.settings$.pipe(take(1)).subscribe(depositSettings => (this.depositSettings = depositSettings));

    this.initForm();
    this.getAccounts();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get isFreeFromDepositEnabled() {
    const freeFromDepositEnabled = this.getSettingByName(
      this.depositSettings,
      SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled
    );

    return parseInt(freeFromDepositEnabled) === 1;
  }

  get isBillMePaymentTypesEnabled() {
    const billMePaymentTypesEnabled = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.paymentTypes);

    return JSON.parse(billMePaymentTypesEnabled).indexOf(PAYMENT_TYPE.BILLME) !== -1;
  }

  get presetDepositAmountsCreditCard() {
    const billMePaymentTypesEnabled = this.getSettingByName(
      this.depositSettings,
      SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard
    );

    return JSON.parse(billMePaymentTypesEnabled);
  }

  get presetDepositAmountsBillme() {
    const billMePaymentTypesEnabled = this.getSettingByName(
      this.depositSettings,
      SYSTEM_SETTINGS_CONFIG.presetDepositAmountsBillMe
    );

    return JSON.parse(billMePaymentTypesEnabled);
  }

  get minMaxOfAmmounts() {
    const minAmountbillme = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.minAmountbillme);
    // FIXME: fix it after backend apply his fixes with billme_maximum FIELD
    const maxAmountbillme = 100000;
    const minAmountOneTime = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.minAmountCreditCard);
    const maxAmountOneTime = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.maxAmountCreditCard);

    return {
      minAmountbillme,
      maxAmountbillme,
      minAmountOneTime,
      maxAmountOneTime,
    };
  }

  get mainFormInput() {
    return this.depositForm.get('mainInput');
  }

  get fromAccountCvv() {
    return this.depositForm.get('fromAccountCvv');
  }

  get isCVVfieldShow() {
    const sourceAcc = this.depositForm.get('sourceAccount').value;

    if (sourceAcc && (sourceAcc !== 'billme' || sourceAcc !== 'newCreditCard')) {
      return (
        sourceAcc.accountType === ACCOUNT_TYPES.charge && sourceAcc.paymentSystemType !== PAYMENT_SYSTEM_TYPE.USAEPAY
      );
    }
  }

  formatInput(event) {
    const { value } = event.target;
    const index = value.indexOf('.');
    const regex = /^[0-9.,]+$/;
    if (!regex.test(value)) {
      this.depositForm.get('mainInput').setValue(value.slice(0, value.length - 1));
    }

    if (index !== -1 && value.slice(index + 1).length > 1) {
      this.depositForm.get('mainInput').setValue(value.slice(0, index + 2));
    }
  }

  onFormSubmit() {
    const { sourceAccount, selectedAccount, mainInput, mainSelect } = this.depositForm.value;
    const isBillme: boolean = sourceAccount === 'billme';
    const regex = /[,\s]/g;
    const sourceAccForBillmeDeposit: Observable<UserAccount> = this.sourceAccForBillmeDeposit(
      selectedAccount,
      this.billmeMappingArr
    );
    let amount = mainInput || mainSelect;
    amount = amount.replace(regex, '');

    iif(() => isBillme, sourceAccForBillmeDeposit, of(sourceAccount))
      .pipe(
        switchMap(
          (sourceAcc): any => {
            const calculateDepositFee: Observable<number> = this.depositService.calculateDepositFee(
              sourceAcc.id,
              selectedAccount.id,
              amount
            );

            return iif(() => isBillme, of(0), calculateDepositFee).pipe(
              map(valueFee => ({ fee: valueFee, sourceAcc, selectedAccount, amount, billme: isBillme }))
            );
          }
        ),
        take(1)
      )
      .subscribe(info => this.confirmationDepositPopover(info));
  }

  setFormValidators() {
    if (this.isFreeFromDepositEnabled) {
      const sourceAcc = this.depositForm.get('sourceAccount').value;
      let minMaxValidators = [];
      switch (sourceAcc) {
        case 'billme':
          minMaxValidators = [
            amountRangeValidator(+this.minMaxOfAmmounts.minAmountbillme, +this.minMaxOfAmmounts.maxAmountbillme),
          ];
          this.depositForm.controls['fromAccountCvv'].setErrors(null);
          this.depositForm.controls['fromAccountCvv'].clearValidators();
          break;

        case 'newCreditCard':
          this.depositForm.reset();
          this.router.navigate([NAVIGATE.accounts, LOCAL_ROUTING.addCreditCard], { skipLocationChange: true });
          break;
        default:
          minMaxValidators = [
            amountRangeValidator(+this.minMaxOfAmmounts.minAmountOneTime, +this.minMaxOfAmmounts.maxAmountOneTime),
          ];
          this.depositForm.controls['fromAccountCvv'].setValidators([
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('[0-9.-]*'),
          ]);
      }

      this.depositForm.controls['mainInput'].setValidators([
        Validators.required,
        ...minMaxValidators,
        Validators.pattern('[0-9.,]+'),
      ]);
    } else {
      this.depositForm.controls['mainSelect'].setValidators([Validators.required]);
    }
  }

  private initForm() {
    this.depositForm = this.fb.group({
      mainInput: [''],
      mainSelect: [''],
      selectedAccount: ['', Validators.required],
      sourceAccount: ['', Validators.required],
      fromAccountCvv: [''],
    });

    this.setFormValidators();
  }

  private getAccounts() {
    const subscription = this.depositService.settings$
      .pipe(
        map(settings => {
          const depositTenders = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.depositTenders);
          const billmeMappingArr = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.billMeMapping);

          return {
            depositTenders: this.depositService.transformStringToArray(depositTenders),
            billmeMappingArr: this.depositService.transformStringToArray(billmeMappingArr),
          };
        }),
        switchMap(({ depositTenders, billmeMappingArr }) =>
          this.depositService.accounts$.pipe(
            tap(accounts => {
              this.billmeMappingArr = billmeMappingArr;
              (this.creditCardSourceAccounts = this.filterAccountsByPaymentSystem(accounts)),
                (this.creditCardDestinationAccounts = this.filterCreditCardDestAccounts(depositTenders, accounts)),
                (this.billmeDestinationAccounts = this.filterBillmeDestAccounts(this.billmeMappingArr, accounts));
            })
          )
        )
      )
      .subscribe(() => {
        this.defineDestAccounts('creditcard');
      });
    this.sourceSubscription.add(subscription);
  }

  onPaymentMethodChanged({ target }) {
    this.defineDestAccounts(target.value);

    this.depositForm.controls['mainSelect'].reset();
    this.setFormValidators();
  }

  async confirmationDepositPopover(data: any) {
    const popover = await this.popoverCtrl.create({
      component: ConfirmDepositPopoverComponent,
      componentProps: {
        data,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.loadingService.showSpinner();
        this.depositService
          .deposit(data.sourceAcc.id, data.selectedAccount.id, data.amount, this.fromAccountCvv.value)
          .pipe(
            tap(() => this.loadingService.closeSpinner()),
            take(1)
          )
          .subscribe(
            () => this.finalizeDepositModal(data),
            () => this.onErrorRetrieve('Your information could not be verified.')
          );
      }
    });

    return await popover.present();
  }

  private defineDestAccounts(target) {
    if (target === 'billme') {
      this.destinationAccounts = this.billmeDestinationAccounts;
      this.presetDepositAmounts = this.presetDepositAmountsBillme;
    } else {
      this.destinationAccounts = this.creditCardDestinationAccounts;
      this.presetDepositAmounts = this.presetDepositAmountsCreditCard;
    }
  }

  private async finalizeDepositModal(data): Promise<void> {
    const modal = await this.modalController.create({
      component: DepositModalComponent,
      animated: true,
      componentProps: {
        data,
      },
    });
    modal.onDidDismiss().then(() => {
      this.depositForm.reset();
      this.router.navigate([NAVIGATE.accounts], { skipLocationChange: true });
    });

    await modal.present();
  }

  trackByAccountId(i: number, { id }: UserAccount): string {
    return `${i}-${id}-${Math.random()}`;
  }

  private async onErrorRetrieve(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
    });
    toast.present();
  }

  private filterAccountsByPaymentSystem(accounts): Array<UserAccount> {
    return this.depositService.filterAccountsByPaymentSystem(accounts);
  }

  private filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterCreditCardDestAccounts(tendersId, accounts);
  }

  private filterBillmeDestAccounts(billmeMappingArr: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterBillmeDestAccounts(billmeMappingArr, accounts);
  }

  private sourceAccForBillmeDeposit(
    selectedAccount: UserAccount,
    billmeMappingArr: Array<string>
  ): Observable<UserAccount> {
    return this.depositService.sourceAccForBillmeDeposit(selectedAccount, billmeMappingArr);
  }

  private getSettingByName(settings, property) {
    const depositSetting = this.depositService.getSettingByName(settings, property.name);

    return depositSetting.value;
  }
}
