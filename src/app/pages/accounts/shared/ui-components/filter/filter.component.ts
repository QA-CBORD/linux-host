import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';

import { take, tap } from 'rxjs/operators';

import { DateUtilObject, getAmountOfMonthFromPeriod } from './date-util';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { AccountsService } from '../../../services/accounts.service';
import { TIME_PERIOD } from '../../../accounts.config';
import { LoadingService } from '../../../../../core/service/loading/loading.service';
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

  constructor(
    private readonly accountsService: AccountsService,
    private readonly modalController: ModalController,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.updateActiveState();
  }

  async onFilterDone({ data: { accountId, period } }: OverlayEventDetail): Promise<void> {
    if (!accountId || !period) return;

    await this.loadingService.showSpinner();
    this.transactionService
      .getTransactionsByAccountId(accountId, period)
      .pipe(
        tap(
          async () => {
            this.updateActiveState();
            this.cdRef.detectChanges();
            await this.loadingService.closeSpinner();
            this.onFilterChanged.emit(true);
          },
          async () => {
            await this.loadingService.closeSpinner();
            this.onFilterChanged.emit(true);
          }
        ),
        take(1)
      )
      .subscribe();
  }

  expandTimeRange(arr: DateUtilObject[]): DateUtilObject[] {
    arr.unshift({ name: TIME_PERIOD.pastMonth });
    return arr;
  }

  async initFilterModal(): Promise<void> {
    const { activeAccountId: aId, activeTimeRange: tRange } = this.transactionService;
    await this.createFilterModal(aId, tRange);
  }

  private updateActiveState() {
    this.activeTimeRange = this.transactionService.activeTimeRange;
    this.activeAccountName = this.transactionService.activeAccountId;
  }

  private async createFilterModal(accId: string, timeRange: DateUtilObject): Promise<void> {
    const modal = await this.modalController.create({
      component: FilterMenuComponent,
      animated: true,
      componentProps: {
        accounts: this.accountsService.accounts$,
        periods: this.expandTimeRange(getAmountOfMonthFromPeriod(6)),
        activeAccountId: accId,
        activeTimeRange: timeRange,
      },
    });
    modal.onDidDismiss().then(({ data }) => data && this.onFilterDone(data));

    await modal.present();
  }
}
