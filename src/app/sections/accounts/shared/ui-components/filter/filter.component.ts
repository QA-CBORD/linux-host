import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { take, tap, finalize } from 'rxjs/operators';

import { DateUtilObject, getAmountOfMonthFromPeriod } from './date-util';
import { FilterMenuComponent, FilterState } from './filter-menu/filter-menu.component';
import { AccountService } from '../../../services/accounts.service';
import { TIME_PERIOD, CONTENT_STRINGS } from '../../../accounts.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'st-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  @Output() onFilterChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  activeTimeRange: DateUtilObject;
  activeAccountName: string;
  contentString: { [key: string]: string };

  constructor(
    private readonly accountsService: AccountService,
    private readonly modalController: ModalController,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly transactionsService: TransactionService,
  ) {}

  ngOnInit() {
    this.setContentStrings();
    this.updateActiveState();
  }

  async onFilterDone({ accountId, period }: FilterState): Promise<void> {
    if (!accountId || !period) return;

    await this.loadingService.showSpinner();
    this.transactionsService
      .getTransactionsByAccountId(accountId, period)
      .pipe(
        tap(
          async () => {
            this.updateActiveState();
            this.cdRef.detectChanges();
            this.onFilterChanged.emit(true);
          },
          async () => {
            this.onFilterChanged.emit(true);
          }
        ),
        finalize(() => this.loadingService.closeSpinner()),
        take(1)
      )
      .subscribe();
  }

  expandTimeRange(arr: DateUtilObject[]): DateUtilObject[] {
    arr.unshift({ name: TIME_PERIOD.pastSixMonth });
    return arr;
  }

  async initFilterModal(): Promise<void> {
    const { activeAccountId: aId, activeTimeRange: tRange } = this.transactionsService;
    await this.createFilterModal(aId, tRange);
  }

  private updateActiveState() {
    this.activeTimeRange = this.transactionsService.activeTimeRange;
    this.activeAccountName = this.transactionsService.activeAccountId;
  }

  private async createFilterModal(accId: string, timeRange: DateUtilObject): Promise<void> {
    const modal = await this.modalController.create({
      component: FilterMenuComponent,
      animated: true,
      componentProps: {
        accounts: this.accountsService.getAccountsFilteredByDisplayTenders(),
        periods: this.expandTimeRange(getAmountOfMonthFromPeriod(6)),
        activeAccountId: accId,
        activeTimeRange: timeRange,
      },
    });
    modal.onDidDismiss()
      .then(({ data }) => data && this.onFilterDone(data));

    await modal.present();
  }

  get csNames() {
    return CONTENT_STRINGS;
  }

  setContentStrings() {
    const transactionStringNames: string[] = [
      CONTENT_STRINGS.allAccountsLabel,
      CONTENT_STRINGS.pastSixMonthsLabel,
      CONTENT_STRINGS.filterLabel,
    ];

    this.contentString = this.transactionsService.getContentStrings(transactionStringNames);
  }
}
