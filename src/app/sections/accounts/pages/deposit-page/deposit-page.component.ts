import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { map, switchMap, take, tap } from 'rxjs/operators';
import {
  ACCOUNT_TYPES,
  LOCAL_ROUTING,
  PAYMENT_SYSTEM_TYPE,
  PAYMENT_TYPE,
  SYSTEM_SETTINGS_CONFIG,
} from '../../accounts.config';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { iif, Observable, of, Subscription } from 'rxjs';
import { UserAccount } from '@core/model/account/account.model';
import { ConfirmDepositPopoverComponent } from '../../shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component';
import { DepositModalComponent } from '../../shared/ui-components/deposit-modal/deposit-modal.component';
import { BUTTON_TYPE } from 'src/app/core/utils/buttons.config';
import { amountRangeValidator } from './amount-range.validator';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { BillMeMapping } from '@core/model/settings/billme-mapping.model';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

@Component({
  selector: 'st-deposit-page',
  templateUrl: './deposit-page.component.html',
  styleUrls: ['./deposit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositPageComponent implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  private activePaymentType: PAYMENT_TYPE;
  focusLine: boolean = false;
  depositSettings: SettingInfo[];
  depositForm: FormGroup;
  creditCardSourceAccounts: Array<UserAccount>;
  creditCardDestinationAccounts: Array<UserAccount>;
  billmeDestinationAccounts: Array<UserAccount>;
  destinationAccounts: Array<UserAccount>;
  billmeMappingArr: any[];
  isMaxCharLength: boolean = false;

  customActionSheetOptions: any = {
    cssClass: 'custom-deposit-actionSheet',
  };

  customActionSheetPaymentOptions: any = {
    cssClass: 'custom-deposit-actionSheet custom-deposit-actionSheet-last-btn',
  };

  constructor(
    private readonly depositService: DepositService,
    private readonly fb: FormBuilder,
    private readonly popoverCtrl: PopoverController,
    private readonly modalController: ModalController,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly nativeProvider: NativeProvider
  ) {}

  ngOnInit() {
    this.depositService.settings$.pipe(take(1)).subscribe(depositSettings => (this.depositSettings = depositSettings));

    this.initForm();
    this.getAccounts();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get isFreeFromDepositEnabled$(): Observable<boolean> {
    return this.depositService.settings$.pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled.name
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  get isAllowFreeFormBillMe$(): Observable<boolean> {
    return this.depositService.settings$.pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.billMeFreeFormEnabled.name
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  get isFreeFormEnabled$(): Observable<boolean> {
    return iif(
      () => this.activePaymentType === PAYMENT_TYPE.BILLME,
      this.isAllowFreeFormBillMe$,
      this.isFreeFromDepositEnabled$
    );
  }

  get billMeAmounts$(): Observable<string[]> {
    return this.depositService.settings$.pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.billMeAmounts.name);

        return settingInfo ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  get oneTimeAmounts$(): Observable<string[]> {
    return this.depositService.settings$.pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard.name
        );

        return settingInfo ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  get amountsForSelect$() {
    return iif(() => this.activePaymentType === PAYMENT_TYPE.BILLME, this.billMeAmounts$, this.oneTimeAmounts$);
  }

  get isBillMePaymentTypesEnabled(): boolean {
    const billMePaymentTypesEnabled = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.paymentTypes);

    return JSON.parse(billMePaymentTypesEnabled).indexOf(PAYMENT_TYPE.BILLME) !== -1;
  }

  get isCreditCardPaymentTypesEnabled(): boolean {
    const billMePaymentTypesEnabled = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.paymentTypes);

    return JSON.parse(billMePaymentTypesEnabled).indexOf(PAYMENT_TYPE.CREDIT) !== -1;
  }

  get minMaxOfAmmounts() {
    const minAmountbillme = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.minAmountbillme);
    const maxAmountbillme = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.maxAmountbillme);
    const minAmountOneTime = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.minAmountCreditCard);
    const maxAmountOneTime = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.maxAmountCreditCard);

    return {
      minAmountbillme,
      maxAmountbillme,
      minAmountOneTime,
      maxAmountOneTime,
    };
  }

  get mainFormInput(): AbstractControl {
    return this.depositForm.get('mainInput');
  }

  get fromAccountCvv(): AbstractControl {
    return this.depositForm.get('fromAccountCvv');
  }

  get isCVVfieldShow(): boolean {
    const sourceAcc = this.depositForm.get('sourceAccount').value;

    return (
      sourceAcc &&
      (sourceAcc !== PAYMENT_TYPE.BILLME || sourceAcc !== 'newCreditCard') &&
      sourceAcc.accountType === ACCOUNT_TYPES.charge &&
      sourceAcc.paymentSystemType !== PAYMENT_SYSTEM_TYPE.USAEPAY
    );
  }

  formatInput(event) {
    const { value } = event.target;
    const index = value.indexOf('.');
    const regex = /^[0-9.,]+$/;
    if (!regex.test(value)) {
      this.depositForm.get('mainInput').setValue(value.slice(0, value.length - 1));
    }

    if (index !== -1 && value.slice(index + 1).length > 1) {
      this.depositForm.get('mainInput').setValue(value.slice(0, index + 2));
    }
  }

  onFormSubmit() {
    const { sourceAccount, selectedAccount, mainInput, mainSelect } = this.depositForm.value;
    const isBillme: boolean = sourceAccount === PAYMENT_TYPE.BILLME;
    const regex = /[,\s]/g;
    const sourceAccForBillmeDeposit: Observable<UserAccount> = this.sourceAccForBillmeDeposit(
      selectedAccount,
      this.billmeMappingArr
    );
    let amount = mainInput || mainSelect;
    amount = amount.replace(regex, '');

    iif(() => isBillme, sourceAccForBillmeDeposit, of(sourceAccount))
      .pipe(
        switchMap(
          (sourceAcc): any => {
            const calculateDepositFee: Observable<number> = this.depositService.calculateDepositFee(
              sourceAcc.id,
              selectedAccount.id,
              amount
            );

            return iif(() => isBillme, of(0), calculateDepositFee).pipe(
              map(valueFee => ({ fee: valueFee, sourceAcc, selectedAccount, amount, billme: isBillme }))
            );
          }
        ),
        take(1)
      )
      .subscribe(
        info => this.confirmationDepositPopover(info),
        () => {
          this.loadingService.closeSpinner();
          this.onErrorRetrieve('Something went wrong, please try again...');
        }
      );
  }

  setFormValidators() {
    const minMaxValidators =
      this.activePaymentType !== PAYMENT_TYPE.CREDIT
        ? [amountRangeValidator(+this.minMaxOfAmmounts.minAmountbillme, +this.minMaxOfAmmounts.maxAmountbillme)]
        : [amountRangeValidator(+this.minMaxOfAmmounts.minAmountOneTime, +this.minMaxOfAmmounts.maxAmountOneTime)];

    this.isFreeFormEnabled$.pipe(take(1)).subscribe(data => {
      const sourceAcc = this.depositForm.get('sourceAccount').value;
      this.depositForm.controls['mainSelect'].clearValidators();
      this.depositForm.controls['mainSelect'].setErrors(null);
      this.resolveCVVValidators(sourceAcc);

      if (data) {
        if (sourceAcc === 'newCreditCard') {
          this.depositForm.reset();
          this.nativeProvider
            .addUSAePayCreditCard()
            .pipe(take(1))
            .subscribe(({ success, errorMessage }) => {
              if (!success) {
                return this.onErrorRetrieve(errorMessage);
              }

              this.getAccounts();
            });
          // this.router.navigate([NAVIGATE.accounts, LOCAL_ROUTING.addCreditCard], { skipLocationChange: true });
        }

        this.depositForm.controls['mainInput'].setValidators([
          Validators.required,
          ...minMaxValidators,
          Validators.pattern('[0-9.,]+'),
        ]);
      } else {
        this.depositForm.controls['mainSelect'].setValidators([Validators.required]);
        this.mainFormInput.clearValidators();
        this.mainFormInput.setErrors(null);
        this.resetControls(['mainSelect', 'mainInput']);
      }

      if (sourceAcc === 'newCreditCard') {
        this.depositForm.reset();
        this.nativeProvider.addUSAePayCreditCard().subscribe(res => console.log(res));
        // this.router.navigate([NAVIGATE.accounts, LOCAL_ROUTING.addCreditCard], { skipLocationChange: true });
      }

    });
  }

  private initForm() {
    this.depositForm = this.fb.group({
      mainInput: [''],
      mainSelect: [''],
      selectedAccount: ['', Validators.required],
      sourceAccount: ['', Validators.required],
      fromAccountCvv: [''],
    });

    this.setFormValidators();
  }

  private resolveCVVValidators(sourceAcc) {
    if (sourceAcc !== PAYMENT_TYPE.BILLME) {
      this.depositForm.controls['fromAccountCvv'].setValidators([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[0-9.-]*'),
      ]);
      this.depositForm.controls['fromAccountCvv'].reset();
    } else {
      this.depositForm.controls['fromAccountCvv'].setErrors(null);
      this.depositForm.controls['fromAccountCvv'].clearValidators();
    }
  }

  private getAccounts() {
    const subscription = this.depositService.settings$
      .pipe(
        map(settings => {
          const depositTenders = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.depositTenders);
          const billmeMappingArr = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.billMeMapping);

          return {
            depositTenders: parseArrayFromString(depositTenders),
            billmeMappingArr: parseArrayFromString(billmeMappingArr),
          };
        }),
        switchMap(({ depositTenders, billmeMappingArr }) =>
          this.depositService.accounts$.pipe(
            tap(accounts => {
              this.billmeMappingArr = billmeMappingArr;
              this.creditCardSourceAccounts = this.filterAccountsByPaymentSystem(accounts);
              this.creditCardDestinationAccounts = this.filterCreditCardDestAccounts(
                depositTenders as string[],
                accounts
              );
              this.billmeDestinationAccounts = this.filterBillmeDestAccounts(this.billmeMappingArr, accounts);
            })
          )
        )
      )
      .subscribe(() => {
        this.defineDestAccounts(PAYMENT_TYPE.CREDIT);
      });
    this.sourceSubscription.add(subscription);
  }

  onPaymentMethodChanged({ target }) {
    this.defineDestAccounts(target.value);

    this.resetControls(['mainSelect', 'mainInput', 'selectedAccount']);
    this.setFormValidators();
  }

  async confirmationDepositPopover(data: any) {
    const popover = await this.popoverCtrl.create({
      component: ConfirmDepositPopoverComponent,
      componentProps: {
        data,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.loadingService.showSpinner();
        this.depositService
          .deposit(data.sourceAcc.id, data.selectedAccount.id, data.amount, this.fromAccountCvv.value)
          .pipe(take(1))
          .subscribe(
            () => {
              this.loadingService.closeSpinner();
              this.finalizeDepositModal(data);
            },
            () => {
              this.loadingService.closeSpinner();
              this.onErrorRetrieve('Your information could not be verified.');
            }
          );
      }
    });

    return await popover.present();
  }

  get paymentTypes() {
    return PAYMENT_TYPE;
  }

  private resetControls(controlNames: string[]) {
    controlNames.forEach(
      controlName => this.depositForm.contains(controlName) && this.depositForm.get(controlName).reset()
    );
  }

  private defineDestAccounts(target) {
    this.activePaymentType =
      target instanceof Object ? PAYMENT_TYPE.CREDIT : typeof target === 'string' ? this.activePaymentType : target;
    this.destinationAccounts =
      target === PAYMENT_TYPE.BILLME ? this.billmeDestinationAccounts : this.creditCardDestinationAccounts;
  }

  private async finalizeDepositModal(data): Promise<void> {
    const modal = await this.modalController.create({
      component: DepositModalComponent,
      animated: true,
      componentProps: {
        data,
      },
    });
    modal.onDidDismiss().then(() => {
      this.depositForm.reset();
      this.router.navigate([NAVIGATE.accounts], { skipLocationChange: true });
    });

    await modal.present();
  }

  trackByAccountId(i: number, { id }: UserAccount): string {
    return `${i}-${id}-${Math.random()}`;
  }

  private async onErrorRetrieve(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
    });
    toast.present();
  }

  private filterAccountsByPaymentSystem(accounts): Array<UserAccount> {
    return this.depositService.filterAccountsByPaymentSystem(accounts);
  }

  private filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterCreditCardDestAccounts(tendersId, accounts);
  }

  private filterBillmeDestAccounts(
    billmeMappingArr: Array<BillMeMapping>,
    accounts: Array<UserAccount>
  ): Array<UserAccount> {
    return this.depositService.filterBillmeDestAccounts(billmeMappingArr, accounts);
  }

  private sourceAccForBillmeDeposit(
    selectedAccount: UserAccount,
    billmeMappingArr: Array<BillMeMapping>
  ): Observable<UserAccount> {
    return this.depositService.sourceAccForBillmeDeposit(selectedAccount, billmeMappingArr);
  }

  private getSettingByName(settings, property) {
    const depositSetting = this.depositService.getSettingByName(settings, property.name);

    return depositSetting.value;
  }
}
