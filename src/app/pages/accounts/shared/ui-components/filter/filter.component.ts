import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';

import { DateUtilObject, getAmountOfMonthFromPeriod } from './date-util';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { AccountsService } from '../../../services/accounts.service';
import { TIME_PERIOD } from '../../../accounts.config';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'st-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  activeTimeRange: DateUtilObject;
  activeAccountName: string;

  constructor(
    private readonly accountsService: AccountsService,
    private readonly modalController: ModalController,
    private readonly cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.updateActiveState();
  }


  onFilterDone({ data: { accountId, period } }: OverlayEventDetail) {
    if (!accountId || !period) return;

    this.accountsService.getTransactionsByAccountId(accountId, period).pipe(
      tap(() => {
        this.updateActiveState();
        this.cdRef.detectChanges();
      }),
      take(1)).subscribe();
  }

  expandTimeRange(arr: DateUtilObject[]): DateUtilObject[] {
    arr.unshift({ name: TIME_PERIOD.pastMonth });
    arr.push({ name: TIME_PERIOD.pastSixMonth });
    return arr;
  }

  async initFilterModal(): Promise<void> {
    const { activeAccount: aId, activeTimeRange: tRange } = this.accountsService;
    await this.createFilterModal(aId, tRange);
  }

  private updateActiveState() {
    this.activeTimeRange = this.accountsService.activeTimeRange;
    this.activeAccountName = this.accountsService.activeAccount;
  }

  private async createFilterModal(accId: string, timeRange: DateUtilObject): Promise<void> {
    const modal = await this.modalController.create({
      component: FilterMenuComponent,
      animated: true,
      componentProps: {
        accounts: this.accountsService.accounts$,
        periods: this.expandTimeRange(getAmountOfMonthFromPeriod(5)),
        activeAccountId: accId,
        activeTimeRange: timeRange,
      },
    });
    modal.onDidDismiss().then(this.onFilterDone.bind(this));

    await modal.present();
  }
}
