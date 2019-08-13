import { Injectable } from '@angular/core';
import { AccountsApiService } from './accounts.api.service';

import { BehaviorSubject, Observable, zip, combineLatest } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { ContentStringRequest } from '../../../core/model/content/content-string-request.model';
import { CommerceApiService } from '../../../core/service/commerce/commerce-api.service';
import { ContentService } from '../../../core/service/content-service/content.service';
import { UserAccount } from '../../../core/model/account/account.model';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';
import { ContentStringInfo } from 'src/app/core/model/content/content-string-info.model';
import {
  PAYMENT_SYSTEM_TYPE,
  ContentStringsParamsAccounts,
  GenericContentStringsParams,
  ContentStringsParamsTransactions,
} from '../accounts.config';

@Injectable()
export class AccountsService {
  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);
  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);
  public readonly _contentString$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  private contentString;

  constructor(
    private readonly apiService: AccountsApiService,
    private readonly commerceApiService: CommerceApiService,
    private readonly contentService: ContentService
  ) {}

  get accounts$(): Observable<UserAccount[]> {
    return this._accounts$.asObservable();
  }

  get settings$(): Observable<SettingInfo[]> {
    return this._settings$.asObservable();
  }

  get contentString$(): Observable<any> {
    return this._contentString$.asObservable();
  }

  private set _accounts(value: UserAccount[]) {
    this._accounts$.next([...value]);
  }

  private set _settings(value: SettingInfo[]) {
    this._settings$.next([...value]);
  }

  private set _contentString(value: any) {
    this._contentString$.next({ ...value });
  }

  getUserSettings(settings: ContentStringRequest[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.apiService.getSettingByConfig(setting));

    return zip(...requestArray).pipe(tap(settings => (this._settings = settings)));
  }

  getAccountById(accountId: string): Observable<UserAccount> {
    return this.accounts$.pipe(map(accounts => accounts.find(({ id }) => accountId === id)));
  }

  getUserAccounts(): Observable<UserAccount[]> {
    return this.commerceApiService.getUserAccounts().pipe(
      map(accounts => this.filterAccountsByPaymentSystem(accounts)),
      tap(accounts => (this._accounts = accounts))
    );
  }

  initContentStringsList(): Observable<ContentStringInfo[]> {
    return combineLatest(
      this.contentService.retrieveContentStringList(ContentStringsParamsAccounts),
      this.contentService.retrieveContentStringList(GenericContentStringsParams)
    ).pipe(
      map(([res, res0]) => {
        const finalArray = [...res, ...res0];
        this.contentString = finalArray.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
        return finalArray;
      }),
      take(1)
    );
  }

  getContentStrings(names: string[]): any {
    let list = {};
    names.filter(n => {
      if (this.contentString[n]) {
        list = { ...list, [n]: this.contentString[n] };
      }
    });
    return list;
  }

  getContentValueByName(name: string): string {
    return this.contentString[name] || '';
  }

  getSettingByName(settings: SettingInfo[], name: string): SettingInfo | undefined {
    return settings.find(({ name: n }) => n === name);
  }

  transformStringToArray(value: string): Array<unknown> {
    if (!value.length) return [];
    const result = JSON.parse(value);

    return Array.isArray(result) ? result : [];
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[]): UserAccount[] {
    return accounts.filter(
      ({ paymentSystemType: type }) => type === PAYMENT_SYSTEM_TYPE.OPCS || type === PAYMENT_SYSTEM_TYPE.CSGOLD
    );
  }
}
