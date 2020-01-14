import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '@core/model/account/account.model';
import { MessageResponse } from '@core/model/service/message-response.model';
import { AccountResponse } from '@core/model/account/account-response.model';
import { QueryTransactionHistoryCriteria } from '@core/model/account/transaction-query.model';
import { TransactionResponse } from '@core/model/account/transaction-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommerceApiService extends BaseService {
  private readonly serviceUrl = '/json/commerce';

  constructor(protected readonly http: HttpClient) {
    super(http);
  }

  getUserAccounts(): Observable<UserAccount[]> {
    const method = 'retrieveAccounts';

    return this.httpRequest(this.serviceUrl, method, true).pipe(
      map(({ response }: MessageResponse<AccountResponse>) => response.accounts)
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

  getCashlessUserId(): Observable<string> {
    const method = 'retrieveCashlessPatronMobileDisplayMediaValue';
    return this.httpRequest<MessageResponse<string>>(
      this.serviceUrl,
      method,
      true
    ).pipe(map(({ response }) => response));
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

  donate(accountId: string, amountToDonate: string): Observable<any> {
    const method = 'donate';
    const params = {
      accountId,
      amountToDonate,
    };

    return this.httpRequest(this.serviceUrl, method, true, params).pipe(
      map(({ response }: MessageResponse<any>) => response)
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
