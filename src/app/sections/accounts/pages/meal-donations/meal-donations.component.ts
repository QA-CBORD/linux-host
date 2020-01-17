import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { PopoverController, ToastController } from '@ionic/angular';
import { map, take, finalize } from 'rxjs/operators';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { MealDonationsService } from '@sections/accounts/pages/meal-donations/service/meal-donations.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { formControlErrorDecorator } from '@core/utils/general-helpers';
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
    private readonly keyboard: Keyboard,
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

  get inputAmount(): AbstractControl {
    return this.mealsForm.get(this.controlsNames.inputAmount);
  }

  get selectAmount(): AbstractControl {
    return this.mealsForm.get(this.controlsNames.selectAmount);
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

  onFocus() {
    this.keyboard.isVisible && this.keyboard.hide();
  }

  private initForm() {
    const accountErrors = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.account].required),
    ];
    this.mealsForm = this.fb.group({
      [this.controlsNames.account]: ['', accountErrors],
      [this.controlsNames.inputAmount]: [''],
      [this.controlsNames.selectAmount]: [''],
    });

    this.setValidators();
    this.accountChangesHandler();
    this.formHasBeenPrepared.next(true);
  }

  private setValidators() {
    const subscription = this.isFreeFormEnabled$.subscribe(isFreeForm => {
      const amount = isFreeForm ? REQUEST_MEALS_CONTROL_NAMES.inputAmount : REQUEST_MEALS_CONTROL_NAMES.selectAmount;

      this.mealsForm.controls[this.controlsNames[amount]].setValidators([
        formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES[amount]].required),
        formControlErrorDecorator(
          Validators.min(this.minAmount),
          CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES[amount]].min
        ),
        formControlErrorDecorator(
          (control: AbstractControl) => Validators.max(this.maxAmount)(control),
          CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES[amount]].max
        ),
      ]);
    });
    this.sourceSubscription.add(subscription);
  }

  private accountChangesHandler() {
    const subscription = this.account.valueChanges.subscribe(({ balance, accountType }) => {
      this.maxAmount = balance.toFixed(2);
      this.setFixedAmount(accountType);
      this.selectAmount.reset();
      this.inputAmount.reset();
    });
    this.sourceSubscription.add(subscription);
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

  onSubmit() {
    if (this.mealsForm.invalid) {
      this.onErrorRetrieve('Form is invalid');
      return;
    }

    const { account, inputAmount, selectAmount } = this.mealsForm.value;
    let amount = +Number(inputAmount || selectAmount).toFixed(2);

    this.confirmationDepositPopover({ account, amount });
  }

  async confirmationDepositPopover(data: { account: Account; amount: number }) {
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
          .donate(data.account.id, data.amount)
          .pipe(
            take(1),
            finalize(() => this.loadingService.closeSpinner())
          )
          .subscribe(async () => await this.showModal(), () => this.onErrorRetrieve('Something went wrong, please try again...'));
      }
    });

    return await popover.present();
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
  inputAmount = 'inputAmount',
  selectAmount = 'selectAmount',
}

export const CONTROL_ERROR = {
  [REQUEST_MEALS_CONTROL_NAMES.account]: {
    required: 'You must choose an account.',
  },
  [REQUEST_MEALS_CONTROL_NAMES.inputAmount]: {
    required: 'Please enter an amount',
    max: 'The amount should be less or equal to the balance',
    min: 'The amount must be more than 0',
  },
  [REQUEST_MEALS_CONTROL_NAMES.selectAmount]: {
    required: 'Please select an amount',
    max: 'The amount should be less or equal to the balance',
    min: 'The amount must be more than 0',
  },
};
