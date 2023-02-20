import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSelect, ModalController, PopoverController } from '@ionic/angular';
import { map, switchMap, take, tap, finalize } from 'rxjs/operators';
import {
  ACCOUNTS_VALIDATION_ERRORS,
  ACCOUNT_TYPES,
  LOCAL_ROUTING,
  PAYMENT_SYSTEM_TYPE,
  PAYMENT_TYPE,
} from '../../accounts.config';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { iif, Observable, of, Subscription, throwError, from } from 'rxjs';
import { UserAccount } from '@core/model/account/account.model';
import { ConfirmDepositPopoverComponent } from '../../shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component';
import { DepositModalComponent } from '../../shared/ui-components/deposit-modal/deposit-modal.component';
import { BUTTON_TYPE } from 'src/app/core/utils/buttons.config';
import { amountRangeValidator } from './amount-range.validator';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION, AccountType, Settings, DisplayName } from 'src/app/app.global';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { handleServerError, parseArrayFromString } from '@core/utils/general-helpers';
import { BillMeMapping } from '@core/model/settings/billme-mapping.model';
import { COMMA_REGEXP, CURRENCY_REGEXP, NUM_COMMA_DOT_REGEXP } from '@core/utils/regexp-patterns';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { ApplePayResponse, ApplePay } from '@core/model/add-funds/applepay-response.model';
import { Browser } from '@capacitor/browser';
import { ToastService } from '@core/service/toast/toast.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { DepositCsModel } from './deposit-page.content.string';
import { CommonService } from '@shared/services/common.service';

export enum browserState {
  FINISHED = 'browserFinished',
}

const dropdown = {
  PAYMENT: /payment/,
  ACCOUNT: /account/,
  DEPOSIT: /deposit/,
};

