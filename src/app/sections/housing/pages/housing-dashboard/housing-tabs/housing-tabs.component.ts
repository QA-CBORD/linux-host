import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { SegmentCustomEvent } from '@ionic/angular';
import { SelectedUnitsTab } from '../../rooms-search/rooms-search.page';
import { SelectedHousingTab } from '../housing-dashboard.component';

export interface Tab {
  label: string;
  view: SelectedHousingTab | SelectedUnitsTab;
}

@Component({
  selector: 'st-housing-tabs',
  templateUrl: './housing-tabs.component.html',
  styleUrls: ['./housing-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousingTabsComponent {
  @Output() onTabSelected: EventEmitter<SelectedHousingTab> = new EventEmitter<SelectedHousingTab>();
  selectedTab: SelectedHousingTab = SelectedHousingTab.Forms;
  tabs: Tab[] = [
    { label: 'Forms', view: SelectedHousingTab.Forms },
    { label: 'Rooms', view: SelectedHousingTab.Rooms },
    { label: 'Contracts', view: SelectedHousingTab.Contracts },
  ];
  
  select(event: SegmentCustomEvent) {
    const { detail } = event;
    this.onTabSelected.emit(+detail.value);
  }
}
