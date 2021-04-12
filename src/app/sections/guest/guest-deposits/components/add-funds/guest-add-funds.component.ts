import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ACCOUNTS_VALIDATION_ERRORS, PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { amountRangeValidator } from '@sections/accounts/pages/deposit-page/amount-range.validator';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ConfirmDepositPopoverComponent } from '@sections/accounts/shared/ui-components/confirm-deposit-popover';
import { DepositModalComponent } from '@sections/accounts/shared/ui-components/deposit-modal';
import { GuestAddFundsCsModel } from '@sections/guest/model/guest-add-funds.content.strings';
import { GUEST_ROUTES } from '@sections/section.config';
import { ContentStringApi } from '@shared/model/content-strings/content-strings-api';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { from, iif, Observable, of, Subscription, throwError } from 'rxjs';
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
  depositButtonText: string;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: DisplayName.APPLEPAY,
    isActive: true,
  };
  contentStrings: GuestAddFundsCsModel;
  isDepositing: boolean = false;
  detailsForm: FormGroup;
  applePayEnabled$: Observable<boolean>;
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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.contentStrings = ContentStringApi.guestAddFunds();
    this.accounts$ = this.depositService.getUserAccounts(); // CHECK: Revolve the account beforehand?
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.activatedRoute.data.subscribe(response => {
      this.depositSettings = response.data.settings;
    });

    this.initForm();
    this.globalNav.hideNavBar();
  }

  ionViewWillEnter() {
    this.depositButtonText = this.contentStrings.depositButton;
    this.getAccounts(); // CHECK: Is updating the accounts or using the old ones?
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

  async onPaymentChanged(target) {
    this.defineDestAccounts(target);
    this.setFormValidators();
    this.depositButtonText = this.contentStrings.depositButton;
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
    const minMaxValidators = [
      amountRangeValidator(+this.minMaxOfAmounts.minAmountOneTime, +this.minMaxOfAmounts.maxAmountOneTime),
    ];

    this.isFreeFormEnabled$.pipe(take(1)).subscribe(data => {
      const sourceAcc = this.paymentMethod.value;
      this.detailsForm.controls[this.controlsNames.amountToDeposit].clearValidators();
      this.detailsForm.controls[this.controlsNames.amountToDeposit].setErrors(null);

      if (sourceAcc === CREDITCARD_STATUS.NEW) {
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
        this.detailsForm.controls[this.controlsNames.amountToDeposit].setValidators([Validators.required]);
        this.mainFormInput.clearValidators();
        this.mainFormInput.setErrors(null);
        this.resetControls([this.controlsNames.amountToDeposit, this.controlsNames.mainInput]);
      }
      this.detailsForm.controls[this.controlsNames.amountToDeposit].setValue(0);
    });
  }

  onAmountChanged(event) {
    const amount: string = event.target.value;
    this.depositButtonText = amount && amount.length ? 'Deposit $' + amount : this.depositButtonText;
  }

  onFormSubmit() {
    if ((this.detailsForm && this.detailsForm.invalid) || this.isDepositing) return;
    this.isDepositing = true;
    const { paymentMethod, toAccount, mainInput, amountToDeposit } = this.detailsForm.value;
    const isApplePay: boolean = paymentMethod.accountType === AccountType.APPLEPAY;
    const depositReviewCredit = this.contentStrings.refundText;
    let amount = mainInput || amountToDeposit;
    amount = amount.toString().replace(COMMA_REGEXP, '');
    if (isApplePay) {
      Browser.addListener('browserFinished', (info: any) => {
        this.isDepositing = false;
        this.cdRef.detectChanges();
        Browser.removeAllListeners();
      });

      this.externalPaymentService
        .payWithApplePay(ApplePay.DEPOSITS_WITH_APPLE_PAY, {
          accountId: toAccount.id,
          depositAmount: amount,
        })
        .then((result: ApplePayResponse) => {
          if (result.success) {
            0;
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
    } else {
      iif(() => false, of(0), of(paymentMethod))
        .pipe(
          switchMap(
            (sourceAcc): any => {
              const calculateDepositFee: Observable<number> = this.depositService.calculateDepositFee(
                sourceAcc.id,
                toAccount.id,
                amount
              );

              return iif(() => false, of(0), calculateDepositFee).pipe(
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
            this.confirmationDepositPopover({ ...(info as {}), depositReviewCredit });
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

  private getAccounts() {
    const subscription = of(this.depositSettings)
      .pipe(
        map(settings => {
          const depositTenders = this.getSettingByName(settings, Settings.Setting.DEPOSIT_TENDERS.split('.')[2]);
          return {
            depositTenders: parseArrayFromString(depositTenders),
          };
        }),
        switchMap(({ depositTenders }) =>
          this.accounts$.pipe(
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
    return depositSetting.value;
  }

  private defineDestAccounts(target) {
    this.activePaymentType =
      target instanceof Object
        ? PAYMENT_TYPE.CREDIT
        : target === CREDITCARD_STATUS.NEW
        ? this.activePaymentType
        : target;
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
      this.router.navigate([ROLES.guest, GUEST_ROUTES.dashboard]);
      this.resetControls([
        this.controlsNames.mainInput,
        this.controlsNames.toAccount,
        this.controlsNames.paymentMethod,
        this.controlsNames.amountToDeposit,
      ]);
    });
    await modal.present();
  }
}
