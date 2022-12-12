import { Component, Input, OnInit } from '@angular/core';
import { HousingTabsComponent } from '../housing-tabs.component';

@Component({
  selector: 'st-housing-tab',
  templateUrl: './housing-tab.component.html',
})
export class HousingTabComponent implements OnInit {
  @Input() tabTitle: string;

  constructor(private tabs: HousingTabsComponent) {}

  ngOnInit() {
    this.tabs.addTab(this);
  }
}