@Component({
  selector: 'st-deposit-page',
  templateUrl: './deposit-page.component.html',
  styleUrls: ['./deposit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositPageComponent implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  private activePaymentType: PAYMENT_TYPE;
  focusLine = false;
  depositSettings: SettingInfo[];
  depositForm: FormGroup;
  creditCardSourceAccounts: Array<UserAccount>;
  creditCardDestinationAccounts: Array<UserAccount>;
  billmeDestinationAccounts: Array<UserAccount>;
  destinationAccounts: Array<UserAccount>;
  billmeMappingArr: BillMeMapping[];
  isDepositing = false;
  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: DisplayName.APPLEPAY,
    isActive: true,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentString: DepositCsModel = {} as any;
  applePayEnabled$: Observable<boolean>;
  customActionSheetOptions = {
    cssClass: 'custom-deposit-actionSheet',
  };

  customActionSheetPaymentOptions = {
    cssClass: 'custom-deposit-actionSheet custom-deposit-actionSheet-last-btn',
  };

  @ViewChild('paymentMethod', { static: true }) selectPayment: IonSelect;
  @ViewChild('toAccount', { static: true }) selectAccount: IonSelect;
  @ViewChild('toDeposit') selectDeposit: IonSelect;

  constructor(
    private readonly depositService: DepositService,
    private readonly fb: FormBuilder,
    private readonly popoverCtrl: PopoverController,
    private readonly modalController: ModalController,
    private readonly toastService: ToastService,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly userFacadeService: UserFacadeService,
    private externalPaymentService: ExternalPaymentService,
    private readonly a11yService: AccessibilityService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.depositService.settings$.pipe(take(1)).subscribe(depositSettings => (this.depositSettings = depositSettings));
    this.initForm();
    this.getAccounts();
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.contentString = this.commonService.getString(ContentStringCategory.deposit);
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get isFreeFromDepositEnabled$(): Observable<boolean> {
    return this.depositService.settings$.pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          Settings.Setting.FREEFORM_DEPOSIT_ENABLED.split('.')[2]
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  get isAllowFreeFormBillMe$(): Observable<boolean> {
    return this.depositService.settings$.pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          Settings.Setting.BILLME_FREEFORM_ENABLED.split('.')[2]
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  get isFreeFormEnabled$(): Observable<boolean> {
    return iif(
      () => this.activePaymentType === PAYMENT_TYPE.BILLME,
      this.isAllowFreeFormBillMe$,
      this.isFreeFromDepositEnabled$
    );
  }

  get billMeAmounts$(): Observable<string[]> {
    return this.depositService.settings$.pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          Settings.Setting.BILLME_AMOUNTS.split('.')[2]
        );

        return settingInfo ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  get oneTimeAmounts$(): Observable<string[]> {
    return this.depositService.settings$.pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD.split('.')[2]
        );

        return settingInfo ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  get amountsForSelect$() {
    return iif(() => this.activePaymentType === PAYMENT_TYPE.BILLME, this.billMeAmounts$, this.oneTimeAmounts$);
  }

  get isBillMePaymentTypesEnabled(): boolean {
    const billMePaymentTypesEnabled = this.getSettingByName(
      this.depositSettings,
      Settings.Setting.PAYMENT_TYPES.split('.')[2]
    );

    return JSON.parse(billMePaymentTypesEnabled).indexOf(PAYMENT_TYPE.BILLME) !== -1;
  }

  get isCreditCardPaymentTypesEnabled(): boolean {
    const billMePaymentTypesEnabled = this.getSettingByName(
      this.depositSettings,
      Settings.Setting.PAYMENT_TYPES.split('.')[2]
    );

    return JSON.parse(billMePaymentTypesEnabled).indexOf(PAYMENT_TYPE.CREDIT) !== -1;
  }

  get minMaxOfAmmounts() {
    const minAmountbillme = this.getSettingByName(
      this.depositSettings,
      Settings.Setting.BILLME_AMOUNT_MIN.split('.')[2]
    );
    const maxAmountbillme = this.getSettingByName(
      this.depositSettings,
      Settings.Setting.BILLME_AMOUNT_MAX.split('.')[2]
    );
    const minAmountOneTime = this.getSettingByName(
      this.depositSettings,
      Settings.Setting.CREDITCARD_AMOUNT_MIN.split('.')[2]
    );
    const maxAmountOneTime = this.getSettingByName(
      this.depositSettings,
      Settings.Setting.CREDITCARD_AMOUNT_MAX.split('.')[2]
    );

    return {
      minAmountbillme,
      maxAmountbillme,
      minAmountOneTime,
      maxAmountOneTime,
    };
  }

  get mainFormInput(): AbstractControl {
    return this.depositForm.get('mainInput');
  }

  get fromAccountCvv(): AbstractControl {
    return this.depositForm.get('fromAccountCvv');
  }

  get isCVVfieldShow(): boolean {
    const sourceAcc = this.depositForm.get('sourceAccount').value;

    return (
      sourceAcc &&
      (sourceAcc !== PAYMENT_TYPE.BILLME || sourceAcc !== 'newCreditCard') &&
      sourceAcc.accountType === ACCOUNT_TYPES.charge &&
      sourceAcc.paymentSystemType !== PAYMENT_SYSTEM_TYPE.USAEPAY
    );
  }

  get paymentTypes() {
    return PAYMENT_TYPE;
  }

  formatInput(event) {
    const { value } = event.target;
    const index = value.indexOf('.');
    if (!NUM_COMMA_DOT_REGEXP.test(value)) {
      this.depositForm.get('mainInput').setValue(value.slice(0, value.length - 1));
    }

    if (index !== -1 && value.slice(index + 1).length > 1) {
      this.depositForm.get('mainInput').setValue(value.slice(0, index + 2));
    }
  }

  onFormSubmit() {
    if ((this.depositForm && this.depositForm.invalid) || this.isDepositing) return;
    this.isDepositing = true;
    const { sourceAccount, selectedAccount, mainInput, mainSelect } = this.depositForm.value;
    const isBillme: boolean = sourceAccount === PAYMENT_TYPE.BILLME;
    const isApplePay: boolean = sourceAccount.accountType === AccountType.APPLEPAY;
    const sourceAccForBillmeDeposit: Observable<UserAccount> = this.sourceAccForBillmeDeposit(
      selectedAccount,
      this.billmeMappingArr
    );
    let amount = mainInput || mainSelect;
    amount = amount.toString().replace(COMMA_REGEXP, '');
    if (isApplePay) {
      Browser.addListener(browserState.FINISHED, () => {
        this.isDepositing = false;
        this.cdRef.detectChanges();
        Browser.removeAllListeners();
      });

      this.externalPaymentService
        .payWithApplePay(ApplePay.DEPOSITS_WITH_APPLE_PAY, {
          accountId: selectedAccount.id,
          depositAmount: amount,
        })
        .then((result: ApplePayResponse) => {
          if (result.success) {
            this.finalizeDepositModal(result);
          }
        })
        .catch(async () => {
          this.onErrorRetrieve('Something went wrong, please try again...');
        })
        .finally(() => {
          this.isDepositing = false;
        });
    } else {
      iif(() => isBillme, sourceAccForBillmeDeposit, of(sourceAccount))
        .pipe(
          switchMap((sourceAcc) => {
            const calculateDepositFee: Observable<number> = this.depositService.calculateDepositFee(
              sourceAcc.id,
              selectedAccount.id,
              amount
            );

            return iif(() => isBillme, of(0), calculateDepositFee).pipe(
              map(valueFee => ({ fee: valueFee, sourceAcc, selectedAccount, amount, billme: isBillme }))
            );
          }),
          take(1)
        )
        .subscribe(
          (info) => this.confirmationDepositPopover({ ...info }),
          () => {
            this.loadingService.closeSpinner();
            this.onErrorRetrieve('Something went wrong, please try again...');
            this.isDepositing = false;
          }
        );
    }
  }

  setFormValidators() {
    const minMaxValidators =
      this.activePaymentType !== PAYMENT_TYPE.CREDIT
        ? [amountRangeValidator(+this.minMaxOfAmmounts.minAmountbillme, +this.minMaxOfAmmounts.maxAmountbillme)]
        : [amountRangeValidator(+this.minMaxOfAmmounts.minAmountOneTime, +this.minMaxOfAmmounts.maxAmountOneTime)];

    this.isFreeFormEnabled$.pipe(take(1)).subscribe(data => {
      const sourceAcc = this.depositForm.get('sourceAccount').value;
      this.depositForm.controls['mainSelect'].clearValidators();
      this.depositForm.controls['mainSelect'].setErrors(null);
      this.resolveCVVValidators(sourceAcc);

      if (sourceAcc === 'newCreditCard') {
        this.depositForm.reset();
        const paymentSystem = this.getSettingByName(
          this.depositSettings,
          Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE.split('.')[2]
        );

        if (parseInt(paymentSystem) === PAYMENT_SYSTEM_TYPE.MONETRA) {
          this.router.navigate([PATRON_NAVIGATION.accounts, LOCAL_ROUTING.addCreditCard]);
          return;
        }

        return from(this.externalPaymentService.addUSAePayCreditCard())
          .pipe(
            switchMap(({ success, errorMessage }) => {
              if (!success) {
                return throwError(errorMessage);
              }

              this.loadingService.showSpinner();
              return this.depositService.getUserAccounts();
            }),
            take(1)
          )
          .subscribe(
            () => {
              return;
            },
            () => this.loadingService.closeSpinner()
          );
      }

      if (data) {
        this.depositForm.controls['mainInput'].setValidators([
          Validators.required,
          ...minMaxValidators,
          Validators.pattern(CURRENCY_REGEXP),
        ]);
      } else {
        this.depositForm.controls['mainSelect'].setValidators([Validators.required]);
        this.mainFormInput.clearValidators();
        this.mainFormInput.setErrors(null);
        this.resetControls(['mainSelect', 'mainInput']);
      }
      this.depositForm.controls['mainSelect'].setValue(0);
    });
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

  private resolveCVVValidators(sourceAcc: UserAccount | number) {
    if (sourceAcc !== PAYMENT_TYPE.BILLME && this.isCVVfieldShow) {
      this.depositForm.controls['fromAccountCvv'].setValidators([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[0-9.-]*'),
      ]);
      this.depositForm.controls['fromAccountCvv'].reset();
      return;
    }
    this.depositForm.controls['fromAccountCvv'].setErrors(null);
    this.depositForm.controls['fromAccountCvv'].clearValidators();
  }

  private getAccounts() {
    const subscription = this.depositService.settings$
      .pipe(
        map(settings => {
          const depositTenders = this.getSettingByName(settings, Settings.Setting.DEPOSIT_TENDERS.split('.')[2]);
          const billmeMappingArr = this.getSettingByName(settings, Settings.Setting.BILLME_MAPPING.split('.')[2]);

          return {
            depositTenders: parseArrayFromString<string>(depositTenders),
            billmeMappingArr: parseArrayFromString<BillMeMapping>(billmeMappingArr),
          };
        }),
        switchMap(({ depositTenders, billmeMappingArr }) =>
          this.depositService.accounts$.pipe(
            tap(accounts => {
              this.billmeMappingArr = billmeMappingArr;
              this.creditCardSourceAccounts = this.filterAccountsByPaymentSystem(accounts);
              this.creditCardDestinationAccounts = this.filterCreditCardDestAccounts(
                depositTenders as string[],
                accounts
              );
              this.billmeDestinationAccounts = this.filterBillmeDestAccounts(this.billmeMappingArr, accounts);
              this.cdRef.markForCheck();
            })
          )
        )
      )
      .subscribe(() => {
        this.defineDestAccounts(PAYMENT_TYPE.CREDIT);
      });
    this.sourceSubscription.add(subscription);
  }

  onPaymentMethodChanged({ target }) {
    this.defineDestAccounts(target.value);
    const { submitButtonText } = this.contentString;
    this.resetControls(['mainSelect', 'mainInput', 'selectedAccount']);
    this.setFormValidators();
    document.getElementById('depositBtnText').innerHTML = submitButtonText;
  }

  onAmountChanged(event) {
    const amount: string = event.target?.value;
    const { submitButtonText } = this.contentString;
    document.getElementById('depositBtnText').innerHTML =
      amount && amount.length ? `${submitButtonText} $` + amount : submitButtonText;
  }

  async confirmationDepositPopover(data) {
    const { confirmDepositCs: contentString } = this.contentString;
    const popover = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: ConfirmDepositPopoverComponent,
      componentProps: {
        data,
        contentString,
      },
      animated: false,
      backdropDismiss: false,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.loadingService.showSpinner();
        this.depositService
          .deposit(data.sourceAcc.id, data.selectedAccount.id, data.amount, this.fromAccountCvv.value)
          .pipe(
            handleServerError<string>(ACCOUNTS_VALIDATION_ERRORS),
            take(1),
            finalize(() => {
              this.loadingService.closeSpinner();
              this.isDepositing = false;
            })
          )
          .subscribe(
            () => this.finalizeDepositModal(data),
            error => this.onErrorRetrieve(error || 'Your information could not be verified.')
          );
      }
      if (role === BUTTON_TYPE.CANCEL) {
        this.isDepositing = false;
        this.cdRef.detectChanges();
      }
    });

    return await popover.present();
  }

  trackByAccountId(i: number): string {
    return `${i}-${Math.random()}`;
  }

  openWithVoiceOver(selector: string) {
    this.a11yService.isVoiceOverClick$.then(value => {
      if (value) {
        if (dropdown.PAYMENT.test(selector)) return this.selectPayment.open();
        if (dropdown.ACCOUNT.test(selector)) return this.selectAccount.open();
        if (dropdown.DEPOSIT.test(selector)) return this.selectDeposit.open();
      }
    });
  }

  private resetControls(controlNames: string[]) {
    controlNames.forEach(
      controlName => this.depositForm.contains(controlName) && this.depositForm.get(controlName).reset()
    );
  }

  private defineDestAccounts(target) {
    this.activePaymentType =
      target instanceof Object ? PAYMENT_TYPE.CREDIT : typeof target === 'string' ? this.activePaymentType : target;
    this.destinationAccounts =
      target === PAYMENT_TYPE.BILLME ? this.billmeDestinationAccounts : this.creditCardDestinationAccounts;
  }

  private async finalizeDepositModal(data): Promise<void> {
    const { depositSuccessCs: contentString } = this.contentString;
    const modal = await this.modalController.create({
      component: DepositModalComponent,
      animated: true,
      componentProps: {
        data,
        contentString,
      },
    });
    modal.onDidDismiss().then(() => {
      this.depositForm.reset();
      this.router.navigate([PATRON_NAVIGATION.accounts]);
    });

    await modal.present();
  }

  private async onErrorRetrieve(message: string) {
    await this.toastService.showError(message);
  }

  private filterAccountsByPaymentSystem(accounts): Array<UserAccount> {
    return this.depositService.filterAccountsByPaymentSystem(accounts);
  }

  private filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterCreditCardDestAccounts(tendersId, accounts);
  }

  private filterBillmeDestAccounts(
    billmeMappingArr: Array<BillMeMapping>,
    accounts: Array<UserAccount>
  ): Array<UserAccount> {
    return this.depositService.filterBillmeDestAccounts(billmeMappingArr, accounts);
  }

  private sourceAccForBillmeDeposit(
    selectedAccount: UserAccount,
    billmeMappingArr: Array<BillMeMapping>
  ): Observable<UserAccount> {
    return this.depositService.sourceAccForBillmeDeposit(selectedAccount, billmeMappingArr);
  }

  private getSettingByName(settings, property: string) {
    const depositSetting = this.depositService.getSettingByName(settings, property);
    return depositSetting.value;
  }
}
