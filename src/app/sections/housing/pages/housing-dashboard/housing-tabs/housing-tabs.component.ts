import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { SegmentCustomEvent } from '@ionic/angular';
import { HousingTabComponent } from './housing-tab/housing-tab.component';

@Component({
  selector: 'st-housing-tabs',
  templateUrl: './housing-tabs.component.html',
  styleUrls: ['./housing-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousingTabsComponent {
  @Output() onTabSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedTab: string;

  tabs: HousingTabComponent[] = [];

  select(event: SegmentCustomEvent) {
    const { detail } = event;
    this.onTabSelected.emit(detail.value?.toString());
  }

  addTab(tab: HousingTabComponent) {
    if (this.tabs.length === 0) {
      this.selectedTab = tab.tabTitle;
    }
    this.tabs.push(tab);
  }
}
