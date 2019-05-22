import { Component, OnInit } from '@angular/core';
import { RewardsService } from '../../services';
import { UserFulfillmentActivityInfo } from '../../models';
import { Observable } from 'rxjs';
import { CLAIM_STATUS } from '../../rewards.config';

@Component({
  selector: 'st-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  historyArr$: Observable<UserFulfillmentActivityInfo[]>;

  constructor(private readonly rewardsService: RewardsService) {}

  ngOnInit() {
    this.historyArr$ = this.rewardsService.filterHistoryByStatus(CLAIM_STATUS.received);
  }

  trackByFn(index, item) {
    return item.id;
  }
}
