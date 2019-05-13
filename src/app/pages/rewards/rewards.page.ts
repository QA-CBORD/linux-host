import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonTabs, NavController, Platform } from '@ionic/angular';

import { Subscription, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

import { RewardsApiService } from './services';

import { CONTENT_STRINGS, OPT_IN_STATUS } from './rewards.config';
import { MUserFulfillmentActivityInfo, MUserRewardTrackInfo } from './models';

@Component({
  selector: 'st-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit, OnDestroy {
  @ViewChild('tabs') tabs: IonTabs;
  private readonly sourceSubscription: Subscription = new Subscription();
  contentString: { [key: string]: string };
  rewardTrack: MUserRewardTrackInfo = null;
  historyArray: MUserFulfillmentActivityInfo[] = [];
  userOptInStatus: boolean = false;

  constructor(private platform: Platform, private nav: NavController, private rewardsApiService: RewardsApiService) {
    this.initComponent();
  }

  ngOnInit(): void {
    this.setContentStrings();
  }

  ngOnDestroy(): void {
    this.sourceSubscription.unsubscribe();
  }

  private initComponent() {
    this.platform.ready().then(() => {
      const subscription = combineLatest(this.rewardsApiService.rewardTrack, this.rewardsApiService.rewardHistory)
        .pipe(take(1))
        .subscribe(([trackInfo, historyArray]) => {
          this.handleUpdatedRewardData(trackInfo, historyArray);
        });
      this.sourceSubscription.add(subscription);
    });
  }

  private handleUpdatedRewardData(trackInfo: MUserRewardTrackInfo, historyArray: MUserFulfillmentActivityInfo[]) {
    this.userOptInStatus = trackInfo.userOptInStatus === OPT_IN_STATUS.yes;
    this.rewardTrack = trackInfo;
    this.historyArray = historyArray;
    if (this.userOptInStatus) {
      this.setInitialActiveTab(
        this.rewardTrack.hasLevels ? 'levels' : this.rewardTrack.hasRedeemableRewards ? 'store' : 'history'
      );
    }
  }

  handleOptInSuccess() {
    this.userOptInStatus = true;
    this.rewardTrack.userOptInStatus = OPT_IN_STATUS.yes;
    this.setInitialActiveTab(
      this.rewardTrack.hasLevels ? 'levels' : this.rewardTrack.hasRedeemableRewards ? 'store' : 'history'
    );
  }

  private setInitialActiveTab(name: string) {
    this.tabs.select(name);
    this.nav.navigateForward(`/rewards/${name}`);
  }

  private setContentStrings() {
    let header = this.rewardsApiService.getContentValueByName(CONTENT_STRINGS.headerTitle);
    header = header ? header : 'Rewards ncs';

    this.contentString = { header };
  }
}
