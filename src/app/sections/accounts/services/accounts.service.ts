import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, zip, combineLatest } from 'rxjs';
import { map, tap, take, switchMap } from 'rxjs/operators';

import { ContentStringRequest } from '../../../core/model/content/content-string-request.model';
import { CommerceApiService } from '../../../core/service/commerce/commerce-api.service';
import { ContentService } from '../../../core/service/content-service/content.service';
import { UserAccount } from '../../../core/model/account/account.model';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';
import { ContentStringInfo } from 'src/app/core/model/content/content-string-info.model';
import { ConfigurationService } from '@core/service/config-service/configuration.service';
import {
  PAYMENT_SYSTEM_TYPE,
  ContentStringsParamsAccounts,
  GenericContentStringsParams,
  SYSTEM_SETTINGS_CONFIG,
} from '../accounts.config';

@Injectable()
export class AccountsService {
  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);
  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);

  private contentString;

  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly commerceApiService: CommerceApiService,
    private readonly contentService: ContentService
  ) {}

  get accounts$(): Observable<UserAccount[]> {
    return this._accounts$.asObservable();
  }

  get settings$(): Observable<SettingInfo[]> {
    return this._settings$.asObservable();
  }

  private set _accounts(value: UserAccount[]) {
    this._accounts$.next([...value]);
  }

  private set _settings(value: SettingInfo[]) {
    this._settings$.next([...value]);
  }

  getUserSettings(settings: ContentStringRequest[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.configurationService.getSettingByConfig(setting));

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
      this.contentService.retrieveContentStringListByRequest(ContentStringsParamsAccounts),
      this.contentService.retrieveContentStringListByRequest(GenericContentStringsParams)
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

  getAccountsFilteredByDisplayTenders(): Observable<UserAccount[]> {
    return this.settings$.pipe(
      map(settings => {
        const settingInfo = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.displayTenders.name);
        return this.transformStringToArray(settingInfo.value);
      }),
      switchMap((tendersId: Array<string>) =>
        this.accounts$.pipe(map(accounts => this.filterAccountsByTenders(tendersId, accounts)))
      )
    );
  }

  getAccountsFilteredByDepositTenders(): Observable<UserAccount[]> {
    return this.settings$.pipe(
        map(settings => {
          const settingInfo = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.depositTenders.name);
          return this.transformStringToArray(settingInfo.value);
        }),
        switchMap((tendersId: Array<string>) =>
            this.accounts$.pipe(map(accounts => this.filterAccountsByTenders(tendersId, accounts)))
        )
    );
  }

  private filterAccountsByTenders(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(({ accountTender: tId }) => tendersId.includes(tId));
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[]): UserAccount[] {
    return accounts.filter(
      ({ paymentSystemType: type }) => type === PAYMENT_SYSTEM_TYPE.OPCS || type === PAYMENT_SYSTEM_TYPE.CSGOLD
    );
  }
}
