import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, combineLatest, zip, of } from 'rxjs';
import { map, switchMap, tap, take } from 'rxjs/operators';

import { AccountService } from './accounts.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { ContentStringsApiService } from '@core/service/content-service/content-strings-api.service';

import { TransactionHistory } from '../models/transaction-history.model';
import { TransactionResponse } from '@core/model/account/transaction-response.model';
import { ContentStringInfo } from 'src/app/core/model/content/content-string-info.model';
import {
  ALL_ACCOUNTS,
  PAYMENT_SYSTEM_TYPE,
  TIME_PERIOD,
  ContentStringsParamsTransactions,
  GenericContentStringsParams,
} from '../accounts.config';
import { DateUtilObject, getTimeRangeOfDate, getUniquePeriodName } from '../shared/ui-components/filter/date-util';
import { QueryTransactionHistoryCriteriaDateRange } from '@core/model/account/transaction-query-date-range.model';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';
import { convertGMTintoLocalTime } from '@core/utils/date-helper';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { Settings } from '../../../app.global';

@Injectable()
export class TransactionService {
  private currentAccountId: string;
  private currentTimeRange: DateUtilObject;
  private transactionHistory: TransactionHistory[] = [];
  private queryCriteria: QueryTransactionHistoryCriteriaDateRange;
  private infiniteFetchDateRecord = { lastShownDate: null };
  private transactionResponse: TransactionResponse;
  private contentString;
  private readonly lazyAmount: number = 20;
  private readonly _transactions$: BehaviorSubject<TransactionHistory[]> = new BehaviorSubject<TransactionHistory[]>(
    this.transactionHistory
  );

  constructor(
    private readonly accountsService: AccountService,
    private readonly commerceApiService: CommerceApiService,
    private readonly contentService: ContentStringsApiService,
    private readonly userFacadeService: UserFacadeService,
  ) { }

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
    this.infiniteFetchDateRecord.lastShownDate = this.getLatestDateInRange(value);
    this._transactions$.next([...this.transactionHistory]);
  }

  clearTransactionHistory(): void {
    this.currentAccountId = null;
    this.transactionHistory = [];
    this.queryCriteria = null;
  }

  getNextTransactionsByAccountId(id?: string): Observable<Array<TransactionHistory>> {
    if (this.transactionResponse && !this.transactionResponse.totalCount) return this.transactions$;
    this.setNextQueryObject(id);

    return this.getTransactionHistoryByQuery(this.queryCriteria);
  }

  getRecentTransactions(
    id: string,
    period?: DateUtilObject,
    maxReturnMostRecent?: number
  ): Observable<TransactionHistory[]> {
    period = period ? period : { name: TIME_PERIOD.pastSixMonth };
    maxReturnMostRecent = maxReturnMostRecent ? maxReturnMostRecent : 20;

    const { startDate, endDate } = getTimeRangeOfDate(period);

    this.setInitialQueryObject(id, startDate, endDate);
    this.queryCriteria = { ...this.queryCriteria, maxReturnMostRecent };
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

  private getTransactionHistoryByQuery(
    query: QueryTransactionHistoryCriteriaDateRange
  ): Observable<Array<TransactionHistory>> {
    return this.accountsService.settings$.pipe(
      map(settings => {
        const depositSetting = this.accountsService.getSettingByName(
          settings,
          Settings.Setting.DISPLAY_TENDERS.split('.')[2]
        );
        return this.accountsService.transformStringToArray(depositSetting.value);
      }),
      switchMap((tendersId: Array<string>) =>
        this.commerceApiService.getTransactionsHistoryByDate(query).pipe(
          tap(response => (this.transactionResponse = response)),
          map(({ transactions }) => this.filterByTenderIds(tendersId, transactions))
        )
      ),
      switchMap(transactions => zip(of(transactions), this.userFacadeService.getUserData$())),
      map(([transactions, { timeZone, locale }]) =>
        transactions.map(item => ({ ...item, actualDate: convertGMTintoLocalTime(item.actualDate, locale, timeZone) }))),
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
    const startingReturnDate = this.infiniteFetchDateRecord.lastShownDate;
    const transactionQuery = { maxReturnMostRecent: this.lazyAmount };
    this.queryCriteria = { ...this.queryCriteria, ...transactionQuery, newestDate: startingReturnDate };
  }

  private setInitialQueryObject(
    accountId: string = null,
    newestDate: string = null,
    oldestDate: string = null,
    maxReturnMostRecent = 20
  ) {
    this.queryCriteria = {
      maxReturnMostRecent,
      newestDate,
      oldestDate,
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
      this.contentService.retrieveContentStringListByRequest(ContentStringsParamsTransactions),
      this.contentService.retrieveContentStringListByRequest(GenericContentStringsParams)
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
    names.forEach(n => {
      if (this.contentString[n]) {
        list = { ...list, [n]: this.contentString[n] };
      }
    });
    return list;
  }

  getContentValueByName(name: string): string {
    return this.contentString[name] || '';
  }

  private getLatestDateInRange(range: TransactionHistory[]): any {
    if (range && range.length > 0) {
      return new Date(range[range.length - 1].actualDate.toString().replace(TIMEZONE_REGEXP, '$1:$2'));
    }
    return '';
  }
}
