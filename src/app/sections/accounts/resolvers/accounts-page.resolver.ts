import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { AccountService } from '../services/accounts.service';
import { ALL_ACCOUNTS, TIME_PERIOD } from '../accounts.config';
import { UserAccount } from '@core/model/account/account.model';
import { finalize, switchMap } from 'rxjs/operators';
import { TransactionService } from '../services/transaction.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContentStringInfo } from 'src/app/core/model/content/content-string-info.model';
import { Settings } from '../../../app.global';
import { TransactionHistory } from '@core/model/transactions/transaction-history.model';

@Injectable()
export class AccountsPageResolver {
  constructor(
    private readonly accountsService: AccountService,
    private readonly transactionService: TransactionService,
    private readonly loadingService: LoadingService
  ) {}

  resolve(): Observable<[ContentStringInfo[], ContentStringInfo[], TransactionHistory[], UserAccount[]]> {
    const requiredSettings: Settings.Setting[] = [
      Settings.Setting.DISPLAY_TENDERS,
      Settings.Setting.DEPOSIT_TENDERS,
      Settings.Setting.AUTO_DEPOSIT_ENABLED,
      Settings.Setting.ONETIME_DEPOSITS_ENABLED,
      Settings.Setting.GUEST_DEPOSIT_ENABLED,
      Settings.Setting.MEAL_DONATIONS_ENABLED,
      Settings.Setting.LOW_BALANCE_AUTO_DEPOSIT_ENABLED,
    ];

    const accountContentStrings = this.accountsService.initContentStringsList();
    const transactionContentStrings = this.transactionService.initContentStringsList();
    const accountsCall = this.accountsService.getUserAccounts();
    const historyCall = this.accountsService
      .getUserSettings(requiredSettings)
      .pipe(
        switchMap(() =>
          this.transactionService.getRecentTransactions(ALL_ACCOUNTS, { name: TIME_PERIOD.pastSixMonth }, 10)
        )
      );
    this.loadingService.showSpinner();

    return zip(accountContentStrings, transactionContentStrings, historyCall, accountsCall).pipe(
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}
