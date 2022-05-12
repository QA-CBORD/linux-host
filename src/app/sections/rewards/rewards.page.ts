import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { RewardsService } from './services';

import { CONTENT_STRINGS, OPT_IN_STATUS } from './rewards.config';
import { TabsConfig } from '../../core/model/tabs/tabs.model';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

@Component({
  selector: 'st-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
  optInStatus: OPT_IN_STATUS;
  tabsConfig: TabsConfig = { tabs: [] };
  contentString: { [key: string]: string };

  constructor(
    private readonly platform: Platform,
    private readonly rewardsService: RewardsService,
    private readonly nativeProvider: NativeProvider
  ) {
    this.initComponent();
  }

  ngOnInit(): void {
    this.setContentStrings();
  }

  isShowToolbar(): boolean {
    return !this.nativeProvider.isWeb();
  }

  private initComponent() {
    this.platform.ready().then(() => {
      combineLatest(this.rewardsService.getUserOptInStatus(), this.rewardsService.getRewardsTabsConfig())
        .pipe(take(1))
        .subscribe(
          ([optInStatus, tabsConfig]) => {
            this.optInStatus = optInStatus;
            this.tabsConfig = tabsConfig;
          },
          error => {
            return;
          }
        );
    });
  }

  private setContentStrings() {
    const header = this.rewardsService.getContentValueByName(CONTENT_STRINGS.headerTitle);
    const backBtn = this.rewardsService.getContentValueByName(CONTENT_STRINGS.backBtn);

    this.contentString = { header, backBtn };
  }
}
