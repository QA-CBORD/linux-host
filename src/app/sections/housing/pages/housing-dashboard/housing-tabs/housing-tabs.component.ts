import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SelectedHousingTab } from '../housing-dashboard.page';

interface Tab {
  label: string;
  view: SelectedHousingTab;
}

@Component({
  selector: 'st-housing-tabs',
  templateUrl: './housing-tabs.component.html',
  styleUrls: ['./housing-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousingTabsComponent {
  @Input() selectedTab: SelectedHousingTab;
  @Output() onTabSelected: EventEmitter<SelectedHousingTab> = new EventEmitter<SelectedHousingTab>()
  tabs: Tab[] = [
    { label: 'Forms', view: SelectedHousingTab.Forms },
    { label: 'Room', view: SelectedHousingTab.Rooms },
    { label: 'Contracts', view: SelectedHousingTab.Contracts },
  ];
  constructor() {}
  select(view: SelectedHousingTab){
    this.onTabSelected.emit(view);
  }
}
