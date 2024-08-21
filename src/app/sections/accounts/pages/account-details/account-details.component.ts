import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CONTENT_STRINGS, TIME_PERIOD } from '../../accounts.config';
import { TransactionService } from '../../services/transaction.service';
import { NavigationState } from '@sections/dashboard/models/navigation-state.model';
import { ToastService } from '@core/service/toast/toast.service';
import { TransactionHistory } from '@core/model/transactions/transaction-history.model';

@Component({
  selector: 'st-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('infiniteScroll') private readonly lazy: IonInfiniteScroll;
  @ViewChild('content', { static: true }) private readonly content: IonContent;
  private currentAccountId: string;
  transactions$: Observable<TransactionHistory[]>;
  contentString: { [key: string]: string };
  backButtonText: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly transactionsService: TransactionService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.setContentStrings();
    this.currentAccountId = this.activatedRoute.snapshot.params.id;
    this.transactions$ = this.transactionsService.transactions$;
    const navState = this.router.getCurrentNavigation().extras.state as NavigationState;
    this.backButtonText = (navState && navState.backButtonText) || 'Accounts';
  }

  ngAfterViewInit() {
    this.lazy && (this.lazy.disabled = !this.isAbleToScrollByActivePeriod());
  }

  getNextTransactionPackage() {
    this.transactionsService
      .getNextTransactionsByAccountId(this.currentAccountId)
      .pipe(take(1))
      .subscribe(
        async data => (this.lazy.disabled = !data.length),
        async () => {
          await this.onErrorRetrieveTransactions('Something went wrong, please try again...');
          await this.content.scrollByPoint(null, -100, 700);
        },
        async () => await this.lazy.complete()
      );
  }

  async onFilterChanged(): Promise<void> {
    if (this.transactionsService.activeAccountId !== this.currentAccountId) {
      this.currentAccountId = this.transactionsService.activeAccountId;
    }
    this.lazy && (this.lazy.disabled = false);
    await this.content.scrollToTop(700);
  }

  private isAbleToScrollByActivePeriod(): boolean {
    return this.transactionsService.activeTimeRange.name === TIME_PERIOD.pastSixMonth;
  }

  private async onErrorRetrieveTransactions(message: string): Promise<void> {
    await this.toastService.showError({ message });
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
