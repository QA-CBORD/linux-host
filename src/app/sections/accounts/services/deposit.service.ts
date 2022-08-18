import { Injectable } from '@angular/core';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { Observable, BehaviorSubject, zip, of, combineLatest } from 'rxjs';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { ACCOUNT_TYPES, CONTENT_STRINGS, PAYMENT_SYSTEM_TYPE } from '@sections/accounts/accounts.config';
import { BillMeMapping } from '@core/model/settings/billme-mapping.model';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { ContentStringsApiService } from '@core/service/content-service/content-strings-api.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from '../../../app.global';

@Injectable({ providedIn: 'root' })
export class DepositService {
  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);
  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);
  public contentString;

  constructor(
    private readonly commerceApiService: CommerceApiService,
    private readonly contentService: ContentStringsApiService,
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}

  get accounts$(): Observable<UserAccount[]> {
    return this._accounts$.asObservable();
  }

  private set _accounts(value: UserAccount[]) {
    this._accounts$.next([...value]);
  }

  get settings$(): Observable<SettingInfo[]> {
    return this._settings$.asObservable();
  }

  private set _settings(value: SettingInfo[]) {
    this._settings$.next([...value]);
  }

  getUserAccounts(): Observable<UserAccount[]> {
    return this.commerceApiService.getUserAccounts().pipe(tap(accounts => (this._accounts = accounts)));
  }

  getUserSettings(settings: Settings.Setting[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.settingsFacadeService.getSetting(setting));

    return zip(...requestArray).pipe(tap(settings => (this._settings = settings)));
  }

  getSettingByName(settings: SettingInfo[], name: string): SettingInfo | undefined {
    return settings.find(({ name: n }) => n === name);
  }

  filterAccountsByPaymentSystem(accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(({ paymentSystemType: type }) => type == PAYMENT_SYSTEM_TYPE.USAEPAY);
  }

  filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(
      ({ depositAccepted, accountTender, accountType }) =>
        depositAccepted && accountType !== ACCOUNT_TYPES.meals && tendersId.includes(accountTender)
    );
  }

  filterBillmeDestAccounts(billmeMappingArr: Array<BillMeMapping>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(destinationAccount => {
      const destTender = destinationAccount.accountTender || null;
      const destDepositAccepted = destinationAccount.depositAccepted || false;
      /// destination account deposits accepted?
      if (destDepositAccepted && destTender) {
        /* if an account in our account array matches the source tender
        associated to the billMe map with the destination
        account as the destination tender, then we have a destination
        account with an associated source account.  This destination account is legit */
        return (
          billmeMappingArr
            .filter(({ destination }) => destTender === destination)
            .filter(bmi => {
              return accounts.filter(sourceAccount => sourceAccount.accountTender === bmi.source).length > 0;
            }).length > 0
        );
      }
    });
  }

  filterBillmeSourceAccounts(billmeMappingArr: Array<BillMeMapping>, accounts: Array<UserAccount>): Array<UserAccount> {
    return billmeMappingArr.reduce((res, { source, destination }) => {
      const sourceAcc = accounts.find(
        acc =>
          acc.accountTender === source &&
          accounts.some(({ depositAccepted: dAccepted, accountTender: tender }) => dAccepted && tender === destination)
      );
      return sourceAcc ? [...res, sourceAcc] : res;
    }, []);
  }

  sourceAccForBillmeDeposit(
    selectedAccount: UserAccount,
    billmeMappingArr: Array<BillMeMapping>
  ): Observable<UserAccount> {
    const filterByBillme = accTender => billmeMappingArr.find(billmeMap => billmeMap['destination'] === accTender);

    return of(filterByBillme(selectedAccount.accountTender)).pipe(
      switchMap(billmeMapObj => {
        return this.accounts$.pipe(
          map(accounts => accounts.find(({ accountTender }) => billmeMapObj['source'] === accountTender))
        );
      })
    );
  }

  calculateDepositFee(fromAccountId, toAccountId, amount): Observable<number> {
    return this.commerceApiService.calculateDepositFee(fromAccountId, toAccountId, amount);
  }

  deposit(fromAccountId, toAccountId, amount, fromAccountCvv): Observable<string> {
    return this.commerceApiService.deposit(fromAccountId, toAccountId, amount, fromAccountCvv);
  }

  initContentStringsList(): Observable<ContentStringInfo[]> {
    return combineLatest(
      this.contentService.retrieveContentStringByConfig({
        domain: CONTENT_STRINGS_DOMAINS.patronUi,
        category: CONTENT_STRINGS_CATEGORIES.accounts,
        name: CONTENT_STRINGS.creditDepositReviewInstructions,
      }),
      this.contentService.retrieveContentStringByConfig({
        domain: CONTENT_STRINGS_DOMAINS.patronUi,
        category: CONTENT_STRINGS_CATEGORIES.accounts,
        name: CONTENT_STRINGS.billMeDepositReviewInstructions,
      })
    ).pipe(
      map(([res, res0]) => {
        const finalArray = [res, res0];
        this.contentString = finalArray.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
        return finalArray;
      }),
      take(1)
    );
  }

  getContentValueByName(name: string): string {
    return this.contentString[name] || '';
  }

  // Used to perform payments onbehalf of housing form
  makePayment(fromAccountId: string, amount: string): Observable<string> {
    return this.commerceApiService.sale(fromAccountId, amount);
  }
}
