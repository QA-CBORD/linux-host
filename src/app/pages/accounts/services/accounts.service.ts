import { Injectable } from '@angular/core';
import { AccountsApiService } from './accounts.api.service';

import { BehaviorSubject, Observable, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ContentStringRequest } from '../../../core/model/content/content-string-request.model';
import { CommerceApiService } from '../../../core/service/commerce/commerce-api.service';
import { UserAccount } from '../../../core/model/account/account.model';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';
import { TransactionHistory } from '../models/transaction-history.model';
import { ALL_ACCOUNTS, PAYMENT_SYSTEM_TYPE, SYSTEM_SETTINGS_CONFIG, TIME_PERIOD } from '../accounts.config';
import { QueryTransactionHistoryCriteria } from '../../../core/model/account/transaction-query.model';
import { TransactionResponse } from '../../../core/model/account/transaction-response.model';
import {
  DateUtilObject,
  getRangeBetweenDates,
  getTimeRangeOfDate,
  getUniquePeriodName,
} from '../shared/ui-components/filter/date-util';

@Injectable()
export class AccountsService {
  private currentAccountId: string;
  private currentTimeRange: DateUtilObject;

  private readonly _accounts$: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);
  private readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);
  private readonly _transactions$: BehaviorSubject<TransactionHistory[]> = new BehaviorSubject<TransactionHistory[]>(
    []
  );
  private transactionHistory: TransactionHistory[] = [];
  private queryCriteria: QueryTransactionHistoryCriteria;
  private transactionResponse: TransactionResponse;
  private lazyAmount: number = 20;

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

  get transactions$(): Observable<TransactionHistory[]> {
    return this._transactions$.asObservable();
  }

  get activeAccount(): string {
    return this.currentAccountId;
  }

  get activeTimeRange(): DateUtilObject {
    return { ...this.currentTimeRange };
  }

  private set _accounts(value: UserAccount[]) {
    this._accounts$.next([...value]);
  }

  private set _transactions(value: TransactionHistory[]) {
    this.transactionHistory = [...this.transactionHistory, ...value];
    this.transactionHistory = this.cleanDuplicateTransactions(this.transactionHistory);
    this._transactions$.next([...this.transactionHistory]);
  }

  private set _settings(value: SettingInfo[]) {
    this._settings$.next([...value]);
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

  getTransactionHistoryByQuery(query: QueryTransactionHistoryCriteria): Observable<Array<TransactionHistory>> {
    return this.settings$.pipe(
      map(settings => {
        const depositSetting = this.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.displayTenders.name);
        return this.transformStringToArray(depositSetting.value);
      }),
      switchMap((tendersId: Array<string>) =>
        this.commerceApiService.getTransactionsHistory(query).pipe(
          tap(response => (this.transactionResponse = response)),
          map(({ transactions }) => this.filterByTenderIds(tendersId, transactions))
        )
      ),
      tap(transactions => (this._transactions = transactions))
    );
  }

  getNextTransactionsByAccountId(id?: string): Observable<Array<TransactionHistory>> {
    if (this.transactionResponse && !this.transactionResponse.totalCount) return this.transactions$;
    this.setNextQueryObject(id);

    return this.getTransactionHistoryByQuery(this.queryCriteria);
  }

  getRecentTransactions(id?: string, period?: DateUtilObject, maxReturn?: number): Observable<TransactionHistory[]> {
    id = id ? id : ALL_ACCOUNTS;
    period = period ? period : { name: TIME_PERIOD.pastMonth };
    maxReturn = maxReturn ? maxReturn : 0;

    const { startDate, endDate } = getTimeRangeOfDate(period);

    this.setInitialQueryObject(id, startDate, endDate);
    this.queryCriteria = { ...this.queryCriteria, maxReturn };
    if (this.currentAccountId !== id) this.transactionHistory = [];
    this.updateTransactionActiveState(id, period);

    return this.getTransactionHistoryByQuery(this.queryCriteria);
  }

  getSettingByName(settings: SettingInfo[], name: string): SettingInfo | undefined {
    return settings.find(({ name: n }) => n === name);
  }

  transformStringToArray(value: string): Array<unknown> {
    if (!value.length) return [];
    const result = JSON.parse(value);

    return Array.isArray(result) ? result : [];
  }

  getTransactionsByAccountId(accountId: string, period?: DateUtilObject): Observable<TransactionHistory[]> {
    if (this.isDuplicateCall(accountId, period)) return this.transactions$;

    this.transactionHistory = [];
    const { startDate, endDate } = getTimeRangeOfDate(period);
    this.setInitialQueryObject(accountId, startDate, endDate);
    this.updateTransactionActiveState(accountId, period);

    return this.getTransactionHistoryByQuery(this.queryCriteria);
  }

  private updateTransactionActiveState(id: string, period: DateUtilObject) {
    this.currentTimeRange = period;
    this.currentAccountId = id;
  }

  private isDuplicateCall(accountId: string, period: DateUtilObject): boolean {
    const currentPeriod = getUniquePeriodName(this.currentTimeRange);
    const incomePeriod = period ? getUniquePeriodName(period) : null;

    return this.currentAccountId === accountId && currentPeriod === incomePeriod;
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[]): UserAccount[] {
    return accounts.filter(
      ({ paymentSystemType: type }) => type === PAYMENT_SYSTEM_TYPE.OPCS || type === PAYMENT_SYSTEM_TYPE.CSGOLD
    );
  }

  private setNextQueryObject(id: string = null) {
    if (this.currentAccountId === id) {
      this.updateQuery();
    } else {
      this.currentAccountId = id;
      this.setInitialQueryObject(id);
    }
  }

  private updateQuery() {
    const startingReturnRow = this.queryCriteria.startingReturnRow + this.queryCriteria.maxReturn;
    const transactionQuery: QueryTransactionHistoryCriteria = { startingReturnRow, maxReturn: this.lazyAmount };
    const { endDate, startDate } = getRangeBetweenDates(this.currentTimeRange, { name: TIME_PERIOD.pastSixMonth });
    this.queryCriteria = { ...this.queryCriteria, ...transactionQuery, endDate, startDate };
  }

  private setInitialQueryObject(accountId: string = null, startDate: string = null, endDate: string = null) {
    this.queryCriteria = {
      maxReturn: 0,
      startingReturnRow: 0,
      startDate,
      endDate,
      accountId: accountId === ALL_ACCOUNTS ? null : accountId,
    };
  }

  private filterByTenderIds(tendersId: string[], transactions: TransactionHistory[]): TransactionHistory[] {
    return transactions.filter(
      ({ paymentSystemType: type, tenderId: tenId }) =>
        type === PAYMENT_SYSTEM_TYPE.MONETRA || type === PAYMENT_SYSTEM_TYPE.USAEPAY || tendersId.includes(tenId)
    );
  }

  private cleanDuplicateTransactions(arr: TransactionHistory[]): TransactionHistory[] {
    const transactionMap = new Map<string, TransactionHistory>();
    arr.forEach(transaction => transactionMap.set(transaction.transactionId, transaction));
    return Array.from(transactionMap.values());
  }
}
