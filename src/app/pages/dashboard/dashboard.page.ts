import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TileInfo } from './models';

@Component({
  selector: 'st-dashboard.page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  dashboardItems: TileInfo[] = [];

  constructor() {
    console.log("Dashboard page");
    
  }

  ngOnInit() {
    for (let i = 10; i > 0; i--) {
      this.dashboardItems.push({ title: `Test ${i}` });
    }
    console.log(this.dashboardItems);
  }
}
