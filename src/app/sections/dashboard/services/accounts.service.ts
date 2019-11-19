import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, zip } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';
import { UserService } from 'src/app/core/service/user-service/user.service';

import { Settings, PaymentSystemType, ContentStrings } from 'src/app/app.global';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { ContentService } from 'src/app/core/service/content-service/content.service';

@Injectable()
export class AccountsService {
  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);

  constructor(
    private readonly commerceApiService: CommerceApiService,
    private readonly userService: UserService,
    private readonly configService: ConfigurationService,
    private readonly contentService: ContentService
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

  getMealAccountStrings(): Observable<Array<string>> {
    return zip(
      this.contentService.retrieveContentString(ContentStrings.ContentString.MEAL_SUFFIX),
      this.contentService.retrieveContentString(ContentStrings.ContentString.MEAL_SUFFIX_PLURAL)
    ).pipe(map(([suffix, suffixPlural]) => [suffix.value, suffixPlural.value]));
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
