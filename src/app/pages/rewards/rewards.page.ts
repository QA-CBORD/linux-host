import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { RewardsService } from './services';

import { CONTENT_STRINGS, OPT_IN_STATUS } from './rewards.config';
import { TabsConfig } from '../../core/model/tabs/tabs.model';
import { Location } from '@angular/common';

@Component({
  selector: 'st-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit, OnDestroy {
  optInStatus: OPT_IN_STATUS;
  tabsConfig: TabsConfig = { tabs: [] };
  private readonly sourceSubscription: Subscription = new Subscription();
  contentString: { [key: string]: string };

  constructor(
    private platform: Platform,
    private nav: NavController,
    private rewardsService: RewardsService,
    private location: Location
  ) {
    this.initComponent();
  }

  ngOnInit(): void {
    this.setContentStrings();

    const subscription = this.location.subscribe(() => {
      this.location.replaceState(location.origin);

      this.location.back();
    });

    this.sourceSubscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.sourceSubscription.unsubscribe();
  }

  private initComponent() {
    this.platform.ready().then(() => {
      const subscription = combineLatest(
        this.rewardsService.getUserOptInStatus(),
        this.rewardsService.getRewardsTabsConfig()
      )
        .pipe(take(1))
        .subscribe(
          ([optInStatus, tabsConfig]) => {
            this.optInStatus = optInStatus;
            this.tabsConfig = tabsConfig;
          },
          error => {}
        );
      this.sourceSubscription.add(subscription);
    });
  }
  private setContentStrings() {
    const header = this.rewardsService.getContentValueByName(CONTENT_STRINGS.headerTitle);

    this.contentString = { header };
  }
}
