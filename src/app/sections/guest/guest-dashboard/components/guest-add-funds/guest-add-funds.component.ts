import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { isCashlessAccount, isCreditCardAccount, isMealsAccount } from '@core/utils/general-helpers';
import { DETAILS_FORM_CONTROL_NAMES, MerchantAccountInfoList } from '@sections/ordering';
import { CartService } from '@sections/ordering/services';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AccountType, DisplayName } from 'src/app/app.global';

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly globalNav: GlobalNavService,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly cartService: CartService
  ) {}

  ngOnInit() {
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.initForm();
    this.initContentStrings();
    this.globalNav.hideNavBar();
  }

  ionViewWillEnter() {
    this.accounts$ = this.getAvailableAccounts();
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.globalNav.showNavBar();
  }

  initForm() {
    this.detailsForm = this.fb.group({
      [DETAILS_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
    });
  }

  get controlsNames() {
    return DETAILS_FORM_CONTROL_NAMES;
  }

  get paymentMethod(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.paymentMethod);
  }

  onPaymentChanged({ detail: { value } }) {}

  private initContentStrings() {
    this.topLabel =
      'You are deposting to the account of James Demo. If this is incorrect, go back to to Step 1 to identify the recipient';
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
}
