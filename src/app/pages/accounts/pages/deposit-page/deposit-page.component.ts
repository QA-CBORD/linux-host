import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepositService } from '../../services/deposit.service';
import { tap, map, switchMap } from 'rxjs/operators';
import { SYSTEM_SETTINGS_CONFIG, PAYMENT_TYPE } from '../../accounts.config';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { Subscription, Observable } from 'rxjs';
import { UserAccount } from '../../../../core/model/account/account.model';

@Component({
  selector: 'st-deposit-page',
  templateUrl: './deposit-page.component.html',
  styleUrls: ['./deposit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositPageComponent implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  focusLine: boolean = false;
  depositSettings: SettingInfo[];
  depositForm: FormGroup;
  creditCardSourceAccounts: Array<UserAccount>;
  creditCardDestinationAccounts: Array<UserAccount>;
  billmeDestinationAccounts: Array<UserAccount>;
  destinationAccounts: Array<UserAccount>;
  presetDepositAmounts: Array<string>;
  billmeMappingArr: any[];

  customActionSheetOptions: any = {
    cssClass: 'custom-deposit-actionSheet',
  };

  customActionSheetPaymentOptions: any = {
    cssClass: 'custom-deposit-actionSheet custom-deposit-actionSheet-last-btn',
  };

  constructor(private readonly depositService: DepositService, private fb: FormBuilder) {}

  ngOnInit() {
    // TODO: rewrite it in future:
    this.depositService.settings$.subscribe(depositSettings => {
      this.depositSettings = depositSettings;
      console.log(this.depositSettings);
    });

    this.initForm();

    this.getAccounts();

    console.log(this.minMaxOfAmmounts);
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get isFreeFromDepositEnabled() {
    const freeFromDepositEnabled = this.getSettingByName(
      this.depositSettings,
      SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled
    );

    return parseInt(freeFromDepositEnabled) === 1;
  }

  get isBillMePaymentTypesEnabled() {
    const billMePaymentTypesEnabled = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.paymentTypes);

    return JSON.parse(billMePaymentTypesEnabled).indexOf(PAYMENT_TYPE.BILLME) !== -1;
  }

  get presetDepositAmountsCreditCard() {
    const billMePaymentTypesEnabled = this.getSettingByName(
      this.depositSettings,
      SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard
    );

    return JSON.parse(billMePaymentTypesEnabled);
  }

  get presetDepositAmountsBillme() {
    const billMePaymentTypesEnabled = this.getSettingByName(
      this.depositSettings,
      SYSTEM_SETTINGS_CONFIG.presetDepositAmountsBillMe
    );

    return JSON.parse(billMePaymentTypesEnabled);
  }

  get minMaxOfAmmounts() {
    const minAmountbillme = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.minAmountbillme);
    // FIXME: fix it after backend apply his fixes with billme_maximum FIELD
    const maxAmountbillme = 100000;
    const minAmountOneTime = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.minAmountCreditCard);
    const maxAmountOneTime = this.getSettingByName(this.depositSettings, SYSTEM_SETTINGS_CONFIG.maxAmountCreditCard);

    return {
      minAmountbillme,
      maxAmountbillme,
      minAmountOneTime,
      maxAmountOneTime,
    };
  }

  onFormSubmit() {
    const { selectedPaymentMethod, selectedAccount, mainInput } = this.depositForm.value;
    console.log(this.depositForm);
    if (selectedPaymentMethod === 'billme') {
      console.log('billme');
      console.log(
        this.sourceAccForBillmeDeposit(this.creditCardSourceAccounts, selectedAccount, this.billmeMappingArr)
      );
    }
  }

  private initForm() {
    this.depositForm = this.fb.group({
      mainInput: [''],
      mainSelect: [''],
      selectedAccount: [''],
      selectedPaymentMethod: [''],
    });
  }

  private getAccounts() {
    const subscription = this.depositService.settings$
      .pipe(
        map(settings => {
          const depositTenders = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.depositTenders);
          const billmeMappingArr = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.billMeMapping);

          return {
            depositTenders: this.depositService.transformStringToArray(depositTenders),
            billmeMappingArr: this.depositService.transformStringToArray(billmeMappingArr),
          };
        }),
        switchMap(({ depositTenders, billmeMappingArr }) =>
          this.depositService.accounts$.pipe(
            tap(accounts => {
              this.billmeMappingArr = billmeMappingArr;
              (this.creditCardSourceAccounts = this.filterAccountsByPaymentSystem(accounts)),
                (this.creditCardDestinationAccounts = this.filterCreditCardDestAccounts(depositTenders, accounts)),
                (this.billmeDestinationAccounts = this.filterBillmeDestAccounts(this.billmeMappingArr, accounts));

              console.log(this.creditCardSourceAccounts);
              console.log(this.creditCardDestinationAccounts);
              console.log(this.billmeDestinationAccounts);
            })
          )
        )
      )
      .subscribe(() => {
        this.presetDepositAmounts = this.presetDepositAmountsCreditCard;
        this.destinationAccounts = this.creditCardDestinationAccounts;
      });
    this.sourceSubscription.add(subscription);
  }

  onPaymentMethodChanged({ target }) {
    console.log('changed', target.value);
    console.log(this.billmeDestinationAccounts);
    if (target.value === 'billme') {
      this.presetDepositAmounts = this.presetDepositAmountsBillme;
      this.destinationAccounts = this.billmeDestinationAccounts.concat();
    }
  }

  trackByAccountId(i: number, { id }: UserAccount): string {
    return id;
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
    accounts: Array<UserAccount>,
    destinationAccount: UserAccount,
    billmeMappingArr: Array<string>
  ) {
    const filterByBillme = (accTender, purpose) => billmeMappingArr.find(billmeMap => billmeMap[purpose] === accTender);

    if (filterByBillme(destinationAccount.accountTender, 'destination')) {
      console.log('asdasd');
      console.log(accounts);
      // return accounts.find(({ accountTender }) => {
      //   if (filterByBillme(accountTender, 'source')) {
      //     console.log('asdasdsad');
      //     return acc;
      //   }
      // });
    }
  }

  private getSettingByName(settings, property) {
    const depositSetting = this.depositService.getSettingByName(settings, property.name);

    return depositSetting.value;
  }
}
