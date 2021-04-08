import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { ApplePay } from '@core/model/add-funds/applepay-response.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { ApplePayResponse } from '@core/provider/native-provider/native.provider';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { handleServerError, parseArrayFromString } from '@core/utils/general-helpers';
import { COMMA_REGEXP, CURRENCY_REGEXP, NUM_COMMA_DOT_REGEXP } from '@core/utils/regexp-patterns';
import { ModalController, PopoverController } from '@ionic/angular';
import { ACCOUNTS_VALIDATION_ERRORS, CONTENT_STRINGS, PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { amountRangeValidator } from '@sections/accounts/pages/deposit-page/amount-range.validator';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ConfirmDepositPopoverComponent } from '@sections/accounts/shared/ui-components/confirm-deposit-popover';
import { DepositModalComponent } from '@sections/accounts/shared/ui-components/deposit-modal';
import { MerchantAccountInfoList } from '@sections/ordering';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { from, Observable, of, Subscription, throwError } from 'rxjs';
import { finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { AccountType, DisplayName, PATRON_NAVIGATION, Settings } from 'src/app/app.global';

enum GUEST_FORM_CONTROL_NAMES {
  paymentMethod = 'paymentMethod',
  toAccount = 'toAccount',
  amountToDeposit = 'amountToDeposit',
  mainInput = 'mainInput',
}

const requiredSettings = [
  Settings.Setting.DEPOSIT_TENDERS,
  Settings.Setting.PAYMENT_TYPES,
  Settings.Setting.FREEFORM_DEPOSIT_ENABLED,
  Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD,
  Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE,
  Settings.Setting.CREDITCARD_AMOUNT_MIN,
  Settings.Setting.CREDITCARD_AMOUNT_MAX,
];

@Component({
  selector: 'st-guest-add-funds',
  templateUrl: './guest-add-funds.component.html',
  styleUrls: ['./guest-add-funds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestAddFundsComponent implements OnInit {
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: DisplayName.APPLEPAY,
    isActive: true,
  };

  isDepositing: boolean = false;
  detailsForm: FormGroup;
  topLabel: string;
  applePayEnabled$: Observable<boolean>;
  accountInfoList$: Observable<MerchantAccountInfoList>;
  accounts$: Observable<UserAccount[]>;
  depositSettings: SettingInfo[];
  creditCardDestinationAccounts: Array<UserAccount>;
  creditCardSourceAccounts: Array<UserAccount>;
  destinationAccounts: Array<UserAccount>;
  private activePaymentType: PAYMENT_TYPE;
  private readonly sourceSubscription: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly globalNav: GlobalNavService,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly depositService: DepositService,
    private readonly router: Router,
    private externalPaymentService: ExternalPaymentService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly modalController: ModalController,
    private readonly popoverCtrl: PopoverController,
  ) {}

  ngOnInit() {
    this.accounts$ = this.depositService.getUserAccounts();
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.depositService
      .getUserSettings(requiredSettings)
      .pipe(take(1))
      .subscribe(result => {
        this.depositSettings = result;
        console.log(`required settings: ${result}`)
      });

    this.initForm();
    this.initContentStrings();
    this.globalNav.hideNavBar();
  }

  ionViewWillEnter() {
    this.getAccounts();
    this.setFormValidators();
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
    this.globalNav.showNavBar();
  }

  initForm() {
    this.detailsForm = this.fb.group({
      [GUEST_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.toAccount]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.amountToDeposit]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.mainInput]: ['', Validators.required],
    });
  }

  onPaymentChanged({ target }) {
    this.defineDestAccounts(target.value);
    this.resetControls(['amountToDeposit', this.controlsNames.mainInput, 'selectedAccount']);
    document.getElementById('depositBtnText').innerHTML = 'Deposit';
  }

  formatInput(event) {
    const { value } = event.target;
    const index = value.indexOf('.');
    if (!NUM_COMMA_DOT_REGEXP.test(value)) {
      this.mainFormInput.setValue(value.slice(0, value.length - 1));
    }

    if (index !== -1 && value.slice(index + 1).length > 1) {
      this.mainFormInput.setValue(value.slice(0, index + 2));
    }
  }

  setFormValidators() {
    console.log('setFormValidators')
    const minMaxValidators = [
      amountRangeValidator(+this.minMaxOfAmounts.minAmountOneTime, +this.minMaxOfAmounts.maxAmountOneTime),
    ];

    this.isFreeFormEnabled$.pipe(take(1)).subscribe(data => {
      console.log('Data coming: ', data)
      const sourceAcc = this.detailsForm.get('paymentMethod').value;
      this.detailsForm.controls['amountToDeposit'].clearValidators();
      this.detailsForm.controls['amountToDeposit'].setErrors(null);

      if (sourceAcc === 'newCreditCard') {
        this.detailsForm.reset();

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
          .subscribe(() => {}, message => this.onErrorRetrieve(message), () => this.loadingService.closeSpinner());
      }

      if (data) {
        this.detailsForm.controls[this.controlsNames.mainInput].setValidators([
          Validators.required,
          ...minMaxValidators,
          Validators.pattern(CURRENCY_REGEXP),
        ]);
      } else {
        this.detailsForm.controls['amountToDeposit'].setValidators([Validators.required]);
        this.mainFormInput.clearValidators();
        this.mainFormInput.setErrors(null);
        this.resetControls(['amountToDeposit', this.controlsNames.mainInput]);
      }
      this.detailsForm.controls['amountToDeposit'].setValue(0);
    });
  }

  onFormSubmit() {
    if ((this.detailsForm && this.detailsForm.invalid) || this.isDepositing) return;
    this.isDepositing = true;
    const { sourceAccount, selectedAccount, mainInput, mainSelect } = this.detailsForm.value;
    const isBillme: boolean = sourceAccount === PAYMENT_TYPE.BILLME;
    const isApplePay: boolean = sourceAccount.accountType === AccountType.APPLEPAY;
    const depositReviewBillMe = this.depositService.getContentValueByName(
      CONTENT_STRINGS.billMeDepositReviewInstructions
    );
    const depositReviewCredit = this.depositService.getContentValueByName(
      CONTENT_STRINGS.creditDepositReviewInstructions
    );

    let amount = mainInput || mainSelect;
    amount = amount.toString().replace(COMMA_REGEXP, '');
    if (isApplePay) {
      Browser.addListener('browserFinished', (info: any) => {
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
          } else {
            this.onErrorRetrieve(result.errorMessage);
          }
        })
        .catch(async error => {
          this.onErrorRetrieve('Something went wrong, please try again...');
        })
        .finally(() => {
          this.isDepositing = false;
        });
    } else {
      of(sourceAccount)
        .pipe(
          switchMap(
            (sourceAcc): any => {
              const calculateDepositFee: Observable<number> = this.depositService.calculateDepositFee(
                sourceAcc.id,
                selectedAccount.id,
                amount
              );

              return calculateDepositFee.pipe(
                map(valueFee => ({ fee: valueFee, sourceAcc, selectedAccount, amount, billme: isBillme }))
              );
            }
          ),
          take(1)
        )
        .subscribe(
          info => this.confirmationDepositPopover({ ...info as {}, depositReviewBillMe, depositReviewCredit }),
          () => {
            this.loadingService.closeSpinner();
            this.onErrorRetrieve('Something went wrong, please try again...');
            this.isDepositing = false;
          }
        );
    }
  }
  
  async confirmationDepositPopover(data: any) {
    const popover = await this.popoverCtrl.create({
      component: ConfirmDepositPopoverComponent,
      componentProps: {
        data,
      },
      animated: false,
      backdropDismiss: false,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.loadingService.showSpinner();
        this.depositService
          .deposit(data.sourceAcc.id, data.selectedAccount.id, data.amount, null) // TODO: Check CVV Value
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
  
  get controlsNames() {
    return GUEST_FORM_CONTROL_NAMES;
  }

  get paymentMethod(): AbstractControl {
    return this.detailsForm.get(GUEST_FORM_CONTROL_NAMES.paymentMethod);
  }

  get toAccount(): AbstractControl {
    return this.detailsForm.get(GUEST_FORM_CONTROL_NAMES.toAccount);
  }

  get amountToDeposit(): AbstractControl {
    return this.detailsForm.get(GUEST_FORM_CONTROL_NAMES.amountToDeposit);
  }

  get mainFormInput(): AbstractControl {
    return this.detailsForm.get(GUEST_FORM_CONTROL_NAMES.mainInput);
  }

  get isFreeFormEnabled$(): Observable<boolean> {
    return this.isFreeFromDepositEnabled$;
  }

  get minMaxOfAmounts() {
    const minAmountOneTime = this.getSettingByName(
      this.depositSettings,
      Settings.Setting.CREDITCARD_AMOUNT_MIN.split('.')[2]
    );
    const maxAmountOneTime = this.getSettingByName(
      this.depositSettings,
      Settings.Setting.CREDITCARD_AMOUNT_MAX.split('.')[2]
    );

    return {
      minAmountOneTime,
      maxAmountOneTime,
    };
  }

  get isFreeFromDepositEnabled$(): Observable<boolean> {
    return this.depositService.getUserSettings(requiredSettings).pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          Settings.Setting.FREEFORM_DEPOSIT_ENABLED.split('.')[2]
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  get isCreditCardPaymentTypesEnabled(): boolean {
    return true;
  }

  get amountsForSelect$() {
    return this.oneTimeAmounts$;
  }
 
  get oneTimeAmounts$(): Observable<string[]> {
    return this.depositService
    .getUserSettings(requiredSettings).pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD.split('.')[2]
        );

        return settingInfo ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }
  private initContentStrings() {
    this.topLabel =
      'You are deposting to the account of {{ James Demo }}. If this is incorrect, go back to to Step 1 to identify the recipient';
  }

  private getAccounts() {
    const subscription = this.depositService
      .getUserSettings(requiredSettings)
      .pipe(
        map(settings => {
          const depositTenders = this.getSettingByName(settings, Settings.Setting.DEPOSIT_TENDERS.split('.')[2]);
          return {
            depositTenders: parseArrayFromString(depositTenders),
          };
        }),
        switchMap(({ depositTenders }) =>
          this.depositService.accounts$.pipe(
            tap(accounts => {
              this.creditCardSourceAccounts = this.filterAccountsByPaymentSystem(accounts);
              this.creditCardDestinationAccounts = this.filterCreditCardDestAccounts(
                depositTenders as string[],
                accounts
              );
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

  private getSettingByName(settings, property: string) {
    const depositSetting = this.depositService.getSettingByName(settings, property);
    return (depositSetting && depositSetting.value) || '';
  }

  private defineDestAccounts(target) {
    this.activePaymentType =
      target instanceof Object ? PAYMENT_TYPE.CREDIT : typeof target === 'string' ? this.activePaymentType : target;
    this.destinationAccounts = this.creditCardDestinationAccounts;
  }

  private filterAccountsByPaymentSystem(accounts): Array<UserAccount> {
    return this.depositService.filterAccountsByPaymentSystem(accounts);
  }
  private filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterCreditCardDestAccounts(tendersId, accounts);
  }

  private resetControls(controlNames: string[]) {
    controlNames.forEach(
      controlName => this.detailsForm.contains(controlName) && this.detailsForm.get(controlName).reset()
    );
  }

  private async onErrorRetrieve(message: string) {
    await this.toastService.showToast({ message, duration: 5000 });
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
      this.detailsForm.reset();
      this.router.navigate([PATRON_NAVIGATION.accounts]);
    });

    await modal.present();
  }
}
