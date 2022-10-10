import { Component, Input } from '@angular/core';
import { HousingTabsComponent } from '../housing-tabs.component';

@Component({
  selector: 'st-housing-tab',
  templateUrl: './housing-tab.component.html',
  styleUrls: ['./housing-tab.component.scss'],
})
export class HousingTabComponent {
  @Input() tabTitle: string;

  constructor(tabs: HousingTabsComponent) {
    tabs.addTab(this);
  }
}
