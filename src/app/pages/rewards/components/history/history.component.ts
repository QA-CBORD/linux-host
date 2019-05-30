import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RewardsService } from '../../services';
import { UserFulfillmentActivityInfo } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  historyArr$: Observable<UserFulfillmentActivityInfo[]>;

  constructor(private readonly rewardsService: RewardsService) {}

  ngOnInit() {
    this.historyArr$ = this.rewardsService.getHistoryListRewards();
  }

  ngAfterViewInit() {
    // location.replace(`${location.origin}`);
  }

  ngOnDestroy(): void {

    // console.log(location)
    // location.replace(`${location.origin}`)
  }

  trackByFn(index, { id }): string {
    return id;
  }
}
