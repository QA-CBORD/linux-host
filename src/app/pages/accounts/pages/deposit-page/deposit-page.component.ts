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

  customActionSheetOptions: any = {
    cssClass: 'custom-deposit-actionSheet',
  };

  constructor(private readonly depositService: DepositService, private fb: FormBuilder) {}

  ngOnInit() {
    // FIXME: rewrite it in future:
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

    return billMePaymentTypesEnabled.indexOf(PAYMENT_TYPE[1]) !== -1;
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
            map(accounts => ({
              creditCardSourceAccounts: accounts,
              creditCardDestinationAccounts: this.filterCreditCardDestAccounts(depositTenders, accounts),
              billmeDestinationAccounts: this.filterBillmeDestAccounts(billmeMappingArr, accounts),
            }))
          )
        )
      )
      .subscribe(val => console.log(val));
    this.sourceSubscription.add(subscription);
  }

  onPaymentMethodChanged({ target }) {
    console.log('changed', target.value);
  }

  private filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(({ depositAccepted, accountTender: tId }) => depositAccepted && tendersId.includes(tId));
  }

  private filterBillmeDestAccounts(billmeMappingArr: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    // TODO: WHAT IS DEST_ACC and SOURCE_ACC?
    return [];
    // return accounts.filter(({ depositAccepted, accountTender: tId }) => depositAccepted && tendersId.includes(tId));
  }

  private getSettingByName(settings, property) {
    const depositSetting = this.depositService.getSettingByName(settings, property.name);

    return depositSetting.value;
  }
}
