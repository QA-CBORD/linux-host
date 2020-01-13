import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MealDonationsService } from '@sections/accounts/services/meal-donations.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { formControlErrorDecorator } from '@core/utils/general-helpers';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Observable, of } from 'rxjs';
import { UserAccount } from '@core/model/account/account.model';
import { map, tap, take } from 'rxjs/operators';
import { AccountsService } from '@sections/accounts/services/accounts.service';
import { ActivatedRoute } from '@angular/router';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { PopoverController, ToastController } from '@ionic/angular';
import { SYSTEM_SETTINGS_CONFIG } from '@sections/accounts/accounts.config';

@Component({
  selector: 'st-meal-donations',
  templateUrl: './meal-donations.component.html',
  styleUrls: ['./meal-donations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealDonationsComponent implements OnInit {
  tenders$: Observable<UserAccount[]>;
  activeAccount$: Observable<UserAccount>;
  isFreeFormEnabled$: Observable<boolean>;
  amountsForSelect$: Observable<any> = of([1, 2, 3]);
  mealDonationsForm: FormGroup;
  // mealDonationsSettings: SettingInfo[];
  mealEquivalent: Observable<number> = of(6);
  minAmount: number = 1;
  maxAmount: number;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  constructor(
    private readonly mealDonatService: MealDonationsService,
    private readonly loadingService: LoadingService,
    private readonly accountService: AccountsService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly toastController: ToastController,
    private readonly popoverCtrl: PopoverController,
    private readonly keyboard: Keyboard
  ) {}

  ngOnInit() {
    this.tenders$ = this.mealDonatService.getAccountsFilteredByMealDonationsTenders();
    
    this.isFreeFormEnabled();
    this.initForm();
    this.changesHandler();
  }

  get account(): AbstractControl {
    return this.mealDonationsForm.get(this.controlsNames.account);
  }

  get inputAmount(): AbstractControl {
    return this.mealDonationsForm.get(this.controlsNames.inputAmount);
  }

  get selectAmount(): AbstractControl {
    return this.mealDonationsForm.get(this.controlsNames.selectAmount);
  }

  get controlsNames() {
    return REQUEST_MEALS_CONTROL_NAMES;
  }

  isFreeFormEnabled() {
    this.isFreeFormEnabled$ = this.mealDonatService.settings$.pipe(
      take(1),
      map(settings => {
        console.log(settings)
        const settingInfo = this.mealDonatService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.mealDonationsAllowFreeform.name,
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      }),
    );
  }

  onFocus() {
    this.keyboard.isVisible && this.keyboard.hide();
  }

  private initForm() {
    const accountErrors = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.account].required),
    ];
    this.mealDonationsForm = this.fb.group({
      [this.controlsNames.account]: ['', accountErrors],
      [this.controlsNames.inputAmount]: [''],
      [this.controlsNames.selectAmount]: [''],
    });

    this.setValidators();
  }

  private setValidators() {
    this.isFreeFormEnabled$.pipe(take(1)).subscribe(isFreeForm => {
      isFreeForm
        ? this.mealDonationsForm.controls[this.controlsNames.inputAmount].setValidators([
            formControlErrorDecorator(
              Validators.required,
              CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.inputAmount].required
            ),
            formControlErrorDecorator(
              Validators.min(this.minAmount),
              CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.inputAmount].min
            ),
            formControlErrorDecorator(
              (control: AbstractControl) => Validators.max(this.maxAmount)(control),
              CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.inputAmount].max
            ),
          ])
        : this.mealDonationsForm.controls[this.controlsNames.selectAmount].setValidators([
            formControlErrorDecorator(
              Validators.required,
              CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.selectAmount].required
            ),
            formControlErrorDecorator(
              Validators.min(this.minAmount),
              CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.selectAmount].min
            ),
            formControlErrorDecorator(
              (control: AbstractControl) => Validators.max(this.maxAmount)(control),
              CONTROL_ERROR[REQUEST_MEALS_CONTROL_NAMES.selectAmount].max
            ),
          ]);
    });
  }

  private changesHandler() {
    this.mealDonationsForm.valueChanges.subscribe(value => {
      this.activeAccount$ = value.account;
      this.maxAmount = value.account.balance.toFixed();
    });
  }

  async onSubmit() {
    if (!this.mealDonationsForm.valid) {
      return;
    }

    const {
      [this.controlsNames.account]: account,
      [this.controlsNames.inputAmount]: inputAmount,
      [this.controlsNames.selectAmount]: selectAmount,
    } = this.mealDonationsForm.getRawValue();

    console.log(account, inputAmount, selectAmount);

    // await this.loadingService.showSpinner();

    // this.userService
    //   .getUserSettingsBySettingName('quick_amount')
    //   .pipe(
    //     switchMap(({ response: { value: v } }) => this.userService.requestDeposit(n, e, m, a, v)),
    //     take(1)
    //   )
    //   .subscribe(
    //     async ({ response }) => {
    //       await this.loadingService.closeSpinner();
    //       response ? this.showModal() : this.showToast();
    //     },
    //     async () => await this.loadingService.closeSpinner()
    //   );
  }

  // private async showToast(): Promise<void> {
  //   const toast = await this.toastController.create({
  //     message: 'Something went wrong...',
  //     duration: 3000,
  //     position: 'top',
  //   });
  //   await toast.present();
  // }

  // private async showModal(): Promise<void> {
  //   const modal = await this.popoverCtrl.create({
  //     component: PopoverComponent,
  //     componentProps: {
  //       data: { title: 'Donations Sent!', message: 'Yor donations was sent successfully.' },
  //     },
  //     animated: false,
  //     backdropDismiss: true,
  //   });
  //   modal.onDidDismiss();
  //   modal.present();
  // }
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
