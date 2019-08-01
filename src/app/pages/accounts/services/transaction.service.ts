import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap, tap, take } from 'rxjs/operators';

import { AccountsService } from './accounts.service';
import { CommerceApiService } from '../../../core/service/commerce/commerce-api.service';
import { ContentService } from './../../../core/service/content-service/content.service';

import { TransactionHistory } from '../models/transaction-history.model';
import { QueryTransactionHistoryCriteria } from '../../../core/model/account/transaction-query.model';
import { TransactionResponse } from '../../../core/model/account/transaction-response.model';
import { ContentStringInfo } from 'src/app/core/model/content/content-string-info.model';
import { ALL_ACCOUNTS, PAYMENT_SYSTEM_TYPE, SYSTEM_SETTINGS_CONFIG, TIME_PERIOD, ContentStringsParamsTransactions, GenericContentStringsParams } from '../accounts.config';
import {
  DateUtilObject,
  getRangeBetweenDates,
  getTimeRangeOfDate,
  getUniquePeriodName,
} from '../shared/ui-components/filter/date-util';

@Injectable()
export class TransactionService {
  private currentAccountId: string;
  private currentTimeRange: DateUtilObject;
  private transactionHistory: TransactionHistory[] = [];
  private queryCriteria: QueryTransactionHistoryCriteria;
  private transactionResponse: TransactionResponse;

  private readonly lazyAmount: number = 20;
  private readonly _transactions$: BehaviorSubject<TransactionHistory[]> = new BehaviorSubject<TransactionHistory[]>(
    this.transactionHistory
  );

  private content;

  constructor(
    private readonly accountsService: AccountsService,
    private readonly commerceApiService: CommerceApiService,
    private readonly contentService: ContentService
  ) {}

  get transactions$(): Observable<TransactionHistory[]> {
    return this._transactions$.asObservable();
  }

  get activeAccountId(): string {
    return this.currentAccountId;
  }

  get activeTimeRange(): DateUtilObject {
    return { ...this.currentTimeRange };
  }

  private set _transactions(value: TransactionHistory[]) {
    this.transactionHistory = [...this.transactionHistory, ...value];
    this.transactionHistory = this.cleanDuplicateTransactions(this.transactionHistory);
    this._transactions$.next([...this.transactionHistory]);
  }

  getTransactionHistoryByQuery(query: QueryTransactionHistoryCriteria): Observable<Array<TransactionHistory>> {
    return this.accountsService.settings$.pipe(
      map(settings => {
        const depositSetting = this.accountsService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.displayTenders.name
        );
        return this.accountsService.transformStringToArray(depositSetting.value);
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
    const transactionQuery = { startingReturnRow, maxReturn: this.lazyAmount };
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

  private cleanDuplicateTransactions(arr: TransactionHistory[]): TransactionHistory[] {
    const transactionMap = new Map<string, TransactionHistory>();
    arr.forEach(transaction => transactionMap.set(transaction.transactionId, transaction));
    return Array.from(transactionMap.values());
  }

  private filterByTenderIds(tendersId: string[], transactions: TransactionHistory[]): TransactionHistory[] {
    return transactions.filter(
      ({ paymentSystemType: type, tenderId: tenId }) =>
        type === PAYMENT_SYSTEM_TYPE.MONETRA || type === PAYMENT_SYSTEM_TYPE.USAEPAY || tendersId.includes(tenId)
    );
  }

  initContentStringsList(): Observable<ContentStringInfo[]> {
    return combineLatest(
      this.contentService.retrieveContentStringList(ContentStringsParamsTransactions),
      this.contentService.retrieveContentStringList(GenericContentStringsParams)
    ).pipe(
      map(([res, res0]) => {
        const finalArray = [...res, ...res0];
        this.content = finalArray.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
        return finalArray;
      }),
      take(1)
    );
  }

  getContentValueByName(name: string): string {
    return this.content[name] || '';
  }

}
