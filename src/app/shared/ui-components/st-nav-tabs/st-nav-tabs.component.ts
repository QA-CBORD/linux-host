import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TabsConfig } from '../../../core/model/tabs/tabs.model';
import { IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'st-nav-tabs',
  templateUrl: './st-nav-tabs.component.html',
  styleUrls: ['./st-nav-tabs.component.scss'],
})
export class StNavTabsComponent implements OnInit {
  @ViewChild('tabs') tabs: IonTabs;
  private _tabsConfig: TabsConfig = { tabs: [] };
  @Input()
  set tabsConfig(value: TabsConfig) {
    this._tabsConfig = value;
    this.handleTabsConfigChange();
  }

  get tabsConfig(): TabsConfig {
    return this._tabsConfig;
  }
  constructor(private router: Router) {}

  ngOnInit() {}

  private handleTabsConfigChange() {
    if (this.tabsConfig.tabs.length > 0) {
      this.tabs.select(this.tabsConfig.tabs[0].route);
    }
  }

  onRoute(route) {
    this.router.navigate([`/rewards/${route}`], {
      replaceUrl: true,
      skipLocationChange: true,
    });
  }
}
