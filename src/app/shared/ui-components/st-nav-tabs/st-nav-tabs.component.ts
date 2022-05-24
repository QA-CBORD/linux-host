import { Component, Input, ViewChild } from '@angular/core';
import { TabsConfig } from '../../../core/model/tabs/tabs.model';
import { IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from '../../../app.global';

@Component({
  selector: 'st-nav-tabs',
  templateUrl: './st-nav-tabs.component.html',
  styleUrls: ['./st-nav-tabs.component.scss'],
})
export class StNavTabsComponent  {
  @ViewChild('tabs', { static: true }) tabs: IonTabs;
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


  private handleTabsConfigChange() {
    if (this.tabsConfig.tabs.length > 0) {
      this.tabsConfig.tabs[0].active = true;
      this.onRouteChanged(this.tabsConfig.tabs[0].route);
    }
  }

  onRouteChanged(route) {
    this.setActiveState(route);

    this.router.navigate([`${PATRON_NAVIGATION.rewards}/${route}`]);
  }

  setActiveState(route) {
    this.tabsConfig.tabs.map(item => (item.active = item.route === route));
  }
}
