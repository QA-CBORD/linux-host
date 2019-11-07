import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { CommerceApiService } from '../../../core/service/commerce/commerce-api.service';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';
import { UserService } from 'src/app/core/service/user-service/user.service';

import { UserAccount } from '../../../core/model/account/account.model';

import { Settings, PaymentSystemType } from 'src/app/app.global';

@Injectable()
export class AccountsService {
  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);

  constructor(
    private readonly commerceApiService: CommerceApiService,
    private readonly userService: UserService,
    private readonly configService: ConfigurationService
  ) {}

  get accounts$(): Observable<UserAccount[]> {
    return this._accounts$.asObservable();
  }

  private set _accounts(value: UserAccount[]) {
    this._accounts$.next([...value]);
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

  transformStringToArray(value: string): Array<unknown> {
    if (!value.length) return [];
    const result = JSON.parse(value);
    return Array.isArray(result) ? result : [];
  }

  getAccountsFilteredByDisplayTenders(): Observable<UserAccount[]> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.configService.getSetting(institutionId, Settings.Setting.DISPLAY_TENDERS)),
      map(({ value }) => this.transformStringToArray(value)),
      switchMap((tenderIds: Array<string>) =>
        this.accounts$.pipe(map(accounts => this.filterAccountsByTenders(tenderIds, accounts)))
      )
    );
  }

  getAccountsFilteredByDepositTenders(): Observable<UserAccount[]> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.configService.getSetting(institutionId, Settings.Setting.DEPOSIT_TENDERS)),
      map(({ value }) => this.transformStringToArray(value)),
      switchMap((tenderIds: Array<string>) =>
        this.accounts$.pipe(map(accounts => this.filterAccountsByTenders(tenderIds, accounts)))
      )
    );
  }

  private filterAccountsByTenders(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(({ accountTender: tId }) => tendersId.includes(tId));
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[]): UserAccount[] {
    return accounts.filter(
      ({ paymentSystemType: type }) => type === PaymentSystemType.OPCS || type === PaymentSystemType.CSGOLD
    );
  }
}
