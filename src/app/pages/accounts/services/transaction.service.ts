import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap, tap, take } from 'rxjs/operators';

import { AccountsService } from './accounts.service';
import { CommerceApiService } from '../../../core/service/commerce/commerce-api.service';
import { ContentService } from '../../../core/service/content-service/content.service';

import { TransactionHistory } from '../models/transaction-history.model';
import { QueryTransactionHistoryCriteria } from '../../../core/model/account/transaction-query.model';
import { TransactionResponse } from '../../../core/model/account/transaction-response.model';
import { ContentStringInfo } from 'src/app/core/model/content/content-string-info.model';
import {
  ALL_ACCOUNTS,
  PAYMENT_SYSTEM_TYPE,
  SYSTEM_SETTINGS_CONFIG,
  TIME_PERIOD,
  ContentStringsParamsTransactions,
  GenericContentStringsParams,
} from '../accounts.config';
import {
  DateUtilObject,
  getTimeRangeOfDate,
  getUniquePeriodName,
  TimeRange,
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

  private contentString;

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
    this.transactionHistory.sort((a, b) => new Date(b.actualDate).getTime() - new Date(a.actualDate).getTime());
    this._transactions$.next([...this.transactionHistory]);
  }

  getNextTransactionsByAccountId(id?: string): Observable<Array<TransactionHistory>> {
    if (this.transactionResponse && !this.transactionResponse.totalCount) return this.transactions$;
    this.setNextQueryObject(id);

    return this.getTransactionHistoryByQuery(this.queryCriteria);
  }

  getRecentTransactions(id: string, period?: DateUtilObject, maxReturn?: number): Observable<TransactionHistory[]> {
    period = period ? period : { name: TIME_PERIOD.pastSixMonth };
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

    if (period.name === TIME_PERIOD.pastSixMonth) {
      this.setInitialQueryObject(accountId, startDate, endDate, this.lazyAmount);
    } else {
      this.setInitialQueryObject(accountId, startDate, endDate);
    }
    this.updateTransactionActiveState(accountId, period);

    return this.getTransactionHistoryByQuery(this.queryCriteria);
  }

  private getTransactionHistoryByQuery(query: QueryTransactionHistoryCriteria): Observable<Array<TransactionHistory>> {
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
    const { endDate, startDate } = this.getDateRangeLazyByQuery(this.queryCriteria);
    this.queryCriteria = { ...this.queryCriteria, ...transactionQuery, endDate, startDate };
  }

  private getDateRangeLazyByQuery(query: QueryTransactionHistoryCriteria): TimeRange {
    let endDate;
    let startDate;
    if (query.maxReturn !== 0) {
      startDate = query.startDate;
      endDate = query.endDate;
    } else {
      startDate = getTimeRangeOfDate({ name: TIME_PERIOD.pastSixMonth }).startDate;
      endDate = query.startDate === startDate ? query.endDate : query.startDate;
    }

    return { startDate, endDate };
  }

  private setInitialQueryObject(
    accountId: string = null,
    startDate: string = null,
    endDate: string = null,
    maxReturn: number = 0
  ) {
    this.queryCriteria = {
      maxReturn,
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
        this.contentString = finalArray.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
        return finalArray;
      }),
      take(1)
    );
  }

  getContentStrings(names: string[]) {
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
}
