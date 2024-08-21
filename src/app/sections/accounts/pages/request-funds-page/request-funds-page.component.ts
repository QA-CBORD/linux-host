import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { PopoverComponent } from './popover/popover.component';
import { UserAccount } from '@core/model/account/account.model';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { PATRON_NAVIGATION, User } from 'src/app/app.global';
import { formControlErrorDecorator, validateEmail } from '@core/utils/general-helpers';
import { Keyboard } from '@capacitor/keyboard';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { AppRateService } from '@shared/services/app-rate/app-rate.service';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';

@Component({
  selector: 'st-request-funds-page',
  templateUrl: './request-funds-page.component.html',
  styleUrls: ['./request-funds-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFundsPageComponent implements OnInit {
  accounts$: Observable<UserAccount[]>;
  requestFundsForm: FormGroup;
  isRequesting: boolean;

  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly popoverCtrl: PopoverController,
    private readonly userFacadeService: UserFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly nav: Router,
    private readonly nativeProvider: NativeProvider,
    private readonly appRateService: AppRateService,
    private readonly translateFacadeService: TranslateFacadeService
  ) { }

  get email(): AbstractControl {
    return this.requestFundsForm.get(this.controlsNames.email);
  }

  get name(): AbstractControl {
    return this.requestFundsForm.get(this.controlsNames.name);
  }

  get message(): AbstractControl {
    return this.requestFundsForm.get(this.controlsNames.message);
  }

  get accounts(): AbstractControl {
    return this.requestFundsForm.get(this.controlsNames.account);
  }

  get controlsNames() {
    return REQUEST_FUNDS_CONTROL_NAMES;
  }

  ngOnInit() {
    this.accounts$ = this.accountService
      .getAccountsFilteredByDepositTenders()
      .pipe(map((accounts: UserAccount[]) => accounts.filter(account => account.depositAccepted)));
    this.initForm();
  }

  accountTrack(n: number, { id }: UserAccount): string {
    return id;
  }

  async onSubmit() {
    if (this.requestFundsForm.invalid || this.isRequesting) {
      return;
    }
    this.isRequesting = true;

    const {
      [this.controlsNames.name]: n,
      [this.controlsNames.email]: e,
      [this.controlsNames.message]: m,
      [this.controlsNames.account]: a,
    } = this.requestFundsForm.getRawValue();

    await this.loadingService.showSpinner();

    this.settingsFacadeService
      .getUserSetting(User.Settings.QUICK_AMOUNT)
      .pipe(
        switchMap(({ value: v }) => this.userFacadeService.requestDeposit$(n, e, m, a, v)),
        take(1)
      )
      .subscribe(
        async ({ response }) => {
          await this.loadingService.closeSpinner();

          if (response) {
            this.appRateService.evaluateToRequestRateApp();
            this.showModal();
          } else {
            this.showToast();
          }
        },
        async () => {
          await this.loadingService.closeSpinner();
          this.isRequesting = false;
        }
      );
  }

  async back(): Promise<void> {
    await this.nav.navigate([PATRON_NAVIGATION.accounts]);
  }

  private initForm() {
    const nameErrors = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.name].required),
      formControlErrorDecorator(Validators.minLength(2), CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.name].minlength),
      formControlErrorDecorator(Validators.maxLength(255), CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.name].maxlength),
    ];

    const emailErrors = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.email].required),
      formControlErrorDecorator(validateEmail, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.email].incorrect),
      formControlErrorDecorator(Validators.maxLength(255), CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.email].maxlength),
    ];

    const accountErrors = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.account].required),
    ];

    const messageErrors = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.message].required),
    ];

    this.requestFundsForm = this.fb.group({
      [this.controlsNames.name]: ['', nameErrors],
      [this.controlsNames.email]: ['', emailErrors],
      [this.controlsNames.account]: ['', accountErrors],
      [this.controlsNames.message]: ['', messageErrors],
    });
  }

  private async showToast(): Promise<void> {
    await this.toastService.showError({ message: this.translateFacadeService.instant('get_mobile.error.general') });
  }

  private async showModal(): Promise<void> {
    const modal = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: PopoverComponent,
      componentProps: {
        data: { title: 'Request Sent!', message: 'Your request for funds was sent successfully.' },
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async () => await this.back());
    modal.present();
  }

  onFocus() {
    if (this.nativeProvider.isMobile()) Keyboard.hide();
  }
}

export enum REQUEST_FUNDS_CONTROL_NAMES {
  name = 'name',
  email = 'email',
  account = 'account',
  message = 'message',
}

export const CONTROL_ERROR = {
  [REQUEST_FUNDS_CONTROL_NAMES.name]: {
    required: 'You must enter a name.',
    minlength: 'Name should be more than 2 symbols.',
    maxlength: 'Name should be shorten than 255 symbols.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.email]: {
    required: 'You must enter an email address.',
    incorrect: 'Please enter valid email.',
    maxlength: 'Email should be shorten than 255 symbols.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.account]: {
    required: 'You must choose an account.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.message]: {
    required: 'Please enter a message.',
  },
};
