import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

import { RewardsService } from './services';

import { CONTENT_STRINGS, OPT_IN_STATUS } from './rewards.config';
import { TabsConfig } from '../../core/model/tabs/tabs.model';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

@Component({
  selector: 'st-rewards',
  templateUrl: './rewards.page.html',
})
export class RewardsPage implements OnInit {
  optInStatus: OPT_IN_STATUS;
  tabsConfig: TabsConfig = { tabs: [] };
  contentString: { [key: string]: string };

  constructor(
    private readonly platform: Platform,
    private readonly rewardsService: RewardsService,
    private readonly nativeProvider: NativeProvider
  ) {}

  ngOnInit(): void {
    this.initComponent();
    this.setContentStrings();
  }

  isShowToolbar(): boolean {
    return !this.nativeProvider.isWeb();
  }

  private initComponent() {
    //TODO: Remove platform ready implementation
    this.platform.ready().then(() => {
      combineLatest([this.rewardsService.getUserOptInStatus(), this.rewardsService.getRewardsTabsConfig()])
        .pipe(take(1))
        .subscribe({
          next: ([optInStatus, tabsConfig]) => {
            this.optInStatus = optInStatus;
            this.tabsConfig = tabsConfig;
          }
        });
    });
  }

  private setContentStrings() {
    const header = this.rewardsService.getContentValueByName(CONTENT_STRINGS.headerTitle);
    const backBtn = this.rewardsService.getContentValueByName(CONTENT_STRINGS.backBtn);

    this.contentString = { header, backBtn };
  }
}
