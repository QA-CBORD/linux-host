import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { ContentStringInfo } from 'src/app/core/model/content/content-string-info.model';
import { ContentStringsParamsAccounts, GenericContentStringsParams } from '../accounts.config';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { isCashlessAccount, parseArrayFromString } from '@core/utils/general-helpers';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from '../../../app.global';
import { MEAL_CONTENT_STRINGS } from '../pages/meal-donations/meal-donation.config';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);
  private readonly _planName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);

  private contentString;

  constructor(
    private readonly commerceApiService: CommerceApiService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}

  get accounts$(): Observable<UserAccount[]> {
    return this._accounts$.asObservable();
  }
  get planName$(): Observable<string> {
    return this._planName$.asObservable();
  }
  private set _planName(value: string) {
    this._planName$.next(value);
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

  getUserSettings(settings: Settings.Setting[]): Observable<SettingInfo[]> {
    return this.settingsFacadeService.getSettings(settings).pipe(tap(settingsInfo => (this._settings = settingsInfo)));
  }

  getAccountById(accountId: string): Observable<UserAccount> {
    return this.accounts$.pipe(map(accounts => accounts.find(({ id }) => accountId === id)));
  }

  getUserAccounts(): Observable<UserAccount[]> {
    return this.commerceApiService.retrieveAccounts().pipe(
      tap(({ planName }) => (this._planName = planName)),
      map(({ accounts }) => this.filterAccountsByPaymentSystem(accounts)),
      tap(accounts => (this._accounts = accounts))
    );
  }

  initContentStringsList(): Observable<ContentStringInfo[]> {
    return combineLatest([
      this.contentStringsFacadeService.retrieveContentStringListByRequest(ContentStringsParamsAccounts),
      this.contentStringsFacadeService.retrieveContentStringListByRequest(GenericContentStringsParams),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.mealDonation,
        MEAL_CONTENT_STRINGS.dashboardTitle
      ),
    ]).pipe(
      map(([res, res0, res1]) => {
        const finalArray = [...res, ...res0];
        finalArray.push(res1);
        this.contentString = finalArray.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
        return finalArray;
      }),
      take(1)
    );
  }

  getContentStrings(names: string[]) {
    let list = {};
    names.forEach(n => {
      if (this.contentString[n]) {
        list = { ...list, [n]: this.contentString[n] };
      }
    });
    return list;
  }

  getContentValueByName(name: string): string {
    return (this.contentString && this.contentString[name]) || '';
  }

  getSettingByName(settings: SettingInfo[], name: string): SettingInfo | undefined {
    return settings.find(({ name: n }) => n === name);
  }

  transformStringToArray = parseArrayFromString;

  getAccountsFilteredByDisplayTenders(): Observable<UserAccount[]> {
    return this.settings$.pipe(
      map(settings => {
        const settingInfo = this.getSettingByName(settings, Settings.Setting.DISPLAY_TENDERS.split('.')[2]);
        return this.transformStringToArray(settingInfo?.value);
      }),
      switchMap((tendersId: Array<string>) =>
        this.accounts$.pipe(map(accounts => this.filterAccountsByTenders(tendersId, accounts)))
      )
    );
  }

  getAccountsFilteredByDepositTenders(): Observable<UserAccount[]> {
    return this.settings$.pipe(
      map(settings => {
        const settingInfo = this.getSettingByName(settings, Settings.Setting.DEPOSIT_TENDERS.split('.')[2]);
        return this.transformStringToArray(settingInfo?.value);
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
    return accounts.filter((account: UserAccount) => isCashlessAccount(account));
  }
}
