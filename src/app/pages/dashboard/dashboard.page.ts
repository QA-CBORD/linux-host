import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TileInfo } from './models';
import { NAVIGATE } from 'src/app/app.global';
import { DashboardService } from './services/dashboard.service';
import { SYSTEM_SETTING } from './dashboard.config';

@Component({
  selector: 'st-dashboard.page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  dashboardItems: TileInfo[] = [];

  constructor(private readonly dashService: DashboardService) {
  }

  ngOnInit() {
    this.determineDashboardItems();
  }

  determineDashboardItems() {
    if (this.checkSettingEnabled(SYSTEM_SETTING.SECURE_MESSAGING_ENABLED, 1)) {
      this.dashboardItems.push({ title: 'Secure Messaging', navigate: NAVIGATE.secureMessage });
    }

    if (this.checkSettingEnabled(SYSTEM_SETTING.REWARDS_ENABLED, 1)) {
      this.dashboardItems.push({ title: 'Rewards', navigate: NAVIGATE.rewards });
    }

    if (this.checkSettingEnabled(SYSTEM_SETTING.MOBILE_ACCESS_ENABLED, 1)) {
      this.dashboardItems.push({ title: 'Mobile Access', navigate: NAVIGATE.mobileAccess });
    }
  }

  private checkSettingEnabled(settingName: SYSTEM_SETTING, checkValue: any): boolean {
    return this.dashService.getSettingValueByName(settingName) == checkValue;
  }
}
