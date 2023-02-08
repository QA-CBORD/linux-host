/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectorRef } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { UserAccount } from '@core/model/account/account.model';
import { ApplePay, ApplePayResponse } from '@core/model/add-funds/applepay-response.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { ToastService } from '@core/service/toast/toast.service';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { browserState } from '@sections/accounts/pages/deposit-page/deposit-page.component';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountType, DisplayName, Settings } from 'src/app/app.global';

export enum CREDITCARD_STATUS {
  NEW = 'newCreditCard',
}

export abstract class AbstractDepositManager {
  constructor(
    protected depositService: DepositService,
    protected externalPaymentService: ExternalPaymentService,
    protected cdRef: ChangeDetectorRef,
    protected toastService: ToastService
  ) {}

  private activePaymentType: PAYMENT_TYPE;
  depositButtonText: string;
  isDepositing = false;
  applePayEnabled: boolean;
  creditCardDestinationAccounts: Array<UserAccount>;
  creditCardSourceAccounts: Array<UserAccount>;
  depositSettings: SettingInfo[];
  indexNotFound = -1;
  oneStep = 1;

  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: DisplayName.APPLEPAY,
    isActive: true,
  };

  onPaymentChanged(_target) {
    // Left blank intentionally
  }

  formatAmount(_event) {
    // Left blank intentionally
  }

  onAmountChanged(_event) {
    // Left blank intentionally
  }

  onSubmitDeposit() {
  // Left blank intentionally
  }

  setSourceAccounts(guestAccounts: UserAccount[]) {
     // Left blank intentionally
  }

  setDestinationAccounts(recipientAccounts: UserAccount[]) {
     // Left blank intentionally
  }

  async confirmationDepositPopover(data: any) {}

  async finalizeDepositModal(data): Promise<void> {}

  defineDestAccounts(target) {
    this.setActivePayment(target);
  }

  filterAccountsByPaymentSystem(accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterAccountsByPaymentSystem(accounts);
  }

  filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterCreditCardDestAccounts(tendersId, accounts);
  }

  getSettingByName(settings, property: string) {
    const depositSetting = this.depositService.getSettingByName(settings, property);
    return depositSetting.value;
  }

  isApplePayEnabled(paymentMethod: any) {
    return paymentMethod.accountType === AccountType.APPLEPAY;
  }

  handleApplePay(toAccount: any, amount: any) {
    Browser.addListener(browserState.FINISHED, () => {
      this.isDepositing = false;
      this.cdRef.detectChanges();
      Browser.removeAllListeners();
    });
    this.payWithApplePay(toAccount, amount);
  }

  payWithApplePay(toAccount: any, amount: any) {
    this.externalPaymentService
      .payWithApplePay(ApplePay.DEPOSITS_WITH_APPLE_PAY, {
        accountId: toAccount.id,
        depositAmount: amount,
      })
      .then((result: ApplePayResponse) => {
        if (result.success) {
          this.finalizeDepositModal(result);
        } else {
          this.onErrorRetrieve(result.errorMessage);
        }
      })
      .catch(async () => {
        this.onErrorRetrieve('Something went wrong, please try again...');
      })
      .finally(() => {
        this.isDepositing = false;
      });
  }

  async onErrorRetrieve(message: string) {
    await this.toastService.showToast({ message, duration: 5000 });
  }

  get minMaxOfAmounts() {
    const minAmountOneTime = this.getSettingByName(this.depositSettings, Settings.Setting.GUEST_MINIMUM.split('.')[2]);
    const maxAmountOneTime = this.getSettingByName(this.depositSettings, Settings.Setting.GUEST_MAXIMUM.split('.')[2]);

    return {
      minAmountOneTime,
      maxAmountOneTime,
    };
  }

  get isFreeFromDepositEnabled$(): Observable<boolean> {
    return of(this.depositSettings).pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          Settings.Setting.FREEFORM_GUEST_DEPOSIT_ENABLED.split('.')[2]
        );

        return settingInfo && Boolean(Number(settingInfo.value));
      })
    );
  }

  get oneTimeAmounts$(): Observable<string[]> {
    return of(this.depositSettings).pipe(
      map(settings => {
        const settingInfo = this.depositService.getSettingByName(
          settings,
          Settings.Setting.GUEST_AMOUNTS.split('.')[2]
        );
        return settingInfo ? parseArrayFromString(settingInfo.value) : [];
      })
    );
  }

  trackByAccountId(i: number): string {
    return `${i}-${Math.random()}`;
  }

  private setActivePayment(target: any) {
    if (typeof target === 'object') {
      this.activePaymentType = PAYMENT_TYPE.CREDIT;
    }

    return target === CREDITCARD_STATUS.NEW ? this.activePaymentType : target;
  }
}
