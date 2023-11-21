import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { MEAL_CONTENT_STRINGS } from '@sections/accounts/pages/meal-donations/meal-donation.config';
import { isCashlessAccount } from '@core/utils/general-helpers';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from '../../../../../app.global';

@Injectable()
export class MealDonationsService {
  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);
  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);

  constructor(
    private readonly commerceApiService: CommerceApiService,
    private readonly contentStringFacade: ContentStringsFacadeService,
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

  fetchMealsDonationContentStringByName$(name: MEAL_CONTENT_STRINGS): Observable<ContentStringInfo> {
    return this.contentStringFacade.fetchContentString$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.mealDonation,
      name);
  }

  getMealsDonationContentStringByName$(name: MEAL_CONTENT_STRINGS): Observable<string> {
    return this.contentStringFacade.getContentStringValue$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.mealDonation,
      name);
  }

  fetchMealsDonationContentStrings$(): Observable<ContentStringInfo[]> {
    return this.contentStringFacade.fetchContentStrings$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.mealDonation);
  }

  getUserAccounts(): Observable<UserAccount[]> {
    return this.commerceApiService.getUserAccounts().pipe(tap(accounts => (this._accounts = accounts)));
  }

  getSettingByName(settings: SettingInfo[], name: string): SettingInfo | undefined {
    return settings.find(({ name: n }) => n === name);
  }

  getUserSettings(settings: Settings.Setting[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.settingsFacadeService.getSetting(setting));
    return zip(...requestArray).pipe(tap(settings => (this._settings = settings)));
  }

  getAccountsFilteredByMealsTenders(): Observable<UserAccount[]> {
    return this.settings$.pipe(
      map(settings => {
        const settingInfo = this.getSettingByName(settings, Settings.Setting.MEAL_DONATIONS_TENDERS.split('.')[2]);
        return this.transformStringToArray(settingInfo?.value);
      }),
      switchMap((tendersId: Array<string>) =>
        this.accounts$.pipe(map(accounts => this.filterAccountsByTenders(tendersId, accounts))),
      ),
    );
  }

  transformStringToArray(value: string | null): Array<unknown> {
    if (value === null || !value.length) return [];
    const result = JSON.parse(value);

    return Array.isArray(result) ? result : [];
  }

  donate(accountId, amount): Observable<string> {
    return this.commerceApiService.donate(accountId, amount);
  }

  private filterAccountsByTenders(accountsId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(account => accountsId.includes(account.accountTender) && isCashlessAccount(account));
  }
}

export type MealComponentContentStrings = { -readonly [key in keyof typeof MEAL_CONTENT_STRINGS]: Observable<string> };
