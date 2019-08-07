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
  myForm: FormGroup;
  creditCardSourceAccounts: Array<UserAccount>;
  creditCardDestinationAccounts: Array<UserAccount>;
  billmeDestinationAccounts: Array<UserAccount>;
  sourceAccounts: Array<UserAccount>;
  destinationAccounts: Array<UserAccount>;
  presetDepositAmounts: Array<string>;

  customActionSheetOptions: any = {
    cssClass: 'custom-deposit-actionSheet',
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

  onFormSubmit() {
    console.log(this.myForm);
  }

  private initForm() {
    this.myForm = this.fb.group({
      mainInput: ['', Validators.required],
      mainSelect: ['brown'],
      selectAccount: [''],
      selectPaymentMethod: [''],
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
              (this.creditCardSourceAccounts = this.depositService.filterAccountsByPaymentSystem(accounts)),
                (this.creditCardDestinationAccounts = this.filterCreditCardDestAccounts(depositTenders, accounts)),
                (this.billmeDestinationAccounts = this.filterBillmeDestAccounts(billmeMappingArr, accounts));

              console.log(this.creditCardSourceAccounts);
              console.log(this.creditCardDestinationAccounts);
              console.log(this.billmeDestinationAccounts);
            })
          )
        )
      )
      .subscribe(() => {
        this.sourceAccounts = this.creditCardSourceAccounts;
        this.presetDepositAmounts = this.presetDepositAmountsCreditCard;
        this.destinationAccounts = this.creditCardDestinationAccounts;
      });
    this.sourceSubscription.add(subscription);
  }

  onPaymentMethodChanged({ target }) {
    console.log('changed', target.value);
    if (target.value === 'billme') {
      this.presetDepositAmounts = this.presetDepositAmountsBillme;
      this.destinationAccounts = this.billmeDestinationAccounts;
    }
  }

  trackByAccountId(i: number, { id }: UserAccount): string {
    return id;
  }

  private filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(
      ({ depositAccepted, accountTender }) => depositAccepted && tendersId.includes(accountTender)
    );
  }

  private filterBillmeDestAccounts(billmeMappingArr: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    console.log(billmeMappingArr);
    return accounts.filter(
      ({ depositAccepted, accountTender }) =>
        depositAccepted &&
        billmeMappingArr.find(
          billmeMap => billmeMap['destination'] === accountTender && billmeMap['source'] === accountTender
        )
    );
  }

  private getSettingByName(settings, property) {
    const depositSetting = this.depositService.getSettingByName(settings, property.name);

    return depositSetting.value;
  }
}
