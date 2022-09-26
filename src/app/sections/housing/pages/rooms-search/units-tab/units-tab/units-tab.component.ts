

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SelectedHousingTab } from '@sections/housing/pages/housing-dashboard/housing-dashboard.component';
import { Tab } from '@sections/housing/pages/housing-dashboard/housing-tabs/housing-tabs.component';
import { SelectedUnitsTab } from '../../rooms-search.page';

@Component({
  selector: 'st-units-tabs',
  templateUrl: './units-tab.component.html',
  styleUrls: ['./units-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsTabComponent {
  @Input() selectedTab: SelectedHousingTab;
  @Output() onTabSelected: EventEmitter<SelectedUnitsTab> = new EventEmitter<SelectedUnitsTab>();
  tabs: Tab[] = [
    { label: 'Buildings', view: SelectedUnitsTab.Buildings },
    { label: 'Units', view: SelectedUnitsTab.Units },
  ];
  
  select(view: any) {
    const { detail } = view;
    this.onTabSelected.emit(detail.value);
  }
}