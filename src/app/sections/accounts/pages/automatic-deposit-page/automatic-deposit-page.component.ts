import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, iif, Observable, of, Subscription, zip, throwError, from } from 'rxjs';
import {
  AUTO_DEPOSIT_PAYMENT_TYPES,
  AUTO_DEPOST_SUCCESS_MESSAGE_TITLE,
  DEPOSIT_FREQUENCY,
  getLowBalanceSuccessBodyMessage,
  getMonthlySuccessBodyMessage,
  getWeeklySuccessBodyMessage,
} from './auto-deposit.config';
import {
  formControlErrorDecorator,
  parseArrayFromString,
  validateMonthRange,
  validateInputAmount,
} from '@core/utils/general-helpers';
import { PopoverComponent } from './components/popover/popover.component';
import { PopoverController } from '@ionic/angular';
import { first, map, switchMap, take, tap } from 'rxjs/operators';
import { WEEK } from '@core/utils/date-helper';
import { UserAutoDepositSettingInfo } from './models/auto-deposit-settings';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoDepositService } from './service/auto-deposit.service';
import { BillMeMapping } from '@core/model/settings/billme-mapping.model';
import { LOCAL_ROUTING, PAYMENT_TYPE, PAYMENT_SYSTEM_TYPE } from '@sections/accounts/accounts.config';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { PATRON_NAVIGATION, Settings } from 'src/app/app.global';
import { LoadingService } from '@core/service/loading/loading.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-automatic-deposit-page',
  templateUrl: './automatic-deposit-page.component.html',
  styleUrls: ['./automatic-deposit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomaticDepositPageComponent {
  private readonly sourceSubscription: Subscription = new Subscription();
  private paymentMethodAccount: UserAccount | PAYMENT_TYPE;
  private destinationAccount: UserAccount;
  private creditCardSourceAccounts: Array<UserAccount>;
  private billmeSourceAccounts: Array<UserAccount> = [];
  private creditCardDestinationAccounts: Array<UserAccount>;
  private billmeDestinationAccounts: Array<UserAccount>;

  activeBillMeAccount: UserAccount;
  activePaymentType: PAYMENT_TYPE;
  showContent: boolean;
  formHasBeenPrepared: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  automaticDepositForm: FormGroup;
  activeAutoDepositType: number;
  activeFrequency: string = DEPOSIT_FREQUENCY.week;
  applePayEnabled$: Observable<boolean>;
  autoDepositSettings: UserAutoDepositSettingInfo;
  sourceAccounts: Array<UserAccount | PAYMENT_TYPE> = [];
  destinationAccounts: Array<UserAccount>;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly route: ActivatedRoute,
    private readonly depositService: DepositService,
    private readonly autoDepositService: AutoDepositService,
    private readonly popoverCtrl: PopoverController,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly externalPaymentService: ExternalPaymentService,
    private readonly userFacadeService: UserFacadeService
  ) {}

  ionViewWillEnter(): void {
    this.showContent = true;
    this.getAccounts();
    this.cdRef.detectChanges();
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
  }

  ionViewWillLeave(): void {
    this.deleteForm();
    this.showContent = false;
    this.sourceSubscription.unsubscribe();
  }

  //-------------------- Constants block --------------------------//

  get controlNames(): typeof AUTOMATIC_DEPOSIT_CONTROL_NAMES {
    return AUTOMATIC_DEPOSIT_CONTROL_NAMES;
  }

  get autoDepositTypes(): typeof AUTO_DEPOSIT_PAYMENT_TYPES {
    return AUTO_DEPOSIT_PAYMENT_TYPES;
  }

  get frequency(): typeof DEPOSIT_FREQUENCY {
    return DEPOSIT_FREQUENCY;
  }

  get weekArray(): string[] {
    return WEEK;
  }

  get paymentTypes(): typeof PAYMENT_TYPE {
    return PAYMENT_TYPE;
  }

  //-------------------- Constants block end--------------------------//

  //-------------------- Controls getter block --------------------------//

  get amountToDeposit(): AbstractControl {
    return this.automaticDepositForm.get(this.controlNames.amountToDeposit);
  }

  get dayOfMonth(): AbstractControl {
    return this.automaticDepositForm.get(this.controlNames.dayOfMonth);
  }

  get dayOfWeek(): AbstractControl {
    return this.automaticDepositForm.get(this.controlNames.dayOfWeek);
  }

  get paymentMethod(): AbstractControl {
    return this.automaticDepositForm.get(this.controlNames.paymentMethod);
  }

  get account(): AbstractControl {
    return this.automaticDepositForm.get(this.controlNames.account);
  }

  get lowBalanceAmount(): AbstractControl {
    return this.automaticDepositForm.get(this.controlNames.lowBalanceAmount);
  }

  //-------------------- Controls getter block end--------------------------//

  //-------------------- Dynamic form settings block --------------------------//

  get amountsForSelect$(): Observable<string[]> {
    return iif(() => this.activePaymentType === PAYMENT_TYPE.BILLME, this.billMeAmounts$, this.oneTimeAmounts$);
  }

  get isFreeFormAmountToDepositEnabled$(): Observable<boolean> {
    return iif(
      () => this.activePaymentType === PAYMENT_TYPE.BILLME,
      this.isAllowFreeFormBillMe$,
      this.isFreeFromDepositEnabled$
    );
  }

  get isFreeFromDepositEnabled$(): Observable<boolean> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.FREEFORM_DEPOSIT_ENABLED)
      .pipe(map(({ value }) => Boolean(Number(value))));
  }

  get billMeAmounts$(): Observable<string[]> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.BILLME_AMOUNTS)
      .pipe(map(({ value }) => parseArrayFromString(value)));
  }

  get oneTimeAmounts$(): Observable<string[]> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD)
      .pipe(map(({ value }) => parseArrayFromString(value)));
  }

  get lowBalanceValues$(): Observable<string[]> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.LOW_BALANCE_AMOUNTS)
      .pipe(map(({ value }) => parseArrayFromString(value)));
  }

  get autoDepositTenders$(): Observable<string[]> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.AUTO_DEPOSIT_TENDERS)
      .pipe(map(({ value }) => parseArrayFromString(value)));
  }

  get isAllowFreeFormBillMe$(): Observable<boolean> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.BILLME_FREEFORM_ENABLED)
      .pipe(map(({ value }) => Boolean(Number(value))));
  }

  get isLowBalanceFreeInput$(): Observable<boolean> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.LOW_BALANCE_FREEFORM_ENABLED)
      .pipe(map(({ value }) => Boolean(Number(value))));
  }

  get isBillMePaymentTypesEnabled$(): Observable<boolean> {
    return this.getPaymentType(Settings.Setting.AUTO_DEPOSIT_PAYMENT_TYPES).pipe(
      switchMap(types => {
        if (types.length) {
          return of(types.indexOf(PAYMENT_TYPE.BILLME) !== -1);
        }
        return this.getPaymentType(Settings.Setting.PAYMENT_TYPES).pipe(
          map(types => types.indexOf(PAYMENT_TYPE.BILLME) !== -1)
        );
      })
    );
  }

  get isCreditPaymentTypeEnabled$(): Observable<boolean> {
    return this.getPaymentType(Settings.Setting.AUTO_DEPOSIT_PAYMENT_TYPES).pipe(
      switchMap(types => {
        if (types.length) {
          return of(types.indexOf(PAYMENT_TYPE.CREDIT) !== -1);
        }
        return this.getPaymentType(Settings.Setting.PAYMENT_TYPES).pipe(
          map(types => types.indexOf(PAYMENT_TYPE.CREDIT) !== -1)
        );
      })
    );
  }

  get billmeMappingArr$(): Observable<BillMeMapping[]> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.BILLME_MAPPING)
      .pipe(map(({ value }) => parseArrayFromString<BillMeMapping>(value)));
  }

  private getPaymentType(setting: Settings.Setting): Observable<PAYMENT_TYPE[]> {
    return this.settingsFacadeService.getSetting(setting).pipe(
      map(settingInfo => {
        return settingInfo.value && settingInfo.value.length > 0 ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  //-------------------- Dynamic form settings block end--------------------------//

  trackByAccountId(i: number): string {
    return `${i}-${Math.random()}`;
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }

  async onPaymentMethodChanged(value: string): Promise<void> {
    if (value === 'addCC') {
      this.automaticDepositForm.reset();
      const paymentSystem = await this.definePaymentSystemType();

      if (paymentSystem === PAYMENT_SYSTEM_TYPE.MONETRA) {
        this.router.navigate([PATRON_NAVIGATION.accounts, LOCAL_ROUTING.addCreditCard], {
          queryParams: { skip: true },
        });

        return;
      }

      this.addUSAePayCreditCard();
    } else {
      await this.defineDestAccounts(value).then(() => this.setValidators());
    }
  }

  private async defineDestAccounts(target: any) {
    let type = target;

    if (target instanceof Object) {
      type = this.isBillMeAccount(target) ? PAYMENT_TYPE.BILLME : PAYMENT_TYPE.CREDIT;
    } else {
      type = target;
    }

    if (this.activePaymentType && this.activePaymentType !== type) {
      this.account.reset();
      this.amountToDeposit.reset();
    }
    this.activePaymentType = type;

    if (type === PAYMENT_TYPE.BILLME) {
      this.destinationAccounts = this.billmeDestinationAccounts;
      await this.setBillmeActiveAccount();
    } else {
      this.destinationAccounts = this.creditCardDestinationAccounts;
    }
  }

  private getAccounts() {
    const subscription = zip(
      this.autoDepositTenders$,
      this.billmeMappingArr$,
      this.isBillMePaymentTypesEnabled$,
      this.isCreditPaymentTypeEnabled$
    )
      .pipe(
        switchMap(([tenders, mapping, isBillMeEnabled, isCreditCardEnabled]) => {
          return this.route.data.pipe(
            tap(({ data: { accounts, depositSettings } }) => {
              this.autoDepositSettings = depositSettings;
              this.creditCardSourceAccounts = isCreditCardEnabled
                ? this.depositService.filterAccountsByPaymentSystem(accounts)
                : [];
              this.sourceAccounts = [...this.creditCardSourceAccounts];
              if (isBillMeEnabled) this.sourceAccounts.push(PAYMENT_TYPE.BILLME);
              this.creditCardDestinationAccounts = this.depositService.filterCreditCardDestAccounts(tenders, accounts);
              this.billmeDestinationAccounts = this.depositService.filterBillmeDestAccounts(mapping, accounts);
              this.billmeSourceAccounts = this.depositService.filterBillmeSourceAccounts(mapping, accounts);
            })
          );
        })
      )
      .subscribe(async ({ data: { accounts, depositSettings } }) => {
        this.initPredefinedAccounts(depositSettings, accounts);
        this.defineDestAccounts(this.paymentMethodAccount);
        this.autoDepositSettings.active && (await this.initForm());
        const frecuency = this.autoDepositSettings.dayOfMonth > 0 ? DEPOSIT_FREQUENCY.month : DEPOSIT_FREQUENCY.week;
        this._activeFrequency = String(frecuency);
        this.onDepositTypeChangedHandler(this.autoDepositSettings?.active ? this.autoDepositSettings?.autoDepositType : this.autoDepositTypes.automaticDepositOff)
      });

    this.sourceSubscription.add(subscription);
  }

  private initPredefinedAccounts(settings: UserAutoDepositSettingInfo, accounts: UserAccount[]) {
    this.paymentMethodAccount = settings.fromAccountId && accounts.find(acc => acc.id === settings.fromAccountId);
    if (
      this.paymentMethodAccount &&
      !this.creditCardSourceAccounts.some(({ id }) => id === (<UserAccount>this.paymentMethodAccount).id)
    ) {
      this.paymentMethodAccount = PAYMENT_TYPE.BILLME;
    }
    this.destinationAccount = settings.toAccountId && accounts.find(acc => acc.id === settings.toAccountId);
  }

  private isBillMeAccount({ id }: UserAccount): boolean {
    return this.billmeSourceAccounts.some(acc => acc.id === id);
  }

  private set _activeType(type: number) {
    this.activeAutoDepositType = type;
  }

  private set _activeFrequency(freq: string) {
    this.activeFrequency = freq;
  }

  // -------------------- Events handlers block--------------------------//

  async onDepositTypeChangedHandler(type: number): Promise<AUTO_DEPOSIT_PAYMENT_TYPES> {
    const isAutomaticDepositOff = type === this.autoDepositTypes.automaticDepositOff;
    const wasDestroyed =
      type !== this.autoDepositTypes.automaticDepositOff &&
      this.activeAutoDepositType === this.autoDepositTypes.automaticDepositOff;

    if (isAutomaticDepositOff) {
      this.deleteForm();
      return (this._activeType = type);
    } else if (wasDestroyed) {
      this.initForm();
    }

    await this.updateFormStateByDepositType(type, this.activeFrequency);
  }

  async onFrequencyChanged(event: string): Promise<void> {
    this._activeFrequency = event;
    await this.updateFormStateByDepositType(this.activeAutoDepositType, event);
  }

  async onSubmit(): Promise<void> {
    if (this.automaticDepositForm && this.automaticDepositForm.invalid) return;

    let predefinedUpdateCall;
    let autoDepositSettingsValues = {...this.autoDepositSettings};

    if (this.automaticDepositForm === null) {
      predefinedUpdateCall = this.autoDepositService.updateAutoDepositSettings({
        ...autoDepositSettingsValues,
        active: false,
      });
    } else {
      const { paymentMethod, account, ...rest } = this.automaticDepositForm.value;
      const isBillme: boolean = paymentMethod === PAYMENT_TYPE.BILLME;
      const sourceAccForBillmeDeposit: Observable<UserAccount> = this.billmeMappingArr$.pipe(
        switchMap(billmeMappingArr => this.depositService.sourceAccForBillmeDeposit(account, billmeMappingArr))
      );

      if (this.activeAutoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased) {
        autoDepositSettingsValues = this.activeFrequency === DEPOSIT_FREQUENCY.week
          ? { ...autoDepositSettingsValues, dayOfMonth: 0 }
          : { ...autoDepositSettingsValues, dayOfWeek: 0 };
      }

      const resultSettings = {
        ...autoDepositSettingsValues,
        ...rest,
        autoDepositType: this.activeAutoDepositType,
        toAccountId: account.id,
        active: true,
      };

      if (isBillme) await this.setBillmeActiveAccount();
      predefinedUpdateCall = iif(() => isBillme, sourceAccForBillmeDeposit, of(paymentMethod)).pipe(
        switchMap(sourceAcc =>
          this.autoDepositService.updateAutoDepositSettings({ ...resultSettings, fromAccountId: sourceAcc.id })
        )
      );
    }

    predefinedUpdateCall
      .pipe(take(1))
      .subscribe(
        async res => res && (await this.showModal()),
        async () => await this.showToast('Something went wrong please try again later...')
      );
  }

  // -------------------- Events handlers block end --------------------------//

  // -------------------- Form main block --------------------------//

  private async initForm(): Promise<void> {
    const paymentBlock = this.initPaymentFormBlock();

    this.automaticDepositForm = this.fb.group(paymentBlock);
    await this.setValidators();
    await this.setBillmeActiveAccount();
    this.formHasBeenPrepared.next(true);
  }

  private async setBillmeActiveAccount() {
    if (this.activePaymentType !== PAYMENT_TYPE.BILLME || !this.automaticDepositForm) return;
    const { account } = this.automaticDepositForm.value;
    if (!account) return;
    this.activeBillMeAccount = await this.billmeMappingArr$
      .pipe(switchMap(billmeMappingArr => this.depositService.sourceAccForBillmeDeposit(account, billmeMappingArr)))
      .pipe(first())
      .toPromise();
  }

  private deleteForm() {
    this.automaticDepositForm = null;
    this.formHasBeenPrepared.next(false);
  }

  private async updateFormStateByDepositType(type: number, frequency: string = this.activeFrequency): Promise<void> {
    const control = this.getControlByActiveState(type, frequency);
    const controlName = Object.keys(control)[0];
    const controlSetting = control[controlName];

    this.automaticDepositForm.addControl(controlName, new FormControl(controlSetting[0], controlSetting[1]));
    this.updateActiveState(type, frequency);
    await this.setValidators();
  }

  private getControlByActiveState(type: number, frequency: string): { [key: string]: any[] } {
    let control;

    if (type === this.autoDepositTypes.lowBalance) {
      this.cleanControls([this.controlNames.dayOfMonth, this.controlNames.dayOfWeek]);
      control = this.initLowBalanceFormBlock();
    }

    if (type === this.autoDepositTypes.timeBased) {
      const timeBasedControlUnused =
        frequency === this.frequency.month ? this.controlNames.dayOfWeek : this.controlNames.dayOfMonth;
      this.cleanControls([this.controlNames.lowBalanceAmount, timeBasedControlUnused]);
      control = this.initTimeBasedBlock(frequency);
    }

    return control;
  }

  private updateActiveState(type: number, frequency: string) {
    this._activeType = type;
    this._activeFrequency = frequency;
  }

  private cleanControls(controlNames: string[]) {
    for (let i = 0; i < controlNames.length; i++) {
      this.automaticDepositForm.contains(controlNames[i]) && this.automaticDepositForm.removeControl(controlNames[i]);
    }
  }

  private async getAmountToDepositErrors() {
    const { amountToDeposit } = AUTOMATIC_DEPOSIT_CONTROL_NAMES;

    const maxSetting = await this.settingsFacadeService
      .getSetting(
        this.activePaymentType === PAYMENT_TYPE.BILLME
          ? Settings.Setting.BILLME_AMOUNT_MAX
          : Settings.Setting.CREDITCARD_AMOUNT_MAX
      )
      .pipe(first())
      .toPromise();

    const minSetting = await this.settingsFacadeService
      .getSetting(
        this.activePaymentType === PAYMENT_TYPE.BILLME
          ? Settings.Setting.BILLME_AMOUNT_MIN
          : Settings.Setting.CREDITCARD_AMOUNT_MIN
      )
      .pipe(first())
      .toPromise();

    const max = parseFloat(maxSetting.value);
    const min = parseFloat(minSetting.value);

    return [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[amountToDeposit].requiredEnter),
      formControlErrorDecorator(validateInputAmount, CONTROL_ERROR[amountToDeposit].input),
      formControlErrorDecorator(Validators.max(max), CONTROL_ERROR[amountToDeposit].maximum + Number(max).toFixed(2)),
      formControlErrorDecorator(Validators.min(min), CONTROL_ERROR[amountToDeposit].minimum + Number(min).toFixed(2)),
    ];
  }

  private async setValidators() {
    const { lowBalanceAmount, amountToDeposit } = AUTOMATIC_DEPOSIT_CONTROL_NAMES;
    if (this.automaticDepositForm.contains(this.controlNames.lowBalanceAmount)) {
      const isLowBalanceFreeInput = await this.isLowBalanceFreeInput$.pipe(first()).toPromise();
      const max = 10000;
      const freeFormErrors = [
        formControlErrorDecorator(Validators.required, CONTROL_ERROR[lowBalanceAmount].requiredEnter),
        formControlErrorDecorator(validateInputAmount, CONTROL_ERROR[lowBalanceAmount].input),
        formControlErrorDecorator(Validators.max(max), CONTROL_ERROR[lowBalanceAmount].maximum + Number(max).toFixed(2)),
        formControlErrorDecorator(Validators.min(0), CONTROL_ERROR[lowBalanceAmount].minimum),
      ];
      const selectErrors = formControlErrorDecorator(
        Validators.required,
        CONTROL_ERROR[lowBalanceAmount].requiredSelect
      );
      const errors = isLowBalanceFreeInput ? freeFormErrors : selectErrors;

      this.automaticDepositForm.get(lowBalanceAmount).setValidators(errors);
    }

    if (this.automaticDepositForm.contains(amountToDeposit)) {
      const isAllowFreeFormAmountToDeposit = await this.isFreeFormAmountToDepositEnabled$.pipe(first()).toPromise();
      const errors = isAllowFreeFormAmountToDeposit
        ? await this.getAmountToDepositErrors()
        : formControlErrorDecorator(Validators.required, CONTROL_ERROR[amountToDeposit].requiredSelect);

      this.automaticDepositForm.get(amountToDeposit).setValidators(errors);
      this.automaticDepositForm.get(this.controlNames.amountToDeposit).value !== '' &&
        this.amountToDeposit.markAsTouched();
    }

    // Temporary method for detecting changes after markAsTouched() execute;
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 0);
  }

  // -------------------- Controls block --------------------------//

  private initPaymentFormBlock(): { [key: string]: any[] } {
    const { account, paymentMethod, amountToDeposit } = AUTOMATIC_DEPOSIT_CONTROL_NAMES;
    const accountValidators = [formControlErrorDecorator(Validators.required, CONTROL_ERROR[account].required)];
    const paymentMethodValidators = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[paymentMethod].required),
    ];

    return {
      [account]: [this.destinationAccount || '', accountValidators],
      [amountToDeposit]: [this.autoDepositSettings.amount],
      [paymentMethod]: [this.paymentMethodAccount || '', paymentMethodValidators],
    };
  }

  private initTimeBasedBlock(frequency: string): { [key: string]: any[] } {
    const { dayOfMonth, dayOfWeek } = AUTOMATIC_DEPOSIT_CONTROL_NAMES;
    let validators;
    let controlName;
    let day;

    if (frequency === this.frequency.month) {
      day = this.autoDepositSettings.dayOfMonth;
      controlName = dayOfMonth;
      validators = [
        formControlErrorDecorator(Validators.required, CONTROL_ERROR[dayOfMonth].required),
        formControlErrorDecorator(validateMonthRange, CONTROL_ERROR[dayOfMonth].range),
      ];
    } else {
      day = this.autoDepositSettings.dayOfWeek;
      controlName = dayOfWeek;
      validators = [formControlErrorDecorator(Validators.required, CONTROL_ERROR[dayOfWeek].required)];
    }

    return { [controlName]: [day ? day : '', validators] };
  }

  private initLowBalanceFormBlock(): { [key: string]: any[] } {
    return { [AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount]: [this.autoDepositSettings.lowBalanceAmount] };
  }

  // -------------------- Controls block end --------------------------//

  // ---------------------- interactive block ----------------------------------//

  private getModalTitle(): string {
    if (this.activeAutoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance) {
      return AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.lowBalance;
    }
    if (this.activeAutoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased) {
      return this.activeFrequency === DEPOSIT_FREQUENCY.month
        ? AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.monthly
        : AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.weekly;
    }
    if (this.activeAutoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.automaticDepositOff) {
      return AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.off;
    }
  }

  private getModalBodyMessage(): string {
    if (this.activeAutoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance) {
      return getLowBalanceSuccessBodyMessage(this.amountToDeposit.value, this.lowBalanceAmount.value, this.account.value.accountDisplayName);
    }
    if (this.activeAutoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased) {
      return this.activeFrequency === DEPOSIT_FREQUENCY.month
        ? getMonthlySuccessBodyMessage(this.amountToDeposit.value, this.dayOfMonth.value, this.account.value.accountDisplayName)
        : getWeeklySuccessBodyMessage(this.amountToDeposit.value, this.dayOfWeek.value - 1, this.account.value.accountDisplayName);
    }
  }

  private definePaymentSystemType(): Promise<number> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE)
      .pipe(
        map(({ value }) => parseInt(value)),
        first()
      )
      .toPromise();
  }

  private addUSAePayCreditCard() {
    from(this.externalPaymentService.addUSAePayCreditCard())
      .pipe(
        switchMap(({ success, errorMessage }) => {
          if (!success) {
            return throwError(errorMessage);
          }
          this.loadingService.showSpinner();
          // Update user accounts for refreshing Credit Card dropdown list
          return zip(this.depositService.getUserAccounts(), this.isBillMePaymentTypesEnabled$);
        }),
        take(1)
      )
      .subscribe(
        ([accounts = [], isBillMeEnabled]) => {
          const creditCardSourceAccounts =
            (accounts.length && this.depositService.filterAccountsByPaymentSystem(accounts)) || [];
          this.sourceAccounts = [...creditCardSourceAccounts];
          if (isBillMeEnabled) this.sourceAccounts.push(PAYMENT_TYPE.BILLME);
          this.paymentMethod.setValue('');
          this.cdRef.detectChanges();
        },
        err => this.showToast(err),
        () => this.loadingService.closeSpinner()
      );
  }

  private async showModal(): Promise<void> {
    const modal = await this.popoverCtrl.create({
      component: PopoverComponent,
      componentProps: {
        data: { title: this.getModalTitle(), message: this.getModalBodyMessage() },
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async () => await this.router.navigate([PATRON_NAVIGATION.accounts]));
    await modal.present();
  }

  private async showToast(message: string) {
    await this.toastService.showToast({ message });
  }

  @HostListener('window:beforeunload', ['$event'])
  private saveSettings($event: BeforeUnloadEvent) {
    const isTypeChanged =
      (!this.autoDepositSettings.active &&
        this.activeAutoDepositType !== AUTO_DEPOSIT_PAYMENT_TYPES.automaticDepositOff) ||
      (this.autoDepositSettings.active && this.activeAutoDepositType !== this.autoDepositSettings.autoDepositType);

    const isFormTouched = this.automaticDepositForm && this.automaticDepositForm.touched;

    if (isTypeChanged || isFormTouched) {
      $event.returnValue = '';
    }
  }
}

export enum AUTOMATIC_DEPOSIT_CONTROL_NAMES {
  amountToDeposit = 'amount',
  account = 'account',
  paymentMethod = 'paymentMethod',
  lowBalanceAmount = 'lowBalanceAmount',
  dayOfWeek = 'dayOfWeek',
  dayOfMonth = 'dayOfMonth',
}

export const CONTROL_ERROR = {
  [AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit]: {
    requiredEnter: 'You must enter an amount.',
    input: '',
    requiredSelect: 'You must select a suitable amount from select',
    maximum: 'Maximum Deposit Amount: $',
    minimum: 'Minimum Deposit Amount: $',
  },
  [AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod]: {
    required: 'You must select payment method.',
  },
  [AUTOMATIC_DEPOSIT_CONTROL_NAMES.account]: {
    required: 'You must choose an account.',
  },
  [AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount]: {
    requiredEnter: 'You must enter an amount.',
    input: '',
    minimum: 'Value can not be lower than 0',
    maximum: 'Value can not be greater than $',
    requiredSelect: 'You must select a suitable amount from select',
  },
  [AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek]: {
    required: 'You must select day of week',
  },
  [AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth]: {
    required: 'You must enter day of month',
    range: 'You must enter number between 1 and 31',
  },
};
