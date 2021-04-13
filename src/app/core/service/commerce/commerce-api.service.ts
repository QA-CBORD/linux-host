import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../model/service/message-response.model';
import { map } from 'rxjs/operators';
import { AccountResponse } from '../../model/account/account-response.model';
import { UserAccount } from '../../model/account/account.model';
import { QueryTransactionHistoryCriteria } from '../../model/account/transaction-query.model';
import { TransactionResponse } from '../../model/account/transaction-response.model';
import { QueryTransactionHistoryCriteriaDateRange } from '@core/model/account/transaction-query-date-range.model';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';

@Injectable({
  providedIn: 'root',
})
export class CommerceApiService {
  private readonly serviceUrl = '/json/commerce';

  constructor(private readonly http: HttpClient) {}

  getUserAccounts(): Observable<UserAccount[]> {
    const queryConfig = new RPCQueryConfig('retrieveAccounts', {}, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(
      map(({ response }: MessageResponse<AccountResponse>) => response.accounts)
    );
  }

  getCashlessUserId(): Observable<string> {
    const queryConfig = new RPCQueryConfig('retrieveCashlessPatronMobileDisplayMediaValue', {}, true);

    return this.http.post<MessageResponse<string>>(this.serviceUrl, queryConfig).pipe(
      map(({ response }) => response)
    );
  }

  getTransactionsHistory(queryCriteria: QueryTransactionHistoryCriteria): Observable<TransactionResponse> {
    const params = {
      paymentSystemType: 0,
      queryCriteria,
    };

    const queryConfig = new RPCQueryConfig('retrieveTransactionHistory', params, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(
      map(({ response }: MessageResponse<TransactionResponse>) => response)
    );
  }

  getTransactionsHistoryByDate(
    queryCriteria: QueryTransactionHistoryCriteriaDateRange
  ): Observable<TransactionResponse> {
    const params = {
      paymentSystemType: 0,
      queryCriteria,
    };

    const queryConfig = new RPCQueryConfig('retrieveTransactionHistoryWithinDateRange', params, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(
      map(({ response }: MessageResponse<TransactionResponse>) => response)
    );
  }

  calculateDepositFee(fromAccountId, toAccountId, amount): Observable<number> {
    const params = {
      fromAccountId,
      toAccountId,
      amount,
    };

    const queryConfig = new RPCQueryConfig('calculateDepositFee', params, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(
      map(({ response }: MessageResponse<number>) => response)
    );
  }

  deposit(fromAccountId, toAccountId, amount, fromAccountCvv): Observable<string> {
    const params = {
      fromAccountId,
      toAccountId,
      fromAccountCvv,
      amount,
      cashlessTerminalLocation: null,
    };
    const queryConfig = new RPCQueryConfig('deposit', params, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(
      map(({ response }: MessageResponse<string>) => response)
    );
  }

  donate(accountId: string, amountToDonate: number): Observable<string> {
    const params = {
      accountId,
      amountToDonate,
    };

    const queryConfig = new RPCQueryConfig('donate', params, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(
      map(({ response }: MessageResponse<string>) => response)
    );
  }

  createAccount(accountInfo): Observable<string> {
    const params = { accountInfo };

    const queryConfig = new RPCQueryConfig('createAccount', params, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(
      map(({ response }: MessageResponse<string>) => response)
    );
  }

  retrieveAccountsByUser(sessionId: string, userId: string): Observable<UserAccount[]> {
    const params = { sessionId, userId };
    const queryConfig = new RPCQueryConfig('retrieveAccountsByUser', params, true, false);
    return this.http.post<any>(this.serviceUrl, queryConfig);
  }

  depositForUser(sessionId: string, userId: string, fromAccountId: string, fromAccountCvv: string, toAccountId: string, amount: number, cashlessTerminalLocation: string | null): Observable<string> {
    const params = { sessionId, userId, fromAccountId, fromAccountCvv, toAccountId, amount, cashlessTerminalLocation };
    const queryConfig = new RPCQueryConfig('depositForUser', params, true, false);
    return this.http.post<any>(this.serviceUrl, queryConfig);
  }
}
