import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../model/service/message-response.model';
import { map } from 'rxjs/operators';
import { AccountResponse } from '../../model/account/account-response.model';
import { UserAccount } from '../../model/account/account.model';
import { QueryTransactionHistoryCriteria } from '../../model/account/transaction-query.model';
import { TransactionResponse } from '../../model/account/transaction-response.model';
import { QueryTransactionHistoryCriteriaDateRange } from '@core/model/account/transaction-query-date-range.model';

@Injectable({
  providedIn: 'root',
})
export class CommerceApiService extends BaseService {
  private readonly serviceUrl = '/json/commerce';

  getUserAccounts(): Observable<UserAccount[]> {
    const method = 'retrieveAccounts';

    return this.httpRequest(this.serviceUrl, method, true).pipe(
      map(({ response }: MessageResponse<AccountResponse>) => response.accounts)
    );
  }

  getCashlessUserId(): Observable<string> {
    const method = 'retrieveCashlessPatronMobileDisplayMediaValue';
    return this.httpRequest<MessageResponse<string>>(this.serviceUrl, method, true).pipe(
      map(({ response }) => response)
    );
  }

  getTransactionsHistory(queryCriteria: QueryTransactionHistoryCriteria): Observable<TransactionResponse> {
    const method = 'retrieveTransactionHistory';
    const params = {
      paymentSystemType: 0,
      queryCriteria,
    };

    return this.httpRequest(this.serviceUrl, method, true, params).pipe(
      map(({ response }: MessageResponse<TransactionResponse>) => response)
    );
  }

  getTransactionsHistoryByDate(
    queryCriteria: QueryTransactionHistoryCriteriaDateRange
  ): Observable<TransactionResponse> {
    const method = 'retrieveTransactionHistoryWithinDateRange';
    const params = {
      paymentSystemType: 0,
      queryCriteria,
    };

    return this.httpRequest(this.serviceUrl, method, true, params).pipe(
      map(({ response }: MessageResponse<TransactionResponse>) => response)
    );
  }

  calculateDepositFee(fromAccountId, toAccountId, amount): Observable<number> {
    const method = 'calculateDepositFee';
    const params = {
      fromAccountId,
      toAccountId,
      amount,
    };

    return this.httpRequest(this.serviceUrl, method, true, params).pipe(
      map(({ response }: MessageResponse<number>) => response)
    );
  }

  deposit(fromAccountId, toAccountId, amount, fromAccountCvv): Observable<string> {
    const method = 'deposit';
    const params = {
      fromAccountId,
      toAccountId,
      fromAccountCvv,
      amount,
      cashlessTerminalLocation: null,
    };

    return this.httpRequest(this.serviceUrl, method, true, params).pipe(
      map(({ response }: MessageResponse<string>) => response)
    );
  }

  donate(accountId: string, amountToDonate: number): Observable<string> {
    const method = 'donate';
    const params = {
      accountId,
      amountToDonate,
    };

    return this.httpRequest(this.serviceUrl, method, true, params).pipe(
      map(({ response }: MessageResponse<string>) => response)
    );
  }

  createAccount(accountInfo): Observable<string> {
    const method = 'createAccount';
    const params = { accountInfo };

    return this.httpRequest(this.serviceUrl, method, true, params).pipe(
      map(({ response }: MessageResponse<string>) => response)
    );
  }
}
