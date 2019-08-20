import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonInfiniteScroll, ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { TransactionHistory } from '../../models/transaction-history.model';
import { TIME_PERIOD } from '../../accounts.config';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'st-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent implements OnInit {
  @ViewChild('infiniteScroll') private readonly lazy: IonInfiniteScroll;
  @ViewChild('content') private readonly content: IonContent;
  private currentAccountId: string;
  transactions$: Observable<TransactionHistory[]>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastController: ToastController,
    private readonly transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.currentAccountId = this.activatedRoute.snapshot.params.id;
    this.transactions$ = this.transactionService.transactions$;
    this.lazy.disabled = !this.isAbleToScrollByActivePeriod();
  }

  getNextTransactionPackage() {
    this.transactionService
      .getNextTransactionsByAccountId(this.currentAccountId)
      .pipe(take(1))
      .subscribe(
        async data => {
          await this.lazy.complete();
          if (data.length === 0) this.lazy.disabled = true;
        },
        async () => {
          await this.lazy.complete();
          await this.onErrorRetrieveTransactions('something went wrong, try again...');
          await this.content.scrollByPoint(null, -100, 700);
        }
      );
  }

  async onFilterChanged(): Promise<void> {
    if (this.transactionService.activeAccountId !== this.currentAccountId)
      this.currentAccountId = this.transactionService.activeAccountId;
    this.lazy.disabled = !this.isAbleToScrollByActivePeriod();
    await this.content.scrollToTop(700);
  }

  private isAbleToScrollByActivePeriod(): boolean {
    return this.transactionService.activeTimeRange.name === TIME_PERIOD.pastSixMonth;
  }

  private async onErrorRetrieveTransactions(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    toast.present();
  }
}
