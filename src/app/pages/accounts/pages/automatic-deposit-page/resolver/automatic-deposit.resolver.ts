import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, zip } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AutoDepositService } from '../service/auto-deposit.service';
import { AccountsService } from '../../../services/accounts.service';
import { LoadingService } from '../../../../../core/service/loading/loading.service';

@Injectable()
export class AutomaticDepositResolver implements Resolve<Observable<any>> {
  constructor(
    private readonly autoDepositService: AutoDepositService,
    private readonly accountsService: AccountsService,
    private readonly loadingService: LoadingService
  ) {}

  resolve(): Observable<any> {
    const accounts = this.accountsService.getUserAccounts();
    const depositSettings = this.autoDepositService.getUserAutoDepositInfo();

    return zip(accounts, depositSettings).pipe(
      take(1),
      tap(
        this.loadingService.closeSpinner.bind(this.loadingService),
        this.loadingService.closeSpinner.bind(this.loadingService)
      )
    );
  }
}
