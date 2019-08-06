import { Injectable } from '@angular/core';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { Observable, BehaviorSubject, zip } from 'rxjs';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { PAYMENT_SYSTEM_TYPE } from '../accounts.config';
import { map, tap } from 'rxjs/operators';
import { ContentStringRequest } from 'src/app/core/model/content/content-string-request.model';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { AccountsApiService } from './accounts.api.service';

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
    return this.commerceApiService.getUserAccounts().pipe(
      map(accounts => this.filterAccountsByPaymentSystem(accounts)),
      tap(accounts => (this._accounts = accounts))
    );
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

  private filterAccountsByPaymentSystem(accounts: UserAccount[]): UserAccount[] {
    return accounts.filter(
      ({ paymentSystemType: type }) => type === PAYMENT_SYSTEM_TYPE.MONETRA || type === PAYMENT_SYSTEM_TYPE.USAEPAY
    );
  }
}
