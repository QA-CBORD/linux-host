import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { DateUtilObject, getAmountOfMonthFromPeriod } from './date-util';
import { ModalController } from '@ionic/angular';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { TIME_PERIOD } from '../../accounts.config';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'st-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  activeTimeRange: DateUtilObject;
  activeAccountId: string;

  constructor(private readonly accountsService: AccountsService, private readonly modalController: ModalController) {}

  ngOnInit() {
    this.updateActiveState();
  }

  private updateActiveState() {
    this.activeTimeRange = this.accountsService.activeTimeRange;
    this.activeAccountId = this.accountsService.activeAccount;
  }

  onFilterDone({ data: { accountId, period } }: OverlayEventDetail) {
    this.updateActiveState();
    this.accountsService.getTransactionsByAccountId(accountId, period).subscribe(data => {
      console.log(data);
    });
  }

  expandTimeRange(arr: DateUtilObject[]): DateUtilObject[] {
    arr.unshift({ name: TIME_PERIOD.pastMonth });
    arr.push({ name: TIME_PERIOD.pastSixMonth });
    return arr;
  }

  initFilterModal() {
    const { activeAccount: aId, activeTimeRange: tRange } = this.accountsService;
    this.createFilterModal(aId, tRange);
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

    return await modal.present();
  }
}
