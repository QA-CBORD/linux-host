import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';

import { DateUtilObject } from '../date-util';
import { ALL_ACCOUNTS } from '../../../../accounts.config';
import { UserAccount } from 'src/app/core/model/account/account.model';

@Component({
  selector: 'st-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuComponent implements OnInit {
  @Input() accounts: Observable<UserAccount[]>;
  @Input() periods: DateUtilObject[];
  @Input() activeAccountId: string;
  @Input() activeTimeRange: DateUtilObject;
  private filterState: FilterState = {};

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {
    this.initFilterState();
  }

  get isAllAccounts(): boolean {
    return this.activeAccountId === ALL_ACCOUNTS;
  }

  onFilterDone() {
    this.modalController.dismiss(this.filterState);
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

  trackFn(i: number): number {
    return i;
  }

  private initFilterState() {
    this.filterState = { ...this.filterState, accountId: this.activeAccountId, period: this.activeTimeRange };
  }
}

export interface FilterState {
  accountId?: string;
  period?: DateUtilObject;
}
