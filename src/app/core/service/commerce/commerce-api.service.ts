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
      map((response: MessageResponse<AccountResponse>) => response.response.accounts)
    );
  }

  getTransactionsHistory(queryCriteria: QueryTransactionHistoryCriteria): Observable<TransactionResponse> {
    const method = 'retrieveTransactionHistory';
    const params = {
      paymentSystemType: 0,
      queryCriteria,
    };

    return this.httpRequest(this.serviceUrl, method, true, params).pipe(
      map((response: MessageResponse<TransactionResponse>) => response.response)
    );
  }
}
