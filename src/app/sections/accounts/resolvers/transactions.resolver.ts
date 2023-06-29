import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { tap, switchMap } from 'rxjs/operators';

import { TransactionService } from '../services/transaction.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { TIME_PERIOD } from '../accounts.config';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { Observable, zip } from 'rxjs';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { UserAccount } from '@core/model/account/account.model';
import { TransactionHistory } from '@sections/accounts/models/transaction-history.model';
import { Settings } from '../../../app.global';

@Injectable()
export class TransactionsResolver {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly loadingService: LoadingService,
    private readonly accountsService: AccountService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<[ContentStringInfo[], ContentStringInfo[], TransactionHistory[], UserAccount[]]> {
    const requiredSettings = [
      Settings.Setting.DISPLAY_TENDERS,
      Settings.Setting.DEPOSIT_TENDERS
    ];
    const transactionContentStrings = this.transactionService.initContentStringsList();
    const accountContentStrings = this.accountsService.initContentStringsList();
    const accountsCall = this.accountsService.getUserAccounts();
    const historyCall = this.accountsService
      .getUserSettings(requiredSettings)
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
