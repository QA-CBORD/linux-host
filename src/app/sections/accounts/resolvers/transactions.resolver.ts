import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { tap, switchMap } from 'rxjs/operators';

import { TransactionService } from '../services/transaction.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SYSTEM_SETTINGS_CONFIG, TIME_PERIOD } from '../accounts.config';
import { AccountsService } from '@sections/accounts/services/accounts.service';
import { Observable, zip } from 'rxjs';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { UserAccount } from '@core/model/account/account.model';
import { TransactionHistory } from '@sections/accounts/models/transaction-history.model';

@Injectable()
export class TransactionsResolver implements Resolve<Observable<[ContentStringInfo[], ContentStringInfo[], TransactionHistory[], UserAccount[]]>> {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly loadingService: LoadingService,
    private readonly accountsService: AccountsService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<[ContentStringInfo[], ContentStringInfo[], TransactionHistory[], UserAccount[]]> {
    const requireSettings = [
      SYSTEM_SETTINGS_CONFIG.displayTenders,
      SYSTEM_SETTINGS_CONFIG.depositTenders,
    ];
    const transactionContentStrings = this.transactionService.initContentStringsList();
    const accountContentStrings = this.accountsService.initContentStringsList();
    const accountsCall = this.accountsService.getUserAccounts();
    const historyCall = this.accountsService
      .getUserSettings(requireSettings)
      .pipe(
        switchMap(() =>
          this.transactionService.getRecentTransactions(
            route.params.id, { name: TIME_PERIOD.pastSixMonth }, 20,
          ),
        ),
      );
    this.loadingService.showSpinner();
    this.transactionService.clearTransactionHistory();    
    return zip(transactionContentStrings,accountContentStrings, historyCall, accountsCall).pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner()),
    );
  }
}
