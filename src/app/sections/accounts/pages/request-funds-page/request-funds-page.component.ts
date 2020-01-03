import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { PopoverComponent } from './popover/popover.component';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { UserAccount } from '@core/model/account/account.model';
import { AccountsService } from '@sections/accounts/services/accounts.service';
import { UserService } from '@core/service/user-service/user.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { NAVIGATE } from 'src/app/app.global';
import { formControlErrorDecorator, validateEmail } from '@core/utils/general-helpers';

@Component({
  selector: 'st-request-funds-page',
  templateUrl: './request-funds-page.component.html',
  styleUrls: ['./request-funds-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFundsPageComponent implements OnInit {
  accounts$: Observable<UserAccount[]>;
  requestFundsForm: FormGroup;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountsService,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly popoverCtrl: PopoverController,
    private readonly keyboard: Keyboard,
    private readonly nav: Router
  ) {}

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
    if (this.requestFundsForm.invalid) {
      return;
    }

    const {
      [this.controlsNames.name]: n,
      [this.controlsNames.email]: e,
      [this.controlsNames.message]: m,
      [this.controlsNames.account]: a,
    } = this.requestFundsForm.getRawValue();

    await this.loadingService.showSpinner();

    this.userService
      .getUserSettingsBySettingName('quick_amount')
      .pipe(
        switchMap(({ response: { value: v } }) => this.userService.requestDeposit(n, e, m, a, v)),
        take(1)
      )
      .subscribe(
        async ({ response }) => {
          await this.loadingService.closeSpinner();
          response ? this.showModal() : this.showToast();
        },
        async () => await this.loadingService.closeSpinner()
      );
  }

  async back(): Promise<void> {
    await this.nav.navigate([NAVIGATE.accounts]);
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
    const toast = await this.toastController.create({
      message: 'Something went wrong...',
      duration: 3000,
      position: 'top',
    });
    await toast.present();
  }

  private async showModal(): Promise<void> {
    const modal = await this.popoverCtrl.create({
      component: PopoverComponent,
      componentProps: {
        data: { title: 'Request Sent!', message: 'Yor request for funds was sent successfully.' },
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async () => await this.back());
    modal.present();
  }

  onFocus() {
    this.keyboard.isVisible && this.keyboard.hide();
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
