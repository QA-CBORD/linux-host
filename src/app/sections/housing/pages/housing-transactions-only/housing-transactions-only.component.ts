import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionHistory } from '@core/model/transactions/transaction-history.model';
import { ToastService } from '@core/service/toast/toast.service';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { ALL_ACCOUNTS, TIME_PERIOD } from '@sections/accounts/accounts.config';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { DateUtilObject } from '@sections/accounts/shared/ui-components/filter/date-util';
import { TILES_TITLE } from '@sections/dashboard/dashboard.config';
import { Observable, first, firstValueFrom, map } from 'rxjs';
import { Settings } from 'src/app/app.global';

@Component({
  selector: 'st-housing-transactions-only',
  templateUrl: './housing-transactions-only.component.html',
  styleUrls: ['./housing-transactions-only.component.scss'],
})
export class HousingTransactionsOnlyComponent implements OnInit {
  @ViewChild('infiniteScroll') private readonly lazy: IonInfiniteScroll;
  @ViewChild('content', { static: true }) private readonly content: IonContent;
  transactions$: Observable<TransactionHistory[]>;

  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountsService: AccountService,
    private readonly toastService: ToastService,
    private readonly transactionsService: TransactionService
  ) {}

  async ngOnInit() {
    const requiredSettings = [Settings.Setting.DISPLAY_TENDERS, Settings.Setting.DEPOSIT_TENDERS];
    await firstValueFrom(this.accountsService.getUserSettings(requiredSettings));
    await firstValueFrom(this.accountsService.getUserAccounts());
    this.transactions$ = this.transactionService
    .getRecentTransactions(ALL_ACCOUNTS, { name: TIME_PERIOD.pastSixMonth }, 20)
    .pipe(map(accounts => accounts.filter(acc => acc.locationName === TILES_TITLE.housing)));
    this.transactionService.clearTransactionHistory();
  }

  getNextTransactionPackage() {
    this.transactionsService
      .getNextTransactionsByAccountId(ALL_ACCOUNTS)
      .pipe(first())
      .subscribe({
        next: async data => (this.lazy.disabled = !data.length),
        error: async () => {
          await this.onErrorRetrieveTransactions('Something went wrong, please try again...');
          const duration = 700;
          const verticalPos = -100;
          await this.content.scrollByPoint(null, verticalPos, duration);
        },
        complete: async () => await this.lazy.complete(),
      });
  }

  async onFilterChanged(period: DateUtilObject): Promise<void> {
    this.transactions$ = this.transactionService
      .getRecentTransactions(ALL_ACCOUNTS, { name: TIME_PERIOD.pastMonth, month: period.month, year: period.year }, 20)
      .pipe(map(accounts => accounts.filter(acc => new Date(acc.actualDate).getMonth() === period.month)));
    if (this.lazy.disabled) {
      this.lazy.disabled = false;
    }
  }

  private async onErrorRetrieveTransactions(message: string): Promise<void> {
    await this.toastService.showError({ message });
  }
}
