import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { tap, map, switchMap } from 'rxjs/operators';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';
import { SYSTEM_SETTINGS_CONFIG } from '../../../accounts.config';
import { ConfigurationService } from '@core/service/config-service/configuration.service';

@Injectable()
export class MealDonationsService {

  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);
  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);

  constructor( 
    private readonly commerceApiService: CommerceApiService,
    private readonly configurationService: ConfigurationService,
    ) { }

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

  getSettingByName(settings: SettingInfo[], name: string): SettingInfo | undefined {
    return settings.find(({ name: n }) => n === name);
  }

  getUserSettings(settings: ContentStringRequest[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.configurationService.getSettingByConfig(setting));

    return zip(...requestArray).pipe(tap(settings => (this._settings = settings)));
  }

  getAccountsFilteredByMealsTenders(): Observable<UserAccount[]> {
    return this.settings$.pipe(
        map(settings => {
          const settingInfo = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.mealsTenders.name);
          return this.transformStringToArray(settingInfo.value);
        }),
        switchMap((tendersId: Array<string>) =>
            this.accounts$.pipe(map(accounts => this.filterAccountsByTenders(tendersId, accounts)))
        )
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
    return accounts.filter(({ accountTender: tId }) => accountsId.includes(tId));
  }

}
