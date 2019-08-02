import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { AccountsService } from '../services/accounts.service';
import { ALL_ACCOUNTS, SYSTEM_SETTINGS_CONFIG, TIME_PERIOD } from '../accounts.config';
import { UserAccount } from '../../../core/model/account/account.model';
import { switchMap, tap } from 'rxjs/operators';
import { TransactionHistory } from '../models/transaction-history.model';
import { TransactionService } from '../services/transaction.service';
import { LoadingService } from '../../../core/service/loading/loading.service';
import { ContentStringInfo } from 'src/app/core/model/content/content-string-info.model';

@Injectable()
export class AccountsPageResolver implements Resolve<Observable<[ContentStringInfo[], TransactionHistory[], UserAccount[]]>> {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly transactionService: TransactionService,
    private readonly loadingService: LoadingService
  ) {}

  resolve(): Observable<[ContentStringInfo[], TransactionHistory[], UserAccount[]]> {
    const requireSettings = [
      SYSTEM_SETTINGS_CONFIG.displayTenders,
      SYSTEM_SETTINGS_CONFIG.enableAutoDeposits,
      SYSTEM_SETTINGS_CONFIG.enableOnetimeDeposits,
      SYSTEM_SETTINGS_CONFIG.guestDeposit,
    ];
    const contentStringsCall = this.accountsService.initContentStringsList();
    const accountsCall = this.accountsService.getUserAccounts();
    const historyCall = this.accountsService
      .getUserSettings(requireSettings)
      .pipe(
        switchMap(() =>
          this.transactionService.getRecentTransactions(ALL_ACCOUNTS, { name: TIME_PERIOD.pastSixMonth }, 10)
        )
      );
    this.loadingService.showSpinner();

    return zip(contentStringsCall, historyCall, accountsCall).pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}
