import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { SegmentCustomEvent } from '@ionic/angular';
import { SelectedHousingTab } from '../housing-dashboard.component';
import { HousingTabComponent } from './housing-tab/housing-tab.component';

@Component({
  selector: 'st-housing-tabs',
  templateUrl: './housing-tabs.component.html',
  styleUrls: ['./housing-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousingTabsComponent {
  @Output() onTabSelected: EventEmitter<SelectedHousingTab> = new EventEmitter<SelectedHousingTab>();
  @Input() selectedTab: SelectedHousingTab = SelectedHousingTab.Forms;

  tabs: HousingTabComponent[] = [];

  select(event: SegmentCustomEvent) {
    const { detail } = event;
    this.onTabSelected.emit(+detail.value);
  }

  addTab(tab: HousingTabComponent) {
    if (this.tabs.length === 0) {
      this.selectedTab = this.tabs.length;
    }
    this.tabs.push(tab);
  }
}
