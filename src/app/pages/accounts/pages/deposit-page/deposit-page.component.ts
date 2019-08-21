import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepositService } from '../../services/deposit.service';
import { tap, map, switchMap, take } from 'rxjs/operators';
import { SYSTEM_SETTINGS_CONFIG, PAYMENT_TYPE, PAYMENT_SYSTEM_TYPE, ACCOUNT_TYPES } from '../../accounts.config';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { Subscription, Observable, of, fromEvent, from } from 'rxjs';
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
  isMaxCharLength: boolean = false;

  customActionSheetOptions: any = {
    cssClass: 'custom-deposit-actionSheet',
  };

  customActionSheetPaymentOptions: any = {
    cssClass: 'custom-deposit-actionSheet custom-deposit-actionSheet-last-btn',
  };

  @ViewChild('inputText') inputText;

  constructor(private readonly depositService: DepositService, private fb: FormBuilder) {}

  ngOnInit() {
    this.depositService.settings$.subscribe(depositSettings => (this.depositSettings = depositSettings));

    this.initForm();
    this.getAccounts();

    console.log(this.minMaxOfAmmounts);

    // fromEvent(this.inputText.nativeElement, 'keydown').subscribe(val => console.log(val));
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

  get mainFormInput() {
    return this.depositForm.get('mainInput');
  }

  get fromAccountCvv() {
    return this.depositForm.get('fromAccountCvv');
  }

  get isCVVfieldShow() {
    const sourceAcc = this.depositForm.get('sourceAccount').value;

    if (!sourceAcc || sourceAcc !== 'billme' || sourceAcc !== 'newCreditCard') {
      return (
        sourceAcc.accountType === ACCOUNT_TYPES.charge && sourceAcc.paymentSystemType !== PAYMENT_SYSTEM_TYPE.USAEPAY
      );
    }
  }

  onFormSubmit() {
    const { sourceAccount, selectedAccount, mainInput } = this.depositForm.value;
    let fromAccount: Observable<UserAccount>;

    if (sourceAccount === 'billme') {
      console.log('billme');
      fromAccount = this.sourceAccForBillmeDeposit(selectedAccount, this.billmeMappingArr);
    } else {
      const sourceAcc = this.depositForm.get('sourceAccount').value;

      fromAccount = of(sourceAcc);
    }

    fromAccount
      .pipe(
        switchMap(sourceAcc => this.depositService.calculateDepositFee(sourceAcc.id, selectedAccount.id, mainInput))
      )
      .subscribe(val => console.log(val));
  }

  setFormValidators() {
    if (this.isFreeFromDepositEnabled) {
      const sourceAcc = this.depositForm.get('sourceAccount').value;
      let minMaxValidators = [];
      if (sourceAcc === 'billme') {
        debugger;
        minMaxValidators = [
          Validators.max(+this.minMaxOfAmmounts.maxAmountbillme),
          Validators.min(+this.minMaxOfAmmounts.minAmountbillme),
        ];
        this.depositForm.controls['fromAccountCvv'].setErrors(null);
        this.depositForm.controls['fromAccountCvv'].clearValidators();

        console.log(this.depositForm);
      } else if (sourceAcc === 'newCreditCard') {
        console.log('new credit card');
      } else {
        debugger;
        minMaxValidators = [
          Validators.max(+this.minMaxOfAmmounts.maxAmountOneTime),
          Validators.min(+this.minMaxOfAmmounts.minAmountOneTime),
        ];
        this.depositForm.controls['fromAccountCvv'].setValidators([Validators.required]);
      }

      this.depositForm.controls['mainInput'].setValidators([Validators.required, ...minMaxValidators]);
    } else {
      this.depositForm.controls['mainSelect'].setValidators([Validators.required]);
    }
  }

  onInputKeydown(event) {
    // if (target.value.length >= 5) {
    //   console.log(this.depositForm.get('mainInput'));
    //   this.isMaxCharLength = true;
    // }
    // this.isMaxCharLength = false;
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
    if (target.value === 'billme') {
      this.destinationAccounts = this.billmeDestinationAccounts;
    } else {
      this.destinationAccounts = this.creditCardDestinationAccounts;
    }

    this.setFormValidators();
  }

  trackByAccountId(i: number, { id }: UserAccount): string {
    return `${i}-${id}-${Math.random()}`;
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

  private sourceAccForBillmeDeposit(selectedAccount: UserAccount, billmeMappingArr: Array<string>) {
    return this.depositService.sourceAccForBillmeDeposit(selectedAccount, billmeMappingArr);
  }

  private getSettingByName(settings, property) {
    const depositSetting = this.depositService.getSettingByName(settings, property.name);

    return depositSetting.value;
  }
}
