import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonInfiniteScroll, ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { TransactionHistory } from '../../models/transaction-history.model';
import { TIME_PERIOD, CONTENT_STRINGS } from '../../accounts.config';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'st-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('infiniteScroll') private readonly lazy: IonInfiniteScroll;
  @ViewChild('content') private readonly content: IonContent;
  private currentAccountId: string;
  transactions$: Observable<TransactionHistory[]>;
  contentString: { [key: string]: string };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastController: ToastController,
    private readonly transactionsService: TransactionService
  ) {}

  ngOnInit() {
    this.setContentStrings();
    this.currentAccountId = this.activatedRoute.snapshot.params.id;
    this.transactions$ = this.transactionsService.transactions$;
  }

  ngAfterViewInit() {
    this.lazy && (this.lazy.disabled = !this.isAbleToScrollByActivePeriod());
  }

  getNextTransactionPackage() {
    this.transactionsService
      .getNextTransactionsByAccountId(this.currentAccountId)
      .pipe(take(1))
      .subscribe(
        async data => {
          await this.lazy.complete();
          if (data.length === 0) this.lazy.disabled = true;
        },
        async () => {
          await this.lazy.complete();
          await this.onErrorRetrieveTransactions('Something went wrong, please try again...');
          await this.content.scrollByPoint(null, -100, 700);
        }
      );
  }

  async onFilterChanged(): Promise<void> {
    if (this.transactionsService.activeAccountId !== this.currentAccountId)
      this.currentAccountId = this.transactionsService.activeAccountId;
    this.lazy && (this.lazy.disabled = !this.isAbleToScrollByActivePeriod());
    await this.content.scrollToTop(700);
  }

  private isAbleToScrollByActivePeriod(): boolean {
    return this.transactionsService.activeTimeRange.name === TIME_PERIOD.pastSixMonth;
  }

  private async onErrorRetrieveTransactions(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    toast.present();
  }

  get csNames() {
    return CONTENT_STRINGS;
  }

  setContentStrings() {
    const transactionStringNames: string[] = [
      CONTENT_STRINGS.headerTitle,
      CONTENT_STRINGS.headerBackBtn,
      CONTENT_STRINGS.recentTransactionsLabel,
      CONTENT_STRINGS.infiniteScrollLoader,
    ];

    this.contentString = this.transactionsService.getContentStrings(transactionStringNames);
  }
}
