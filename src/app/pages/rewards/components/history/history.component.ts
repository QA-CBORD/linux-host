import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RewardsService } from '../../services';
import { UserFulfillmentActivityInfo } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
  historyArr$: Observable<UserFulfillmentActivityInfo[]>;

  constructor(private readonly rewardsService: RewardsService) {}

  ngOnInit() {
    this.historyArr$ = this.rewardsService.getHistoryListRewards();
  }

  trackByFn(index, { id }): string {
    return id;
  }
}
