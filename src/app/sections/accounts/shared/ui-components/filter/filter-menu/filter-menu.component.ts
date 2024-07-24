import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';

import { DateUtilObject, getUniquePeriodName } from '../date-util';
import { ALL_ACCOUNTS, CONTENT_STRINGS, TIME_PERIOD } from '../../../../accounts.config';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { TransactionService } from '../../../../services/transaction.service';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
} from '@ionic/angular/standalone';
import { TimeRangePipe } from '../pipes/time-range.pipe';
import { AsyncPipe, NgForOf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'st-filter-menu',
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonRadio,
    IonRadioGroup,
    IonLabel,
    IonBackButton,
    IonItemDivider,
    IonList,
    IonItem,
    NgForOf,
    AsyncPipe,
    TranslateModule,
    TimeRangePipe,
  ],
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
  contentString: { [key: string]: string };

  constructor(
    private readonly modalController: ModalController,
    private readonly transactionsService: TransactionService
  ) {}

  ngOnInit() {
    this.setContentStrings();
    this.initFilterState();
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
