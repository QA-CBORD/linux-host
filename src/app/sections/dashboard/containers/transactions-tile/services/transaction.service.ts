import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, zip, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { DateUtilObject, getTimeRangeOfDate, getUniquePeriodName } from 'src/app/sections/accounts/shared/ui-components/filter/date-util';
import { Settings } from 'src/app/app.global';
import { TransactionHistory } from '@sections/dashboard/models';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { TransactionResponse } from '@core/model/account/transaction-response.model';
import { QueryTransactionHistoryCriteriaDateRange } from '@core/model/account/transaction-query-date-range.model';

import {
  ALL_ACCOUNTS,
  PAYMENT_SYSTEM_TYPE,
  TIME_PERIOD,
} from '@sections/accounts/accounts.config';
import { convertGMTintoLocalTime } from '@core/utils/date-helper';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable()
export class TransactionService {
  private currentAccountId: string;
  private currentTimeRange: DateUtilObject;
  private transactionHistory: TransactionHistory[] = [];
  private queryCriteria: QueryTransactionHistoryCriteriaDateRange;
  private transactionResponse: TransactionResponse;

  private readonly lazyAmount: number = 20;
  private readonly _transactions$: BehaviorSubject<TransactionHistory[]> = new BehaviorSubject<TransactionHistory[]>(
    this.transactionHistory
  );

  constructor(
    private readonly accountsService: AccountService,
    private readonly commerceApiService: CommerceApiService,
    private readonly userFacadeService: UserFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
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
    this._transactions$.next([...this.transactionHistory]);
  }

  getRecentTransactions(
    id: string,
    period?: DateUtilObject,
    maxReturnMostRecent?: number
  ): Observable<TransactionHistory[]> {
    period = period ? period : { name: TIME_PERIOD.pastSixMonth };
    maxReturnMostRecent = maxReturnMostRecent ? maxReturnMostRecent : 0;

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
    return this.settingsFacadeService.getSetting(Settings.Setting.DISPLAY_TENDERS).pipe(
      map(({ value }) => this.accountsService.transformStringToArray(value)),
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

  private setInitialQueryObject(
    accountId: string = null,
    newestDate: string = null,
    oldestDate: string = null,
    maxReturnMostRecent = 0
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
}
