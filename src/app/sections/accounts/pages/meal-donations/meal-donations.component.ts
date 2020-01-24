import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, take, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { MealDonationsService } from '@sections/accounts/pages/meal-donations/service/meal-donations.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { formControlErrorDecorator, validateInteger, validateInputAmount } from '@core/utils/general-helpers';
import { UserAccount } from '@core/model/account/account.model';
import { SYSTEM_SETTINGS_CONFIG } from '@sections/accounts/accounts.config';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { AccountType, NAVIGATE } from 'src/app/app.global';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ConfirmDonatePopoverComponent } from './components/confirm-donate-popover';
import { PopoverComponent } from './components/popover/popover.component';

@Component({
  selector: 'st-meal-donations',
  templateUrl: './meal-donations.component.html',
  styleUrls: ['./meal-donations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealDonationsComponent {
  private readonly sourceSubscription: Subscription = new Subscription();

  formHasBeenPrepared: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showContent: boolean;
  accounts$: Observable<UserAccount[]>;
  isFreeFormEnabled$: Observable<boolean>;
  fixedAmounts$: Observable<Array<number>>;
  mealsForm: FormGroup;
  minAmount: number = 1;
  maxAmount: number;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly mealDonationsService: MealDonationsService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly popoverCtrl: PopoverController,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ionViewWillEnter() {
    this.accounts$ = this.mealDonationsService.getAccountsFilteredByMealsTenders();
    this.showContent = true;
    this.isFreeFormEnabled();
    this.initForm();
    this.cdRef.detectChanges();
  }

  ionViewWillLeave() {
    this.sourceSubscription.unsubscribe();
    this.deleteForm();
    this.showContent = false;
  }

  get accountTypes() {
    return AccountType;
  }

  get account(): AbstractControl {
    return this.mealsForm.get(this.controlsNames.account);
  }

  get amount(): AbstractControl {
    return this.mealsForm.get(this.controlsNames.amount);
  }

  get controlsNames() {
    return REQUEST_MEALS_CONTROL_NAMES;
  }

  isFreeFormEnabled() {
    this.isFreeFormEnabled$ = this.mealDonationsService.settings$.pipe(
      map(settings => {
        const settingInfo = this.mealDonationsService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.mealsAllowFreeform.name
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  onSubmit() {
    if (this.mealsForm.invalid) {
      this.onErrorRetrieve('Form is invalid');
      return;
    }

    const { account, amount } = this.mealsForm.value;
    const toDecimal = Number(amount).toFixed(2);
    const amountValue = Number(toDecimal);

    this.confirmationDepositPopover({ account, amountValue });
  }

  async confirmationDepositPopover(data: { account: Account; amountValue: number }) {
    const popover = await this.popoverCtrl.create({
      component: ConfirmDonatePopoverComponent,
      componentProps: {
        data,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.loadingService.showSpinner();
        this.mealDonationsService
          .donate(data.account.id, data.amountValue)
          .pipe(
            take(1),
            finalize(() => this.loadingService.closeSpinner())
          )
          .subscribe(
            async () => await this.showModal(),
            () => this.onErrorRetrieve('Something went wrong, please try again...')
          );
      }
    });

    return await popover.present();
  }

  isAccountSelected() {
    if (!this.account.value) {
      this.onErrorRetrieve('Please select accounts');
    }
  }

  private initForm() {
    const accountErrors = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.account].required),
    ];
    this.mealsForm = this.fb.group({
      [this.controlsNames.account]: ['', accountErrors],
      [this.controlsNames.amount]: [''],
    });

    this.accountChangesHandler();
    this.formHasBeenPrepared.next(true);
  }

  private accountChangesHandler() {
    const subscription = this.account.valueChanges.subscribe(({ balance, accountType }) => {
      this.maxAmount = balance.toFixed(2);
      this.setFixedAmount(accountType);
      this.setAmountValidators(accountType);
      this.amount.reset();
    });
    this.sourceSubscription.add(subscription);
  }

  private setAmountValidators(accountType: number) {
    const amountError = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].required),
      formControlErrorDecorator(Validators.min(this.minAmount), CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].min),
      formControlErrorDecorator(
        (control: AbstractControl) => Validators.max(this.maxAmount)(control),
        CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].max
      )
    ];
    
    if(accountType === AccountType.MEALS) {
      amountError.push(formControlErrorDecorator(validateInteger, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].integer));
    } else {
      amountError.push(formControlErrorDecorator(validateInputAmount, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].integer));
    }

    this.amount.setValidators(amountError);
  }

  private setFixedAmount(accountType: number) {
    this.fixedAmounts$ = this.mealDonationsService.settings$.pipe(
      map(settings => {
        const settingInfo = this.mealDonationsService.getSettingByName(
          settings,
          accountType === AccountType.MEALS
            ? SYSTEM_SETTINGS_CONFIG.mealsFixedMealAmounts.name
            : SYSTEM_SETTINGS_CONFIG.mealsFixedDollarAmounts.name
        );
        return settingInfo && parseArrayFromString(settingInfo.value);
      })
    );
  }

  private async showModal(): Promise<void> {
    const modal = await this.popoverCtrl.create({
      component: PopoverComponent,
      componentProps: {
        data: { title: 'Donations Sent!', message: 'Yor donations was sent successfully.' },
      },
      animated: false,
      backdropDismiss: true,
    });
    modal
      .onDidDismiss()
      .then(async () => await this.router.navigate([NAVIGATE.accounts], { skipLocationChange: true }));
    await modal.present();
  }

  private async onErrorRetrieve(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
    });
    toast.present();
  }

  private deleteForm() {
    this.mealsForm = null;
    this.formHasBeenPrepared.next(false);
  }
}

export enum REQUEST_MEALS_CONTROL_NAMES {
  account = 'account',
  amount = 'amount',
}

export const CONTROL_ERROR = {
  [REQUEST_MEALS_CONTROL_NAMES.account]: {
    required: 'You must choose an account.',
  },
  [REQUEST_MEALS_CONTROL_NAMES.amount]: {
    required: 'Please enter an amount',
    integer: 'The amount should be an integer',
    integerOrDecimal: 'The amount should be an integer or decimal',
    max: 'The amount should be less or equal to the balance',
    min: 'The amount must be more than 0',
  },
};
