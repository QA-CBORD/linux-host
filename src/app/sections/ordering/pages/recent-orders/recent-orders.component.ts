import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss'],
})
export class RecentOrdersComponent implements OnInit {

  constructor() {
    console.log('Recent Orders Construct');
    
  }

  ngOnInit() {
    console.log('Recent Orders Init');}

}
