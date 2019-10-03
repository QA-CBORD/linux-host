import { Injectable } from '@angular/core';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { Observable, BehaviorSubject, zip, of } from 'rxjs';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { PAYMENT_SYSTEM_TYPE } from '../../../accounts.config';
import { map, tap, switchMap } from 'rxjs/operators';
import { ContentStringRequest } from 'src/app/core/model/content/content-string-request.model';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { AccountsApiService } from '../../../services/accounts.api.service';

@Injectable()
export class DepositService {
  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);
  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);

  constructor(
    private readonly commerceApiService: CommerceApiService,
    private readonly accountsApiService: AccountsApiService
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

  getUserSettings(settings: ContentStringRequest[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.accountsApiService.getSettingByConfig(setting));

    return zip(...requestArray).pipe(tap(settings => (this._settings = settings)));
  }

  getSettingByName(settings: SettingInfo[], name: string): SettingInfo | undefined {
    return settings.find(({ name: n }) => n === name);
  }

  transformStringToArray(value: string): Array<string> {
    if (!value.length) return [];
    const result = JSON.parse(value);

    return Array.isArray(result) ? result : [];
  }

  filterAccountsByPaymentSystem(accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(
      ({ paymentSystemType: type }) => type === PAYMENT_SYSTEM_TYPE.MONETRA || type === PAYMENT_SYSTEM_TYPE.USAEPAY
    );
  }

  filterCreditCardDestAccounts(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(
      ({ depositAccepted, accountTender }) => depositAccepted && tendersId.includes(accountTender)
    );
  }

  filterBillmeDestAccounts(billmeMappingArr: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    const filterByBillme = (accountTender, purpose) =>
      billmeMappingArr.find(billmeMap => billmeMap[purpose] === accountTender);

    return accounts.filter(({ accountTender }) => {
      if (filterByBillme(accountTender, 'destination')) {
        return accounts.filter(acc => {
          if (acc.depositAccepted && filterByBillme(acc.accountTender, 'source')) {
            return acc;
          }
        });
      }
    });
  }

  sourceAccForBillmeDeposit(selectedAccount: UserAccount, billmeMappingArr: Array<string>): Observable<UserAccount> {
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
}
