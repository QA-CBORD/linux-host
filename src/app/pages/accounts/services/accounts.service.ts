import { Injectable } from '@angular/core';
import { AccountsApiService } from './accounts.api.service';

import { BehaviorSubject, Observable, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ContentStringRequest } from '../../../core/model/content/content-string-request.model';
import { CommerceApiService } from '../../../core/service/commerce/commerce-api.service';
import { UserAccount } from '../../../core/model/account/account.model';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';
import { TransactionHistory } from '../models/transaction-history.model';
import { PAYMENT_SYSTEM_TYPE } from '../accounts.config';

@Injectable()
export class AccountsService {
  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>(null);
  private readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>(null);
  private readonly _transactionHistory$: BehaviorSubject<TransactionHistory[]> = new BehaviorSubject<
    TransactionHistory[]
  >(null);

  constructor(
    private readonly apiService: AccountsApiService,
    private readonly commerceApiService: CommerceApiService
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
    const requestArray = settings.map(setting => this.apiService.getSettingByConfig(setting));

    return zip(...requestArray).pipe(tap(settings => (this._settings = settings)));
  }

  getUserAccounts(): Observable<UserAccount[]> {
    return this.commerceApiService.getUserAccounts().pipe(
      map(accounts => this.filterAccountsByPaymentSystem(accounts)),
      tap(accounts => (this._accounts = accounts))
    );
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[]): UserAccount[] {
    return accounts.filter(
      ({ paymentSystemType: type }) => type === PAYMENT_SYSTEM_TYPE.OPCS || type === PAYMENT_SYSTEM_TYPE.CSGOLD
    );
  }
}
