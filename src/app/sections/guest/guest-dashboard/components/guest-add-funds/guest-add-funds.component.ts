import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { CURRENCY_REGEXP, NUM_COMMA_DOT_REGEXP } from '@core/utils/regexp-patterns';
import { ACCOUNT_TYPES, LOCAL_ROUTING, PAYMENT_SYSTEM_TYPE, PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { amountRangeValidator } from '@sections/accounts/pages/deposit-page/amount-range.validator';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { MerchantAccountInfoList } from '@sections/ordering';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { from, iif, Observable, Subscription, throwError } from 'rxjs';
import {  map, switchMap, take, tap } from 'rxjs/operators';
import { AccountType, DisplayName, PATRON_NAVIGATION, Settings } from 'src/app/app.global';

export enum GUEST_FORM_CONTROL_NAMES {
  paymentMethod = 'paymentMethod',
  toAccount = 'toAccount',
  amountToDeposit = 'amountToDeposit',
 mainInput = 'mainInput'
}
 
const requiredSettings = [
  Settings.Setting.DEPOSIT_TENDERS,
  Settings.Setting.PAYMENT_TYPES,
  Settings.Setting.BILLME_MAPPING,
  Settings.Setting.FREEFORM_DEPOSIT_ENABLED,
  Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD,
  Settings.Setting.BILLME_AMOUNTS,
  Settings.Setting.BILLME_AMOUNT_MIN,
  Settings.Setting.BILLME_AMOUNT_MAX,
  Settings.Setting.BILLME_FREEFORM_ENABLED,
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
  ) {}

  ngOnInit() {
    this.accounts$ = this.depositService.getUserAccounts();
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.depositService.getUserSettings(requiredSettings).pipe(take(1)).subscribe((result)=>{
      this.depositSettings = result;
    })
 
    this.initForm();
    this.initContentStrings();
    this.globalNav.hideNavBar();
  }

  ionViewWillEnter() {
    this.getAccounts();
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
    this.globalNav.showNavBar();
  }

  initForm() {

   // const minMaxValidators = [amountRangeValidator(+this.minMaxOfAmmounts.minAmountOneTime, +this.minMaxOfAmmounts.maxAmountOneTime)];
    this.detailsForm = this.fb.group({
      [GUEST_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.toAccount]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.amountToDeposit]: ['', Validators.required],
      //[GUEST_FORM_CONTROL_NAMES.mainInput]: ['', Validators.required, ...minMaxValidators,  Validators.pattern(CURRENCY_REGEXP)],
    });
  }

  onPaymentChanged({ target }) {
    this.defineDestAccounts(target.value);
    this.resetControls(['mainSelect', 'mainInput', 'selectedAccount']);
    document.getElementById('depositBtnText').innerHTML = 'Deposit';
  }

  formatInput(event) {
    const { value } = event.target;
    const index = value.indexOf('.');
    if (!NUM_COMMA_DOT_REGEXP.test(value)) {
     this.detailsForm.get('mainInput').setValue(value.slice(0, value.length - 1));
    }

    if (index !== -1 && value.slice(index + 1).length > 1) {
     this.detailsForm.get('mainInput').setValue(value.slice(0, index + 2));
    }
  }

  setFormValidators() {
    const minMaxValidators =
      this.activePaymentType !== PAYMENT_TYPE.CREDIT
        ? [amountRangeValidator(+this.minMaxOfAmmounts.minAmountbillme, +this.minMaxOfAmmounts.maxAmountbillme)]
        : [amountRangeValidator(+this.minMaxOfAmmounts.minAmountOneTime, +this.minMaxOfAmmounts.maxAmountOneTime)];

    this.isFreeFormEnabled$.pipe(take(1)).subscribe(data => {
      const sourceAcc = this.detailsForm.get('sourceAccount').value;
      this.detailsForm.controls['mainSelect'].clearValidators();
      this.detailsForm.controls['mainSelect'].setErrors(null);
      this.resolveCVVValidators(sourceAcc);

      if (sourceAcc === 'newCreditCard') {
        this.detailsForm.reset();
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
          .subscribe(() => {}, message => this.onErrorRetrieve(message), () => this.loadingService.closeSpinner());
      }

      if (data) {
        this.detailsForm.controls['mainInput'].setValidators([
          Validators.required,
          ...minMaxValidators,
          Validators.pattern(CURRENCY_REGEXP),
        ]);
      } else {
        this.detailsForm.controls['mainSelect'].setValidators([Validators.required]);
        this.mainFormInput.clearValidators();
        this.mainFormInput.setErrors(null);
        this.resetControls(['mainSelect', 'mainInput']);
      }
      this.detailsForm.controls['mainSelect'].setValue(0);
    });
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
    return iif(
      () => this.activePaymentType === PAYMENT_TYPE.BILLME,
      this.isFreeFromDepositEnabled$,
      this.isFreeFromDepositEnabled$
    );
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
  private initContentStrings() {
    this.topLabel =
      'You are deposting to the account of {{ James Demo }}. If this is incorrect, go back to to Step 1 to identify the recipient';
  }

  get isCreditCardPaymentTypesEnabled(): boolean {
    return true;
  }
  
  get isCVVfieldShow(): boolean {
    const sourceAcc = this.detailsForm.get('sourceAccount').value;

    return (
      sourceAcc &&
      (sourceAcc !== PAYMENT_TYPE.BILLME || sourceAcc !== 'newCreditCard') &&
      sourceAcc.accountType === ACCOUNT_TYPES.charge &&
      sourceAcc.paymentSystemType !== PAYMENT_SYSTEM_TYPE.USAEPAY
    );
  }

  private getAccounts() {
    const subscription = this.depositService.getUserSettings(requiredSettings)
      .pipe(
        map(settings => {
          const depositTenders = this.getSettingByName(settings, Settings.Setting.DEPOSIT_TENDERS.split('.')[2]);
          return {
            depositTenders: parseArrayFromString(depositTenders)
          };
        }),
        switchMap(({ depositTenders}) =>
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
    return depositSetting && depositSetting.value || '';
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

  private resolveCVVValidators(sourceAcc: UserAccount | number) {
    if (sourceAcc !== PAYMENT_TYPE.BILLME && this.isCVVfieldShow) {
      this.detailsForm.controls['fromAccountCvv'].setValidators([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[0-9.-]*'),
      ]);
      this.detailsForm.controls['fromAccountCvv'].reset();
      return;
    }
    this.detailsForm.controls['fromAccountCvv'].setErrors(null);
    this.detailsForm.controls['fromAccountCvv'].clearValidators();
  }
}
