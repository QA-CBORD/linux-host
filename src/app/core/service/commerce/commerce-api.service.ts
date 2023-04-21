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
import { CreditPaymentMethods } from '@core/model/account/credit-payment-methods.model';

@Injectable({
  providedIn: 'root',
})
export class CommerceApiService {
  private readonly serviceUrl = '/json/commerce';

  constructor(private readonly http: HttpClient) {}

  getUserAccounts(): Observable<UserAccount[]> {
    const queryConfig = new RPCQueryConfig('retrieveAccounts', {}, true);

    return this.http
      .post(this.serviceUrl, queryConfig)
      .pipe(map(({ response }: MessageResponse<AccountResponse>) => response.accounts));
  }

  removeAccount(accInfo): Observable<boolean> {
    const queryConfig = new RPCQueryConfig('deactivateAccount', { ...accInfo }, true);
    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  getCashlessUserId(): Observable<string> {
    const queryConfig = new RPCQueryConfig('retrieveCashlessPatronMobileDisplayMediaValue', {}, true);

    return this.http.post<MessageResponse<string>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  getTransactionsHistory(queryCriteria: QueryTransactionHistoryCriteria): Observable<TransactionResponse> {
    const params = {
      paymentSystemType: 0,
      queryCriteria,
    };

    const queryConfig = new RPCQueryConfig('retrieveTransactionHistory', params, true);

    return this.http
      .post(this.serviceUrl, queryConfig)
      .pipe(map(({ response }: MessageResponse<TransactionResponse>) => response));
  }

  getTransactionsHistoryByDate(
    queryCriteria: QueryTransactionHistoryCriteriaDateRange
  ): Observable<TransactionResponse> {
    const params = {
      paymentSystemType: 0,
      queryCriteria,
    };

    const queryConfig = new RPCQueryConfig('retrieveTransactionHistoryWithinDateRange', params, true);

    return this.http
      .post(this.serviceUrl, queryConfig)
      .pipe(map(({ response }: MessageResponse<TransactionResponse>) => response));
  }

  calculateDepositFee(fromAccountId, toAccountId, amount): Observable<number> {
    const params = {
      fromAccountId,
      toAccountId,
      amount,
    };

    const queryConfig = new RPCQueryConfig('calculateDepositFee', params, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(map(({ response }: MessageResponse<number>) => response));
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

    return this.http.post(this.serviceUrl, queryConfig).pipe(map(({ response }: MessageResponse<string>) => response));
  }

  donate(accountId: string, amountToDonate: number): Observable<string> {
    const params = {
      accountId,
      amountToDonate,
    };

    const queryConfig = new RPCQueryConfig('donate', params, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(map(({ response }: MessageResponse<string>) => response));
  }

  createAccount(accountInfo): Observable<string> {
    const params = { accountInfo };

    const queryConfig = new RPCQueryConfig('createAccount', params, true);

    return this.http.post(this.serviceUrl, queryConfig).pipe(map(({ response }: MessageResponse<string>) => response));
  }

  retrieveAccountsByUser(userId: string): Observable<UserAccount[]> {
    const params = { userId };
    const queryConfig = new RPCQueryConfig('retrieveAccountsByUser', params, true, false);
    return this.http
      .post<MessageResponse<{ accounts: UserAccount[] }>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response.accounts));
  }

  retrieveDepositAccountsByUser(userId: string): Observable<UserAccount[]> {
    const params = { userId };
    const queryConfig = new RPCQueryConfig('retrieveDepositAccountsByUser', params, true, false);
    return this.http.post<MessageResponse<{ accounts: UserAccount[] }>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response.accounts));
  }

  depositForUser(userId: string, fromAccountId: string, toAccountId: string, amount: number): Observable<string> {
    const params = { userId, fromAccountId, fromAccountCvv: null, toAccountId, amount, cashlessTerminalLocation: null };
    const queryConfig = new RPCQueryConfig('depositForUserFromAnyAccount', params, true, false);
    return this.http.post<string>(this.serviceUrl, queryConfig);
  }

  sale(fromAccountId: string, total: string): Observable<string> {
    const params = { saleInfo: { fromAccountId, total } };
    const queryConfig = new RPCQueryConfig('sale', params, true, false);
    return this.http.post<string>(this.serviceUrl, queryConfig);
  }

  getAllowedPaymentsMethods(sessionId: string, paymentSystemId: number): Observable<CreditPaymentMethods[]>  {
    const params = { sessionId, paymentSystemId };
    const queryConfig = new RPCQueryConfig('retrieveCreditPaymentMethodsByPaymentSystem', params, true, false);
    return this.http
      .post<MessageResponse<{ creditPaymentMethods: CreditPaymentMethods[] }>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response.creditPaymentMethods));
  }
}
