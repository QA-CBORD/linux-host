import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, iif, Observable, of, Subscription, zip } from 'rxjs';
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
import { PopoverController, ToastController } from '@ionic/angular';
import { first, map, switchMap, take, tap, finalize } from 'rxjs/operators';
import { WEEK } from '@core/utils/date-helper';
import { UserAutoDepositSettingInfo } from './models/auto-deposit-settings';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoDepositService } from './service/auto-deposit.service';
import { BillMeMapping } from '@core/model/settings/billme-mapping.model';
import {
  LOCAL_ROUTING,
  PAYMENT_TYPE,
  SYSTEM_SETTINGS_CONFIG,
  PAYMENT_SYSTEM_TYPE,
} from '@sections/accounts/accounts.config';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { NAVIGATE } from 'src/app/app.global';
import { SettingService } from '@core/service/settings/setting.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { LoadingService } from '@core/service/loading/loading.service';

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
  activeFrequency: string;
  autoDepositSettings: UserAutoDepositSettingInfo;
  sourceAccounts: Array<UserAccount | PAYMENT_TYPE> = [];
  destinationAccounts: Array<UserAccount>;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly settingService: SettingService,
    private readonly route: ActivatedRoute,
    private readonly depositService: DepositService,
    private readonly autoDepositService: AutoDepositService,
    private readonly popoverCtrl: PopoverController,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly cdRef: ChangeDetectorRef,
    private readonly nativeProvider: NativeProvider,
    private readonly loadingService: LoadingService
  ) {}

  ionViewWillEnter() {
    this.showContent = true;
    this.getAccounts();
    this.cdRef.detectChanges();
  }

  ionViewWillLeave() {
    this.deleteForm();
    this.showContent = false;
    this.sourceSubscription.unsubscribe();
  }

  //-------------------- Constants block --------------------------//

  get controlNames() {
    return AUTOMATIC_DEPOSIT_CONTROL_NAMES;
  }

  get autoDepositTypes() {
    return AUTO_DEPOSIT_PAYMENT_TYPES;
  }

  get frequency() {
    return DEPOSIT_FREQUENCY;
  }

  get weekArray(): string[] {
    return WEEK;
  }

  get paymentTypes() {
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

  get amountsForSelect$() {
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
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled.name
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  get billMeAmounts$(): Observable<string[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.billMeAmounts.name);

        return settingInfo ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  get oneTimeAmounts$(): Observable<string[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard.name
        );

        return settingInfo ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  get lowBalanceValues$(): Observable<string[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.lowBalanceAmounts.name
        );

        return settingInfo ? parseArrayFromString<string>(settingInfo.value) : [];
      })
    );
  }

  get autoDepositTenders$(): Observable<string[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.autoDepositTenders.name
        );

        return settingInfo && parseArrayFromString<string>(settingInfo.value);
      })
    );
  }

  get isAllowFreeFormBillMe$(): Observable<boolean> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.billMeFreeFormEnabled.name
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  get isLowBalanceFreeInput$(): Observable<boolean> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.lowBalanceFreeFormEnabled.name
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  get isBillMePaymentTypesEnabled$(): Observable<boolean> {
    return this.getPaymentTypeByName(SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes.name).pipe(
      switchMap(types => {
        if (types.length) {
          return of(types.indexOf(PAYMENT_TYPE.BILLME) !== -1);
        }
        return this.getPaymentTypeByName(SYSTEM_SETTINGS_CONFIG.paymentTypes.name).pipe(
          map(types => types.indexOf(PAYMENT_TYPE.BILLME) !== -1)
        );
      })
    );
  }

  get isCreditPaymentTypeEnabled$(): Observable<boolean> {
    return this.getPaymentTypeByName(SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes.name).pipe(
      switchMap(types => {
        if (types.length) {
          return of(types.indexOf(PAYMENT_TYPE.CREDIT) !== -1);
        }
        return this.getPaymentTypeByName(SYSTEM_SETTINGS_CONFIG.paymentTypes.name).pipe(
          map(types => types.indexOf(PAYMENT_TYPE.CREDIT) !== -1)
        );
      })
    );
  }

  get billmeMappingArr$(): Observable<BillMeMapping[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.billMeMapping.name);

        return settingInfo && parseArrayFromString<BillMeMapping>(settingInfo.value);
      })
    );
  }

  private getPaymentTypeByName(settingName: string): Observable<PAYMENT_TYPE[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(settings, settingName);
        return settingInfo.value && settingInfo.value.length > 0 ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  //-------------------- Dynamic form settings block end--------------------------//

  trackByAccountId(i: number): string {
    return `${i}`;
  }

  parseFloat(value): number {
    return parseFloat(value);
  }

  async onPaymentMethodChanged(value) {
    if (value === 'addCC') {
      this.automaticDepositForm.reset();
      const paymentSystem = await this.definePaymentSystemType();

      if (paymentSystem === PAYMENT_SYSTEM_TYPE.MONETRA) {
        this.router.navigate([NAVIGATE.accounts, LOCAL_ROUTING.addCreditCard], {
          skipLocationChange: true,
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

  async onDepositTypeChangedHandler(type: number) {
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

    await this.updateFormStateByDepositType(type);
  }

  async onFrequencyChanged(event: string) {
    this._activeFrequency = event;
    await this.updateFormStateByDepositType(this.activeAutoDepositType, event);
  }

  async onSubmit() {
    if (this.automaticDepositForm && this.automaticDepositForm.invalid) return;

    let predefinedUpdateCall;

    if (this.automaticDepositForm === null) {
      predefinedUpdateCall = this.autoDepositService.updateAutoDepositSettings({
        ...this.autoDepositSettings,
        active: false,
      });
    } else {
      const { paymentMethod, account, ...rest } = this.automaticDepositForm.value;
      const isBillme: boolean = paymentMethod === PAYMENT_TYPE.BILLME;
      const sourceAccForBillmeDeposit: Observable<UserAccount> = this.billmeMappingArr$.pipe(
        switchMap(billmeMappingArr => this.depositService.sourceAccForBillmeDeposit(account, billmeMappingArr))
      );

      if (this.activeAutoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased) this.timeBasedResolver();

      const resultSettings = {
        ...this.autoDepositSettings,
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

  private timeBasedResolver() {
    this.autoDepositSettings =
      this.activeFrequency === DEPOSIT_FREQUENCY.week
        ? { ...this.autoDepositSettings, dayOfMonth: 0 }
        : { ...this.autoDepositSettings, dayOfWeek: 0 };
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

  private async getAmountToDepositErrors(): Promise<any[]> {
    const settings = await this.settingService.settings$.pipe(first()).toPromise();
    const maxSetting =
      this.activePaymentType === PAYMENT_TYPE.BILLME
        ? SYSTEM_SETTINGS_CONFIG.maxAmountbillme
        : SYSTEM_SETTINGS_CONFIG.maxAmountCreditCard;

    const minSetting =
      this.activePaymentType === PAYMENT_TYPE.BILLME
        ? SYSTEM_SETTINGS_CONFIG.minAmountbillme
        : SYSTEM_SETTINGS_CONFIG.minAmountCreditCard;

    const max = parseFloat(this.settingService.getSettingByName(settings, maxSetting.name).value);
    const min = parseFloat(this.settingService.getSettingByName(settings, minSetting.name).value);

    return [
      formControlErrorDecorator(
        Validators.required,
        CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].requiredEnter
      ),
      formControlErrorDecorator(
        validateInputAmount,
        CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].input
      ),
      formControlErrorDecorator(
        Validators.max(max),
        CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].maximum + Number(max).toFixed(2)
      ),
      formControlErrorDecorator(
        Validators.min(min),
        CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].minimum + Number(min).toFixed(2)
      ),
    ];
  }

  private async setValidators() {
    if (this.automaticDepositForm.contains(this.controlNames.lowBalanceAmount)) {
      const isLowBalanceFreeInput = await this.isLowBalanceFreeInput$.pipe(first()).toPromise();
      const freeFormErrors = [
        formControlErrorDecorator(
          Validators.required,
          CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].requiredEnter
        ),
        formControlErrorDecorator(
          validateInputAmount,
          CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].input
        ),
        formControlErrorDecorator(
          Validators.maxLength(6),
          CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].maximum
        ),
        formControlErrorDecorator(
          Validators.min(0),
          CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].minimum
        ),
      ];
      const selectErrors = formControlErrorDecorator(
        Validators.required,
        CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].requiredSelect
      );
      const errors = isLowBalanceFreeInput ? freeFormErrors : selectErrors;

      this.automaticDepositForm.get(this.controlNames.lowBalanceAmount).setValidators(errors);
    }

    if (this.automaticDepositForm.contains(this.controlNames.amountToDeposit)) {
      const isAllowFreeFormAmountToDeposit = await this.isFreeFormAmountToDepositEnabled$.pipe(first()).toPromise();
      const errors = isAllowFreeFormAmountToDeposit
        ? await this.getAmountToDepositErrors()
        : formControlErrorDecorator(
            Validators.required,
            CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].requiredSelect
          );

      this.automaticDepositForm.get(this.controlNames.amountToDeposit).setValidators(errors);
    }
  }

  // -------------------- Controls block --------------------------//

  private initPaymentFormBlock(): { [key: string]: any[] } {
    const accountValidators = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.account].required),
    ];
    const paymentMethodValidators = [
      formControlErrorDecorator(
        Validators.required,
        CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod].required
      ),
    ];

    return {
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.account]: [
        this.destinationAccount ? this.destinationAccount : '',
        accountValidators,
      ],
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit]: [this.autoDepositSettings.amount],
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod]: [
        this.paymentMethodAccount ? this.paymentMethodAccount : '',
        paymentMethodValidators,
      ],
    };
  }

  private initTimeBasedBlock(frequency: string): { [key: string]: any[] } {
    let validators;
    let controlName;
    let day;

    if (frequency === this.frequency.month) {
      day = this.autoDepositSettings.dayOfMonth;
      controlName = AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth;
      validators = [
        formControlErrorDecorator(
          Validators.required,
          CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth].required
        ),
        formControlErrorDecorator(validateMonthRange, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth].range),
      ];
    } else {
      day = this.autoDepositSettings.dayOfWeek;
      controlName = AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek;
      validators = [
        formControlErrorDecorator(
          Validators.required,
          CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek].required
        ),
      ];
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
      return getLowBalanceSuccessBodyMessage(this.amountToDeposit.value, this.lowBalanceAmount.value, 'Bill me');
    }
    if (this.activeAutoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased) {
      return this.activeFrequency === DEPOSIT_FREQUENCY.month
        ? getMonthlySuccessBodyMessage(this.amountToDeposit.value, this.dayOfMonth.value, 'Bill me')
        : getWeeklySuccessBodyMessage(this.amountToDeposit.value, this.dayOfWeek.value - 1, 'Bill me');
    }
  }

  private definePaymentSystemType(): Promise<number> {
    return this.settingService.settings$
      .pipe(
        map(settings => {
          const settingInfo = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.paymentSystem.name);

          return parseInt(settingInfo.value);
        }),
        first()
      )
      .toPromise();
  }

  private addUSAePayCreditCard() {
    this.nativeProvider
      .addUSAePayCreditCard()
      .pipe(take(1))
      .subscribe(({ success, errorMessage }) => {
        if (!success) {
          return this.showToast(errorMessage);
        }
        this.loadingService.showSpinner();

        // Update user accounts for refreshing Credit Card dropdown list
        zip(this.depositService.getUserAccounts(), this.isBillMePaymentTypesEnabled$)
          .pipe(
            take(1),
            finalize(() => this.loadingService.closeSpinner())
          )
          .subscribe(([accounts, isBillMeEnabled]) => {
            const creditCardSourceAccounts = accounts
              ? this.depositService.filterAccountsByPaymentSystem(accounts)
              : [];
            this.sourceAccounts = [...creditCardSourceAccounts];
            if (isBillMeEnabled) this.sourceAccounts.push(PAYMENT_TYPE.BILLME);
            this.automaticDepositForm.reset();
            this.cdRef.detectChanges();
          });
      });
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
    modal.onDidDismiss().then(async () => await this.router.navigate([NAVIGATE.accounts]));
    await modal.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
    });
    await toast.present();
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
    maximum: 'Value can not be greater than 999 999',
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
