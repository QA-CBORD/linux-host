import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, zip, Subscription, of, iif } from 'rxjs';
import { SettingService } from '../../services/setting.service';
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
} from '../../../../core/utils/general-helpers';
import { PopoverComponent } from './components/popover/popover.component';
import { PopoverController, ToastController } from '@ionic/angular';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { SYSTEM_SETTINGS_CONFIG, PAYMENT_TYPE } from '../../accounts.config';
import { WEEK } from '../../../../core/utils/date-helper';
import { UserAutoDepositSettingInfo } from './models/auto-deposit-settings';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositService } from '../../services/deposit.service';
import { AutoDepositService } from './service/auto-deposit.service';
import { NAVIGATE } from '../../../../app.global';

@Component({
  selector: 'st-automatic-deposit-page',
  templateUrl: './automatic-deposit-page.component.html',
  styleUrls: ['./automatic-deposit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomaticDepositPageComponent implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();

  automaticDepositForm: FormGroup;
  activeType: number;
  activeFrequency: string;
  autoDepositSettings: UserAutoDepositSettingInfo;
  creditCardSourceAccounts: Array<UserAccount>;
  creditCardDestinationAccounts: Array<UserAccount>;
  billmeDestinationAccounts: Array<UserAccount>;
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
  ) {
  }

  ngOnInit() {
    this.getAccounts();
  }

  ngOnDestroy() {
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

  get lowBalanceValues(): Observable<string[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.lowBalanceAmounts.name,
        );

        return settingInfo ? parseArrayFromString<string>(settingInfo.value) : [];
      }),
    );
  }

  get amountToDepositValues(): Observable<string[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.billMeFreeFormAmounts.name,
        );

        return settingInfo ? parseArrayFromString<string>(settingInfo.value) : [];
      }),
    );
  }

  get autoDepositTenders(): Observable<string[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.autoDepositTenders.name,
        );

        return settingInfo && parseArrayFromString<string>(settingInfo.value);
      }),
    );
  }

  get isAllowFreeFormBillMe(): Observable<boolean> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.billMeFreeFormEnabled.name,
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      }),
    );
  }

  get isLowBalanceFreeInput(): Observable<boolean> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.lowBalanceFreeFormEnabled.name,
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      }),
    );
  }

  get isBillMePaymentTypesEnabled(): Observable<boolean> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes.name,
        );

        const parsedArray = parseArrayFromString(settingInfo.value);

        return parsedArray.indexOf(PAYMENT_TYPE.BILLME) !== -1;
      }),
    );
  }

  get billmeMappingArr(): Observable<string[]> {
    return this.settingService.settings$.pipe(
      map(settings => {
        const settingInfo = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.billMeMapping.name);

        return settingInfo && parseArrayFromString<string>(settingInfo.value);
      }),
    );
  }

  trackByAccountId(i: number, { id }: UserAccount): string {
    return `${i}-${id}-${Math.random()}`;
  }

  onPaymentMethodChanged({ target }) {
    this.defineDestAccounts(target.value);
  }

  private defineDestAccounts(target) {
    if (target === 'billme') {
      this.destinationAccounts = this.billmeDestinationAccounts;
    } else {
      this.destinationAccounts = this.creditCardDestinationAccounts;
    }
    this.account.reset();
  }

  private getAccounts() {
    const subscription = zip(this.autoDepositTenders, this.billmeMappingArr)
      .pipe(
        switchMap(arr => {
          return this.route.data.pipe(
            tap(({ data: { accounts, depositSettings } }) => {
              this.autoDepositSettings = depositSettings;
              this.creditCardSourceAccounts = this.filterAccountsByPaymentSystem(accounts);
              this.creditCardDestinationAccounts = this.filterCreditCardDestAccounts(arr[0], accounts);
              this.billmeDestinationAccounts = this.filterBillmeDestAccounts(arr[1], accounts);
            }),
          );
        }),
      )
      .subscribe(() => {
        // this.cdRef.detectChanges();
        this.initForm();
        this.defineDestAccounts('creditcard');
      });

    this.sourceSubscription.add(subscription);
  }

  //-------------------- Dynamic form settings block end--------------------------//

  private set _activeType(type: number) {
    this.activeType = type;
  }

  parseFloat(val: string): number {
    return parseFloat(val);
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
    billmeMappingArr: Array<string>,
  ): Observable<UserAccount> {
    return this.depositService.sourceAccForBillmeDeposit(selectedAccount, billmeMappingArr);
  }

  // -------------------- Events handlers block--------------------------//

  onTypeChangedHandler(type: number) {
    const isAutomaticDepositOff = type === this.autoDepositTypes.automaticDepositOff;
    const wasDestroyed =
      type !== this.autoDepositTypes.automaticDepositOff &&
      this.activeType === this.autoDepositTypes.automaticDepositOff;

    if (isAutomaticDepositOff) {
      this.automaticDepositForm = null;
      return (this._activeType = type);
    } else if (wasDestroyed) {
      this.initForm();
    }

    this.updateFormState(type);
  }

  onFrequencyChanged(event: string) {
    this.activeFrequency = event;
    this.updateFormState(this.activeType, event);
  }

  onSubmit() {
    if(this.automaticDepositForm && this.automaticDepositForm.invalid) return;

    let predefinedUpdateCall;

    if (this.automaticDepositForm === null) {
      predefinedUpdateCall = this.autoDepositService.updateAutoDepositSettings({
        ...this.autoDepositSettings,
        active: false,
      });
    } else {
      const { paymentMethod, account, ...rest } = this.automaticDepositForm.value;
      const isBillme: boolean = paymentMethod === 'billme';
      const sourceAccForBillmeDeposit: Observable<UserAccount> = this.billmeMappingArr.pipe(
        switchMap(billmeMappingArr => this.sourceAccForBillmeDeposit(account, billmeMappingArr)),
      );
      const resultSettings = {
        ...this.autoDepositSettings,
        ...rest,
        autoDepositType: this.activeType,
        toAccountId: account.id,
      };
      predefinedUpdateCall = iif(() => isBillme, sourceAccForBillmeDeposit, of(paymentMethod)).pipe(
        switchMap(sourceAcc =>
          this.autoDepositService.updateAutoDepositSettings({ ...resultSettings, fromAccountId: sourceAcc.id }),
        ),
      );
    }

    predefinedUpdateCall.pipe(take(1)).subscribe(
      async res => res && await this.showModal(),
      async () => await this.showToast('Something went wrong please try again later...'),
    );
  }

  // -------------------- Events handlers block end --------------------------//

  // -------------------- Form main block --------------------------//

  private initForm() {
    const payment = this.initPaymentFormBlock();

    this.automaticDepositForm = this.fb.group(payment);
    this.setValidators();
  }

  private updateFormState(type: number, frequency: string = this.activeFrequency) {
    const control = this.getControlByActiveState(type, frequency);
    const controlName = Object.keys(control)[0];
    const controlSetting = control[controlName];

    this.automaticDepositForm.addControl(controlName, new FormControl(controlSetting[0], controlSetting[1]));
    this.updateActiveState(type, frequency);
    this.setValidators();
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
    this.activeFrequency = frequency;
  }

  private cleanControls(controlNames: string[]) {
    for (let i = 0; i < controlNames.length; i++) {
      this.automaticDepositForm.contains(controlNames[i]) && this.automaticDepositForm.removeControl(controlNames[i]);
    }
  }

  private setValidators() {
    this.automaticDepositForm.contains(AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount) &&
    this.isLowBalanceFreeInput
      .pipe(
        tap(val => {
          const error = val
            ? CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].requiredEnter
            : CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].requiredSelect;

          this.automaticDepositForm
            .get(AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount)
            .setValidators([formControlErrorDecorator(Validators.required, error)]);
        }),
        take(1),
      )
      .subscribe();

    this.automaticDepositForm.contains(AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit) &&
    this.isAllowFreeFormBillMe
      .pipe(
        tap(val => {
          const error = val
            ? CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].requiredEnter
            : CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].requiredSelect;

          this.automaticDepositForm
            .get(AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit)
            .setValidators([formControlErrorDecorator(Validators.required, error)]);
        }),
        take(1),
      )
      .subscribe();
  }

  // -------------------- Controls block --------------------------//

  private initPaymentFormBlock(): { [key: string]: any[] } {
    const accountValidators = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.account].required),
    ];
    const paymentMethodValidators = [
      formControlErrorDecorator(
        Validators.required,
        CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod].required,
      ),
    ];

    return {
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.account]: ['', accountValidators],
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit]: [this.autoDepositSettings.amount],
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod]: ['', paymentMethodValidators],
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
          CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth].required,
        ),
        formControlErrorDecorator(validateMonthRange, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth].range),
      ];
    } else {
      day = this.autoDepositSettings.dayOfWeek;
      controlName = AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek;
      validators = [
        formControlErrorDecorator(
          Validators.required,
          CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek].required,
        ),
      ];
    }

    return { [controlName]: [day ? day : '', validators] };
  }

  private initLowBalanceFormBlock(): { [key: string]: any[] } {
    return { [AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount]: [this.autoDepositSettings.lowBalanceAmount] };
  }

  // -------------------- Controls block end --------------------------//

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
    modal.present();
  }

  private getModalBodyMessage(): string {
    if (this.activeType === AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance) {
      return getLowBalanceSuccessBodyMessage(this.amountToDeposit.value, this.lowBalanceAmount.value, 'Bill me');
    }
    if (this.activeType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased) {
      return this.activeFrequency === DEPOSIT_FREQUENCY.month
        ? getMonthlySuccessBodyMessage(this.amountToDeposit.value, this.dayOfMonth.value, 'Bill me')
        : getWeeklySuccessBodyMessage(this.amountToDeposit.value, this.dayOfWeek.value - 1, 'Bill me');
    }
  }

  private getModalTitle(): string {
    if (this.activeType === AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance) {
      return AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.lowBalance;
    }
    if (this.activeType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased) {
      return this.activeFrequency === DEPOSIT_FREQUENCY.month
        ? AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.monthly
        : AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.weekly;
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
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
    requiredSelect: 'You must select a suitable amount from select',
  },
  [AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod]: {
    required: 'You must select payment method.',
  },
  [AUTOMATIC_DEPOSIT_CONTROL_NAMES.account]: {
    required: 'You must choose an account.',
  },
  [AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount]: {
    requiredEnter: 'You must enter an amount.',
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
