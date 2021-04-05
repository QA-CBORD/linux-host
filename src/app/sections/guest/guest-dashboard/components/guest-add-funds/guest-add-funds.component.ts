import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { isCashlessAccount, isCreditCardAccount, isMealsAccount, parseArrayFromString } from '@core/utils/general-helpers';
import { PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { MerchantAccountInfoList } from '@sections/ordering';
import { CartService } from '@sections/ordering/services';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Observable, Subscription } from 'rxjs';
import { first, map, switchMap, take, tap } from 'rxjs/operators';
import { AccountType, DisplayName, Settings } from 'src/app/app.global';


export enum GUEST_FORM_CONTROL_NAMES {
  paymentMethod = 'paymentMethod',
  toAccount = 'toAccount',
  amountToDeposit = 'amountToDeposit'
}

@Component({
  selector: 'st-guest-add-funds',
  templateUrl: './guest-add-funds.component.html',
  styleUrls: ['./guest-add-funds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestAddFundsComponent implements OnInit {
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: DisplayName.APPLEPAY,
    isActive: true,
  };

  detailsForm: FormGroup;
  topLabel: string;
  applePayEnabled$: Observable<boolean>;
  accountInfoList$: Observable<MerchantAccountInfoList>;
  accounts$: Promise<UserAccount[]>;
  depositSettings: SettingInfo[];
  creditCardDestinationAccounts: Array<UserAccount>;
  creditCardSourceAccounts: Array<UserAccount>;
  destinationAccounts: Array<UserAccount>;
  private activePaymentType: PAYMENT_TYPE;
  private readonly sourceSubscription: Subscription = new Subscription();
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly globalNav: GlobalNavService,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly cartService: CartService,
    private readonly depositService: DepositService
  ) {}

  ngOnInit() {
    this.depositService.settings$.pipe(take(1)).subscribe(depositSettings => (this.depositSettings = depositSettings));
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.initForm();
    this.getAccounts();
    this.initContentStrings();
    this.globalNav.hideNavBar();
    console.log('Deposit settings: ', this.depositSettings)
  }

  ionViewWillEnter() {
    this.accounts$ = this.getAvailableAccounts();
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
    this.globalNav.showNavBar();
  }

  initForm() {
    this.detailsForm = this.fb.group({
      [GUEST_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.toAccount]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.amountToDeposit]: ['', Validators.required],
    });
  }

  onPaymentChanged({ target }) {
    this.defineDestAccounts(target.value);
    this.resetControls(['mainSelect', 'mainInput', 'selectedAccount']);
    document.getElementById('depositBtnText').innerHTML = 'Deposit';
  }

  get controlsNames() {
    return GUEST_FORM_CONTROL_NAMES;
  }

  get paymentMethod(): AbstractControl {
    return this.detailsForm.get(GUEST_FORM_CONTROL_NAMES.paymentMethod);
  }

  get toAccount(): AbstractControl {
    return this.detailsForm.get(GUEST_FORM_CONTROL_NAMES.toAccount);
  }

  get amountToDeposit(): AbstractControl {
    return this.detailsForm.get(GUEST_FORM_CONTROL_NAMES.amountToDeposit);
  }

  private initContentStrings() {
    this.topLabel =
      'You are deposting to the account of {{ James Demo }}. If this is incorrect, go back to to Step 1 to identify the recipient';
  }

  private async getAvailableAccounts(): Promise<UserAccount[]> {
    const accInfo = await this.accountInfoList$.pipe(first()).toPromise();
    const { mealBased } = await this.cartService.menuInfo$.pipe(first()).toPromise();

    return mealBased ? this.filterMealBasedAccounts(accInfo.accounts) : this.extractNoneMealsAccounts(accInfo);
  }

  private filterMealBasedAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter((account: UserAccount) => isMealsAccount(account));
  }

  private extractNoneMealsAccounts({ cashlessAccepted, accounts, creditAccepted }): UserAccount[] {
    let res = [];
    accounts = this.filterNoneMealsAccounts(accounts);

    if (cashlessAccepted) {
      res = res.concat(this.filterCashlessAccounts(accounts));
    }
    if (creditAccepted) {
      res = res.concat(this.filterCreditAccounts(accounts));
    }
    return res;
  }

  private filterNoneMealsAccounts(sourceAccounts): UserAccount[] {
    return sourceAccounts.filter((sourceAccount: UserAccount) => !isMealsAccount(sourceAccount));
  }

  private filterCashlessAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter((account: UserAccount) => account.id === 'rollup' || isCashlessAccount(account));
  }

  private filterCreditAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter((account: UserAccount) => isCreditCardAccount(account));
  }

  private getAccounts() {
    const subscription = this.depositService.settings$
      .pipe(
        map(settings => {
          console.log('Setting: ', settings)
          const depositTenders = this.getSettingByName(settings, Settings.Setting.DEPOSIT_TENDERS.split('.')[2]);
          return {
            depositTenders: parseArrayFromString(depositTenders)
          };
        }),
        switchMap(({ depositTenders}) =>
          this.depositService.accounts$.pipe(
            tap(accounts => {
              this.creditCardSourceAccounts = this.filterAccountsByPaymentSystem(accounts);
              this.creditCardDestinationAccounts = this.filterCreditCardDestAccounts(
                depositTenders as string[],
                accounts
              );
              this.cdRef.markForCheck();
            })
          )
        )
      )
      .subscribe(() => {
        this.defineDestAccounts(PAYMENT_TYPE.CREDIT);
      });
    this.sourceSubscription.add(subscription);
  }

  private getSettingByName(settings, property: string) {
    const depositSetting = this.depositService.getSettingByName(settings, property);
    return depositSetting.value;
  }

  private defineDestAccounts(target) {
    this.activePaymentType =
      target instanceof Object ? PAYMENT_TYPE.CREDIT : typeof target === 'string' ? this.activePaymentType : target;
    this.destinationAccounts = this.creditCardDestinationAccounts;
  }

  private filterAccountsByPaymentSystem(accounts): Array<UserAccount> {
    return this.depositService.filterAccountsByPaymentSystem(accounts);
  }
  private filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return this.depositService.filterCreditCardDestAccounts(tendersId, accounts);
  }

  private resetControls(controlNames: string[]) {
    controlNames.forEach(
      controlName => this.detailsForm.contains(controlName) && this.detailsForm.get(controlName).reset()
    );
  }
}
