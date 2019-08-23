import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SettingService } from '../../services/setting.service';
import { map, take, tap } from 'rxjs/operators';
import { SYSTEM_SETTINGS_CONFIG } from '../../accounts.config';

@Component({
  selector: 'st-automatic-deposit-page',
  templateUrl: './automatic-deposit-page.component.html',
  styleUrls: ['./automatic-deposit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomaticDepositPageComponent implements OnInit {
  automaticDepositForm: FormGroup;
  activeType: number;
  lowBalanceAvailableAmounts: Observable<number[]>;

  constructor(private readonly fb: FormBuilder,
              private readonly settingService: SettingService) {
  }

  get controlNames() {
    return AUTOMATIC_DEPOSIT_CONTROL_NAMES;
  }

  get isLowBalanceFreeInput(): Observable<boolean> {
    return this.settingService.settings$.pipe(map((settings) => {
      const settingInfo = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.lowBalanceFreeFormEnabled.name);
      return settingInfo && Boolean(Number(settingInfo));
    }))
  }

  ngOnInit() {
    this.initForm();
    this.setValidator();
  }

  onTypeChangedHandler($event: number) {
  }

  private initForm() {
    this.automaticDepositForm = this.fb.group(this.initLowBalanceFormBlock());
  }

  private setValidator() {
    this.isLowBalanceFreeInput.pipe(
      tap(val => {
        const error = val
          ? CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].requiredEnter
          : CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].requiredSelect;
        this.automaticDepositForm.get(AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount)
          .setValidators([errorDecorator(Validators.required, error), errorDecorator(Validators.required, error)]);
      }),
      take(1),
    ).subscribe(() => console.log(this.automaticDepositForm));
  }

  private initPaymentFormBlock(): { [key: string]: any } {
    const accountValidators = [
      errorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.account].required)
    ];
    const amountToDepositValidators = [
      errorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].requiredEnter)
    ];
    const paymentMethodValidators = [
      errorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod].required)
    ];

    return {
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.account]: ['', accountValidators],
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit]: ['', amountToDepositValidators],
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod]: ['', paymentMethodValidators],
    };
  }

  private initMonthlyFormBlock() {
    const validators = [errorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth].required)];

    return { [AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth]: ['', validators] };
  }

  private initWeeklyFormBlock() {
    const validators = [errorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek].required)];

    return { [AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek]: ['', validators] };
  }

  private initLowBalanceFormBlock() {
    return { [AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount]: [''] };
  }
}

export enum AUTOMATIC_DEPOSIT_CONTROL_NAMES {
  amountToDeposit = 'amountToDeposit',
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
  },
};

const errorDecorator = (fn: ValidatorFn, errorMsg: string): ((control: AbstractControl) => ValidationErrors | null) => {
  return control => {
    return fn(control) === null ? null : { errorMsg };
  };
};

