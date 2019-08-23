import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, zip } from 'rxjs';
import { take } from 'rxjs/operators';

import { AutoDepositService } from '../service/auto-deposit.service';
import { AccountsService } from '../../../services/accounts.service';

@Injectable()
export class AutomaticDepositResolver implements Resolve<Observable<any>> {
  constructor(private readonly autoDepositService:AutoDepositService,
              private readonly accountsService: AccountsService){}

  resolve(): Observable<any> {
    const accounts = this.accountsService.getUserAccounts();
    const depositSettings = this.autoDepositService.getUserAutoDepositInfo();

    return zip(accounts, depositSettings).pipe(take(1));
  }
}
