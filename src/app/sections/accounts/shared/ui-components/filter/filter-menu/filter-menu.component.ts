import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';

import { DateUtilObject, getUniquePeriodName } from '../date-util';
import { ALL_ACCOUNTS, CONTENT_STRINGS, TIME_PERIOD } from '../../../../accounts.config';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { AccountService } from '../../../../services/accounts.service';
import { TransactionService } from '../../../../services/transaction.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuComponent implements OnInit, OnDestroy {
  @Input() accounts: Observable<UserAccount[]>;
  @Input() periods: DateUtilObject[];
  @Input() activeAccountId: string;
  @Input() activeTimeRange: DateUtilObject;
  private filterState: FilterState = {};
  contentString: { [key: string]: string };

  constructor(
    private readonly modalController: ModalController,
    private readonly accountsService: AccountService,
    private readonly transactionsService: TransactionService,
    private readonly globalNav: GlobalNavService
  ) {}

  ngOnInit() {
    this.setContentStrings();
    this.initFilterState();
    this.globalNav.hideNavBar();
  }

  ngOnDestroy(): void {
    this.globalNav.showNavBar();
  }

  get isAllAccounts(): boolean {
    return this.activeAccountId === ALL_ACCOUNTS;
  }

  async onFilterDone() {
    await this.modalController.dismiss(this.filterState);
  }

  onAccountChosen(accountId: string) {
    this.filterState = { ...this.filterState, accountId };
  }

  onAllAccountChosen() {
    this.onAccountChosen(ALL_ACCOUNTS);
  }

  onTimeChosen(period: DateUtilObject) {
    this.filterState = { ...this.filterState, period };
  }

  trackPeriod(i: number, period: DateUtilObject): string {
    return getUniquePeriodName(period);
  }

  private initFilterState() {
    this.filterState = { ...this.filterState, accountId: this.activeAccountId, period: this.activeTimeRange };
  }

  get timePeriod() {
    return TIME_PERIOD;
  }

  get csNames() {
    return CONTENT_STRINGS;
  }

  setContentStrings() {
    const transactionStringNames: string[] = [
      CONTENT_STRINGS.filterDateLabel,
      CONTENT_STRINGS.filterAccountLabel,
      CONTENT_STRINGS.filterLabel,
      CONTENT_STRINGS.doneBtn,
      CONTENT_STRINGS.pastSixMonthsLabel,
      CONTENT_STRINGS.allAccountsLabel,
    ];

    this.contentString = this.transactionsService.getContentStrings(transactionStringNames);
  }

  async onClose(): Promise<void> {
    await this.modalController.dismiss();
  }
}

export interface FilterState {
  accountId?: string;
  period?: DateUtilObject;
}
