import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController, NavController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';

import {
  MealDonationsService,
  MealComponentContentStrings,
} from '@sections/accounts/pages/meal-donations/service/meal-donations.service';
import { LoadingService } from '@core/service/loading/loading.service';
import {
  formControlErrorDecorator,
  parseArrayFromString,
  validateInteger,
  validateInputAmount,
} from '@core/utils/general-helpers';
import { UserAccount } from '@core/model/account/account.model';
import { AccountType, PATRON_NAVIGATION, Settings } from 'src/app/app.global';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ConfirmDonatePopoverComponent } from './components/confirm-donate-popover';
import { DonateModalComponent } from './components/donate-modal';
import { MEAL_CONTENT_STRINGS } from '@sections/accounts/pages/meal-donations/meal-donation.config';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-meal-donations',
  templateUrl: './meal-donations.component.html',
  styleUrls: ['./meal-donations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealDonationsComponent implements OnInit {
  formHasBeenPrepared: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showContent: boolean;
  accounts$: Observable<UserAccount[]>;
  isFreeFormEnabled$: Observable<boolean>;
  fixedAmounts$: Observable<Array<number>>;
  mealsForm: FormGroup;
  maxAmount: number;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  contentStrings: MealComponentContentStrings = <MealComponentContentStrings>{};

  private readonly sourceSubscription: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly mealDonationsService: MealDonationsService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly popoverCtrl: PopoverController,
    private readonly modalCtrl: ModalController,
    private readonly navCtrl: NavController,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.initContentStrings();
    this.updateFormErrorsByContentStrings();
  }


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
        const settingInfo = this.mealDonationsService.getSettingByName(settings, Settings.Setting.MEAL_DONATIONS_FREEFORM_ENABLED.split('.')[2]);

        return settingInfo && Boolean(Number(settingInfo.value));
      }),
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

  async confirmationDepositPopover(data: { account: UserAccount; amountValue: number }) {
    const popover = await this.popoverCtrl.create({
      component: ConfirmDonatePopoverComponent,
      componentProps: {
        data,
        policyTitle$: this.contentStrings.donationPolicyTitle,
        policyContent$: this.contentStrings.donationPolicyContent,
        buttonDonate$: this.contentStrings.buttonDonate,
        buttonCancel$: this.contentStrings.buttonCancel,
        confirmationTitle$: this.contentStrings.donationConfirmationTitle,
        donateAmount$: this.contentStrings.donateAmount,
        account$: this.contentStrings.labelAccount,
      },
      animated: false,
      backdropDismiss: false,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.loadingService.showSpinner();
        this.mealDonationsService
          .donate(data.account.id, data.amountValue)
          .pipe(
            take(1),
            finalize(() => this.loadingService.closeSpinner()),
          )
          .subscribe(
            async () => await this.showModal(data),
            () => this.onErrorRetrieve('Something went wrong, please try again...'),
          );
      }
    });

    return await popover.present();
  }

  isAccountSelected() {
    if (!this.account.value) {
      this.onErrorRetrieve(CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.account].required);
    }
  }

  private initForm() {
    const accountErrors = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.account].required),
    ];
    this.mealsForm = this.fb.group({
      [this.controlsNames.account]: ['', accountErrors],
      [this.controlsNames.amount]: ['', Validators.required],
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
      formControlErrorDecorator(
        (control: AbstractControl) => Validators.max(this.maxAmount)(control),
        CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].max,
      ),
      accountType === AccountType.MEALS
        ? formControlErrorDecorator(validateInteger, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].mealInput)
        : formControlErrorDecorator(validateInputAmount, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].currency),
    ];

    this.amount.setValidators(amountError);
  }

  private setFixedAmount(accountType: number) {
    this.fixedAmounts$ = this.mealDonationsService.settings$.pipe(
      map(settings => {
        const settingInfo = this.mealDonationsService.getSettingByName(
          settings,
          accountType === AccountType.MEALS
            ? Settings.Setting.MEAL_DONATIONS_FIXED_MEAL_AMOUNTS.split('.')[2]
            : Settings.Setting.MEAL_DONATIONS_FIXED_DOLLAR_AMOUNTS.split('.')[2]
        );
        return settingInfo && parseArrayFromString(settingInfo.value);
      }),
    );
  }

  private async showModal(data): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DonateModalComponent,
      animated: true,
      componentProps: {
        data,
        headerTitle$: this.contentStrings.headerTitle,
        dialogLabelSuccess$: this.contentStrings.dialogLabelSuccess,
        completeMessage$: this.contentStrings.completeMessage,
        buttonDone$: this.contentStrings.buttonDone,
        donateAmount$: this.contentStrings.donateAmount,
        account$: this.contentStrings.labelAccount,
      },
      backdropDismiss: true,
    });
    modal
      .onDidDismiss()
      .then(async () => await this.navCtrl.navigateBack([PATRON_NAVIGATION.accounts]));
    await modal.present();
  }

  private async onErrorRetrieve(message: string) {
    await this.toastService.showToast({ message });
  }

  private deleteForm() {
    this.mealsForm = null;
    this.formHasBeenPrepared.next(false);
  }

  private initContentStrings() {
    this.contentStrings.headerTitle = this.getContentStringByName(MEAL_CONTENT_STRINGS.headerTitle);
    this.contentStrings.buttonDonate = this.getContentStringByName(MEAL_CONTENT_STRINGS.buttonDonate);
    this.contentStrings.buttonCancel = this.getContentStringByName(MEAL_CONTENT_STRINGS.buttonCancel);
    this.contentStrings.fundingAccounts = this.getContentStringByName(MEAL_CONTENT_STRINGS.fundingAccounts);
    this.contentStrings.donationInstructions = this.getContentStringByName(MEAL_CONTENT_STRINGS.donationInstructions);
    this.contentStrings.donationPolicyTitle = this.getContentStringByName(MEAL_CONTENT_STRINGS.donationPolicyTitle);
    this.contentStrings.donationPolicyContent = this.getContentStringByName(MEAL_CONTENT_STRINGS.donationPolicyContent);
    this.contentStrings.buttonDonate = this.getContentStringByName(MEAL_CONTENT_STRINGS.buttonDonate);
    this.contentStrings.donationConfirmationTitle = this.getContentStringByName(MEAL_CONTENT_STRINGS.donationConfirmationTitle);
    this.contentStrings.donateAmount = this.getContentStringByName(MEAL_CONTENT_STRINGS.donateAmount);
    this.contentStrings.labelAccount = this.getContentStringByName(MEAL_CONTENT_STRINGS.labelAccount);
    this.contentStrings.buttonDone = this.getContentStringByName(MEAL_CONTENT_STRINGS.buttonDone);
    this.contentStrings.completeMessage = this.getContentStringByName(MEAL_CONTENT_STRINGS.completeMessage);
    this.contentStrings.dialogLabelSuccess = this.getContentStringByName(MEAL_CONTENT_STRINGS.dialogLabelSuccess);

    //Form Error String
    this.contentStrings.formErrorEmpty = this.getContentStringByName(MEAL_CONTENT_STRINGS.formErrorEmpty);
    this.contentStrings.formErrorInsufficientFunds = this.getContentStringByName(MEAL_CONTENT_STRINGS.formErrorInsufficientFunds);
    this.contentStrings.formErrorInvalideFormat = this.getContentStringByName(MEAL_CONTENT_STRINGS.formErrorInvalideFormat);
    this.contentStrings.formErrorSelectedAccount = this.getContentStringByName(MEAL_CONTENT_STRINGS.formErrorSelectedAccount);
    this.contentStrings.formErrorMealsPositiveWhole = this.getContentStringByName(MEAL_CONTENT_STRINGS.formErrorMealsPositiveWhole);
  }

  private getContentStringByName(name: MEAL_CONTENT_STRINGS): Observable<string> {
    return this.mealDonationsService.getMealsDonationContentStringByName$(name);
  }

  private async updateFormErrorsByContentStrings(): Promise<void> {
    CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.account].required = await this.contentStrings.formErrorSelectedAccount
      .pipe(take(1))
      .toPromise();
    CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].required = await this.contentStrings.formErrorEmpty
      .pipe(take(1))
      .toPromise();
    CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].max = await this.contentStrings.formErrorInsufficientFunds
      .pipe(take(1))
      .toPromise();
    CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].mealInput = await this.contentStrings.formErrorMealsPositiveWhole
      .pipe(take(1))
      .toPromise();
    CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.amount].currency = await this.contentStrings.formErrorInvalideFormat
      .pipe(take(1))
      .toPromise();
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
    max: 'There are not enough funds in the selected account',
    mealInput: 'Please donate a whole, positive number of meals',
    currency: 'Invalid format',
  },
};
