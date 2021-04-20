import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/core';
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
import { ACCOUNTS_VALIDATION_ERRORS, PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { amountRangeValidator } from '@sections/accounts/pages/deposit-page/amount-range.validator';
import { browserState } from '@sections/accounts/pages/deposit-page/deposit-page.component';
import { DepositCsModel } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ConfirmDepositPopoverComponent } from '@sections/accounts/shared/ui-components/confirm-deposit-popover';
import { DepositModalComponent } from '@sections/accounts/shared/ui-components/deposit-modal';
import { GuestAddFundsCsModel } from '@sections/guest/model/guest-add-funds.content.strings';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { GUEST_ROUTES } from '@sections/section.config';
import { ContentStringModel } from '@shared/model/content-strings/content-string-models';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { from, Observable, of, throwError } from 'rxjs';
import { finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { AccountType, DisplayName, ROLES, Settings } from 'src/app/app.global';

enum GUEST_FORM_CONTROL_NAMES {
  paymentMethod = 'paymentMethod',
  toAccount = 'toAccount',
  amountToDeposit = 'amountToDeposit',
  mainInput = 'mainInput',
}

enum CREDITCARD_STATUS {
  NEW = 'newCreditCard',
}

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

  depositButtonText: string;
  addFundsCs: GuestAddFundsCsModel;
  confirmationCs: ContentStringModel;
  isDepositing: boolean = false;
  guestDepositForm: FormGroup;
  applePayEnabled$: Observable<boolean>;
  depositSettings: SettingInfo[];
  creditCardDestinationAccounts: Array<UserAccount>;
  creditCardSourceAccounts: Array<UserAccount>;
  recipientName: string;
  subTitle: string;
  private recipientAccounts$: Observable<UserAccount[]>;
  private guestAccounts$: Observable<UserAccount[]>;
  private activePaymentType: PAYMENT_TYPE;

  constructor(
    private readonly fb: FormBuilder,
    private readonly globalNav: GlobalNavService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly depositService: DepositService,
    private readonly router: Router,
    private externalPaymentService: ExternalPaymentService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly modalController: ModalController,
    private readonly popoverCtrl: PopoverController,
    private activatedRoute: ActivatedRoute,
    private guestDepositsService: GuestDepositsService
  ) {}

  ngOnInit() {
    this.globalNav.hideNavBar();
    this.activatedRoute.data.subscribe(response => {
      this.setResolvedData(response);
    });
    this.initForm();
  }

  ionViewWillEnter() {
    this.setRecipientName();
    this.depositButtonLabel();
    this.filterSourceAccounts();
    this.filterDestinationAccounts();
    this.setFormValidators();
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.globalNav.showNavBar();
  }

  initForm() {
    this.guestDepositForm = this.fb.group({
      [GUEST_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.toAccount]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.amountToDeposit]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.mainInput]: ['', Validators.required],
    });
  }

  async onPaymentChanged(target) {
    this.defineDestAccounts(target);
    this.setFormValidators();
    this.depositButtonLabel();
  }

  formatInput(event) {
    const indexNotFound = -1;
    const oneStep = 1;
    const { value } = event.target;
    const index = value.indexOf('.');
    if (!NUM_COMMA_DOT_REGEXP.test(value)) {
       this.mainFormInput.setValue(value.slice(0, value.length - oneStep));
    }
    if (index !== indexNotFound && value.slice(index + oneStep).length > oneStep) {
       this.mainFormInput.setValue(value.slice(0, index + 2));
    }
  }

  setFormValidators() {
    this.guestDepositForm.setErrors(null);
    const minMaxValidators = [
      amountRangeValidator(+this.minMaxOfAmounts.minAmountOneTime, +this.minMaxOfAmounts.maxAmountOneTime),
    ];

    this.isFreeFormEnabled$.pipe(take(1)).subscribe(data => {
      const sourceAcc = this.paymentMethod.value;
      this.amountToDeposit.reset();
      if (sourceAcc === CREDITCARD_STATUS.NEW) {
        return from(this.externalPaymentService.addUSAePayCreditCard())
          .pipe(
            switchMap(({ success, errorMessage }) => {
              if (!success) {
                return throwError(errorMessage);
              }
              this.loadingService.showSpinner();
              return this.guestDepositsService.guestAccounts();
            }),
            take(1)
          )
          .subscribe(() => {}, message => this.onErrorRetrieve(message), () => this.loadingService.closeSpinner());
      }
      if (data) {
        this.mainFormInput.setValidators([
          Validators.required,
          ...minMaxValidators,
          Validators.pattern(CURRENCY_REGEXP),
        ]);
        this.amountToDeposit.clearValidators();
      } else {
        this.amountToDeposit.setValidators([Validators.required]);
        this.mainFormInput.clearValidators();
        this.mainFormInput.setErrors(null);
        this.resetControls([this.controlsNames.amountToDeposit, this.controlsNames.mainInput]);
      }
    });
  }

  onAmountChanged(event) {
    const amount = event.target.value;
    if (amount && amount.length) {
      if (!isNaN(+amount)) {
        this.depositButtonLabel('Deposit $' + amount);
      }
    } else {
      this.depositButtonLabel();
    }
  }

  onFormSubmit() {
    if (this.isReadyToSubmit()) return;
    this.isDepositing = true;
    const { paymentMethod, toAccount, mainInput, amountToDeposit } = this.guestDepositForm.value;
    let amount = this.formatAmount(mainInput, amountToDeposit);
    if (this.isApplePayEnabled(paymentMethod)) {
      this.handleApplePay(toAccount, amount);
    } else {
     of(paymentMethod)
        .pipe(
          switchMap(
            (sourceAcc): any => {
              const calculateDepositFee: Observable<number> = this.depositService.calculateDepositFee(
                sourceAcc.id,
                toAccount.id,
                amount
              );

              return calculateDepositFee.pipe(
                map(valueFee => ({
                  fee: valueFee,
                  sourceAcc: sourceAcc,
                  selectedAccount: toAccount,
                  amount: amount,
                  billme: false,
                }))
              );
            }
          ),
          take(1)
        )
        .subscribe(
          info => {
            this.confirmationDepositPopover({ ...(info as {}), depositReviewCredit: this.addFundsCs.refundText });
          },
          () => {
            this.loadingService.closeSpinner();
            this.onErrorRetrieve('Something went wrong, please try again...');
            this.isDepositing = false;
          }
        );
    }
  }

  async confirmationDepositPopover(data: any) {
    const { confirmDepositCs: contentString } = this.confirmationCs as DepositCsModel;
    const popover = await this.popoverCtrl.create({
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
        this.performDeposit(data);
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
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.paymentMethod);
  }

  get toAccount(): AbstractControl {
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.toAccount);
  }

  get amountToDeposit(): AbstractControl {
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.amountToDeposit);
  }

  get mainFormInput(): AbstractControl {
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.mainInput);
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
    return of(this.depositSettings).pipe(
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
    return of(this.depositSettings).pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD.split('.')[2]
        );

        return settingInfo ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  private filterSourceAccounts() {
    this.guestAccounts$
      .pipe(
        take(1),
        tap(accounts => {
          this.creditCardSourceAccounts = this.filterAccountsByPaymentSystem(accounts);
        })
      )
      .subscribe();
  }

  private filterDestinationAccounts() {
    of(this.depositSettings)
      .pipe(
        map(settings => {
          const depositTenders = this.getSettingByName(settings, Settings.Setting.DEPOSIT_TENDERS.split('.')[2]);
          return {
            depositTenders: parseArrayFromString(depositTenders),
          };
        }),
        switchMap(({ depositTenders }) =>
          this.recipientAccounts$.pipe(
            tap(accounts => {
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
  }

  private getSettingByName(settings, property: string) {
    const depositSetting = this.depositService.getSettingByName(settings, property);
    return depositSetting.value;
  }

  private defineDestAccounts(target) {
    this.activePaymentType =
      target instanceof Object
        ? PAYMENT_TYPE.CREDIT
        : target === CREDITCARD_STATUS.NEW
        ? this.activePaymentType
        : target;
  }

  private filterAccountsByPaymentSystem(accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterAccountsByPaymentSystem(accounts);
  }
  private filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterCreditCardDestAccounts(tendersId, accounts);
  }

  private resetControls(controlNames: string[]) {
    controlNames.forEach(
      controlName => this.guestDepositForm.contains(controlName) && this.guestDepositForm.get(controlName).reset()
    );
  }

  private async onErrorRetrieve(message: string) {
    await this.toastService.showToast({ message, duration: 5000 });
  }

  private depositButtonLabel(buttonText?: string) {
    if (buttonText) {
      this.depositButtonText = buttonText;
    } else {
      this.depositButtonText = this.addFundsCs.depositButton;
    }
  }

  private setRecipientName() {
    this.subTitle = this.addFundsCs.noticeText;
    if (this.subTitle.includes("${recipient_name}")) {
      this.subTitle = this.subTitle.replace("${recipient_name}", this.recipientName);
    } 
  }

  private async finalizeDepositModal(data): Promise<void> {
    const { depositSuccessCs: contentString } = this.confirmationCs as DepositCsModel;
    const modal = await this.modalController.create({
      component: DepositModalComponent,
      animated: true,
      componentProps: {
        data,
        contentString,
      },
    });

    modal.onDidDismiss().then(() => {
      this.router.navigate([ROLES.guest, GUEST_ROUTES.dashboard]);
      this.guestDepositForm.reset();
      this.guestDepositForm.markAsPristine();
    });
    await modal.present();
  }

  private handleApplePay(toAccount: any, amount: any) {
    Browser.addListener(browserState.FINISHED, (info: any) => {
      this.isDepositing = false;
      this.cdRef.detectChanges();
      Browser.removeAllListeners();
    });
    this.payWithApplePay(toAccount, amount);
  }

  private payWithApplePay(toAccount: any, amount: any) {
    this.externalPaymentService
      .payWithApplePay(ApplePay.DEPOSITS_WITH_APPLE_PAY, {
        accountId: toAccount.id,
        depositAmount: amount,
      })
      .then((result: ApplePayResponse) => {
        if (result.success) {
          this.finalizeDepositModal(result);
        } else {
          this.onErrorRetrieve(result.errorMessage);
        }
      })
      .catch(async () => {
        this.onErrorRetrieve('Something went wrong, please try again...');
      })
      .finally(() => {
        this.isDepositing = false;
      });
  }

  private isApplePayEnabled(paymentMethod: any) {
    return paymentMethod.accountType === AccountType.APPLEPAY;
  }

  private isReadyToSubmit() {
    return (this.guestDepositForm && this.guestDepositForm.invalid) || this.isDepositing;
  }

  private performDeposit(data: any) {
    this.guestDepositsService
      .guestDeposit(data.sourceAcc.id, data.selectedAccount.id, data.amount)
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

  private setResolvedData(response) {
    this.depositSettings = response.data.settings;
    this.recipientName = response.data.recipientName;
    this.addFundsCs = response.data.addFundsCs;
    this.confirmationCs = response.data.confirmationCs;
    this.applePayEnabled$ = of(response.data.applePayEnabled);
    this.recipientAccounts$ = of(response.data.destinationAccounts);
    this.guestAccounts$ = of(response.data.sourceAccounts);
  }

  private formatAmount(mainInput: any, amountToDeposit: any) {
    let amount = mainInput || amountToDeposit;
    amount = amount.toString().replace(COMMA_REGEXP, '');
    return amount;
  }
}
