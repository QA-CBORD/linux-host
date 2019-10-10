import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RewardsService } from '../../services';
import { UserFulfillmentActivityInfo } from '../../models';
import { Observable } from 'rxjs';
import { CONTENT_STRINGS } from '../../rewards.config';

@Component({
  selector: 'st-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
  historyArr$: Observable<UserFulfillmentActivityInfo[]>;
  content: { [key: string]: string };

  constructor(private readonly rewardsService: RewardsService) {}

  ngOnInit() {
    this.historyArr$ = this.rewardsService.getHistoryListRewards();
    this.setContentStrings();
  }

  trackByFn(index, { id }): string {
    return id;
  }

  private setContentStrings() {
    const emptyListMessage = this.rewardsService.getContentValueByName(CONTENT_STRINGS.emptyHistoryListMessage);

    this.content = { emptyListMessage };
  }
}
