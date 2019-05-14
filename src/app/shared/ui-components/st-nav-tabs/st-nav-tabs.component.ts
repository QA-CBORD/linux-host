import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { tabsConfig } from '../../../core/model/tabs/tabs.model';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'st-nav-tabs',
  templateUrl: './st-nav-tabs.component.html',
  styleUrls: ['./st-nav-tabs.component.scss'],
})
export class StNavTabsComponent implements OnInit {
  @ViewChild('tabs') tabs: IonTabs;
  private _tabsConfig: tabsConfig = { tabs: [] };
  @Input()
  set tabsConfig(value: tabsConfig) {
    this._tabsConfig = value;
    this.handleTabsConfigChange();
  }
  get tabsConfig(): tabsConfig {
    return this._tabsConfig;
  }
  constructor() {}

  ngOnInit() {}

  private handleTabsConfigChange() {
    if (this.tabsConfig.tabs.length > 0) {
      this.tabs.select(this.tabsConfig.tabs[0].route);
    }
  }
}
