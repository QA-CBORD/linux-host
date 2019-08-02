import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { take, tap } from 'rxjs/operators';

import { TransactionService } from '../services/transaction.service';
import { LoadingService } from '../../../core/service/loading/loading.service';

@Injectable()
export class TransactionsResolver implements Resolve<Promise<any>> {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly loadingService: LoadingService
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    await this.loadingService.showSpinner();
    return new Promise((resolve, reject) => {
      this.transactionService.initContentStringsList().subscribe();
      this.transactionService
        .getRecentTransactions(route.params.id)
        .pipe(
          tap(
            async () => {
              resolve();
              await this.loadingService.closeSpinner();
            },
            () => this.loadingService.closeSpinner()
          ),
          take(1)
        )
        .subscribe();
    });
  }
}
