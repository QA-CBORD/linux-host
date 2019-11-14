import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AccountsService } from '../components/accounts-tile/services/accounts.service';
import { CommerceApiService } from '../../../core/service/commerce/commerce-api.service';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';
import { UserService } from 'src/app/core/service/user-service/user.service';

import { TransactionHistory } from '../models/transaction-history.model';
import { QueryTransactionHistoryCriteria } from '../../../core/model/account/transaction-query.model';
import { TransactionResponse } from '../../../core/model/account/transaction-response.model';

import { TIME_PERIOD, DateUtilObject, getTimeRangeOfDate, getUniquePeriodName, TimeRange } from '../utils/date-util';
import { Settings, PaymentSystemType } from 'src/app/app.global';


const ALL_ACCOUNTS = 'all_accounts';

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

  constructor(
    private readonly accountsService: AccountsService,
    private readonly commerceApiService: CommerceApiService,
    private readonly userService: UserService,
    private readonly configService: ConfigurationService
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
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.configService.getSetting(institutionId, Settings.Setting.DISPLAY_TENDERS)),
      map(({ value }) => this.accountsService.transformStringToArray(value)),
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
        type === PaymentSystemType.MONETRA || type === PaymentSystemType.USAEPAY || tendersId.includes(tenId)
    );
  }

}
