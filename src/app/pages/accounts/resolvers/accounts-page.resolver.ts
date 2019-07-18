import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { AccountsService } from '../services/accounts.service';
import { SYSTEM_SETTINGS_CONFIG } from '../accounts.config';
import { UserAccount } from '../../../core/model/account/account.model';
import { switchMap } from 'rxjs/operators';
import { TransactionHistory } from '../models/transaction-history.model';

@Injectable()
export class AccountsPageResolver implements Resolve<Observable<[UserAccount[], TransactionHistory[]]>> {
  constructor(private readonly accountsService: AccountsService) {}

  resolve(): Observable<[UserAccount[], TransactionHistory[]]> {
    const requireSettings = [
      SYSTEM_SETTINGS_CONFIG.depositTenders,
      SYSTEM_SETTINGS_CONFIG.enableAutoDeposits,
      SYSTEM_SETTINGS_CONFIG.enableOnetimeDeposits,
      SYSTEM_SETTINGS_CONFIG.guestDeposit,
    ];
    const accountsCall = this.accountsService.getUserAccounts();
    const historyCall = this.accountsService
      .getUserSettings(requireSettings)
      .pipe(switchMap(() => this.accountsService.getRecentTransactions()));

    return zip(accountsCall, historyCall);
  }
}
