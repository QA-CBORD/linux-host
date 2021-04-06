import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { isCashlessAccount, isCreditCardAccount, isMealsAccount, parseArrayFromString } from '@core/utils/general-helpers';
import { PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { MerchantAccountInfoList } from '@sections/ordering';
import { CartService, MerchantService } from '@sections/ordering/services';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Observable, Subscription } from 'rxjs';
import { first, map, skipWhile, switchMap, take, tap } from 'rxjs/operators';
import { AccountType, DisplayName, Settings } from 'src/app/app.global';

export enum GUEST_FORM_CONTROL_NAMES {
  paymentMethod = 'paymentMethod',
  toAccount = 'toAccount',
  amountToDeposit = 'amountToDeposit'
}
 
const requiredSettings = [
  Settings.Setting.DEPOSIT_TENDERS,
  Settings.Setting.PAYMENT_TYPES,
  Settings.Setting.BILLME_MAPPING,
  Settings.Setting.FREEFORM_DEPOSIT_ENABLED,
  Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD,
  Settings.Setting.BILLME_AMOUNTS,
  Settings.Setting.BILLME_AMOUNT_MIN,
  Settings.Setting.BILLME_AMOUNT_MAX,
  Settings.Setting.BILLME_FREEFORM_ENABLED,
  Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE,
  Settings.Setting.CREDITCARD_AMOUNT_MIN,
  Settings.Setting.CREDITCARD_AMOUNT_MAX,
];
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

  isDepositing: boolean = false;
  detailsForm: FormGroup;
  topLabel: string;
  applePayEnabled$: Observable<boolean>;
  accountInfoList$: Observable<MerchantAccountInfoList>;
  accounts$: Observable<UserAccount[]>;
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
    private readonly depositService: DepositService,
    private readonly merchantService: MerchantService
  ) {}

  ngOnInit() {
    this.accounts$ = this.depositService.getUserAccounts();
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.depositService.getUserSettings(requiredSettings).pipe(take(1)).subscribe((result)=>{
      this.depositSettings = result;
      console.log('Result: ', this.depositSettings)
    })
 
    this.initForm();
    this.initContentStrings();
    this.globalNav.hideNavBar();
  }

  ionViewWillEnter() {
    this.getAccounts();
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
    let accInfo;
    this.cartService.merchant$.pipe(
      skipWhile((merchant) => { 
        console.log('Merchant: ', merchant)
        return !merchant
        
      }),
      switchMap(({id}) => { 
        console.log('Id: ', id)
        return this.merchantService.getMerchantPaymentAccounts(id)})
    ).subscribe((data) => {
      console.log('Un nombre: ', data)  
    }, err => console.log('Errorrr: ', err));
    console.log('getAvailableAccounts(): ', accInfo)
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


  get isCreditCardPaymentTypesEnabled(): boolean {
    return true;
  }
  
  private getAccounts() {
    const subscription = this.depositService.getUserSettings(requiredSettings)
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
    return depositSetting && depositSetting.value || '';
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
