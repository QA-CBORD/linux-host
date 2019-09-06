import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, zip } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AutoDepositService } from '../service/auto-deposit.service';
import { LoadingService } from '../../../../../core/service/loading/loading.service';
import { DepositService } from '../../../services/deposit.service';

@Injectable()
export class AutomaticDepositResolver implements Resolve<Observable<any>> {
  constructor(
    private readonly autoDepositService: AutoDepositService,
    private readonly loadingService: LoadingService,
    private readonly depositService: DepositService
  ) {}

  resolve(): Observable<any> {
    const accounts = this.depositService.getUserAccounts();
    const depositSettings = this.autoDepositService.getUserAutoDepositInfo();

    return zip(accounts, depositSettings).pipe(
      map(data => ({ accounts: data[0], depositSettings: data[1] })),
      tap(
        this.loadingService.closeSpinner.bind(this.loadingService),
        this.loadingService.closeSpinner.bind(this.loadingService)
      ),
      take(1)
    );
  }
}
