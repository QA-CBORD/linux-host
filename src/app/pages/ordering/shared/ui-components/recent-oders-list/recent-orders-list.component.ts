import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-recent-orders-list',
  templateUrl: './recent-orders-list.component.html',
  styleUrls: ['./recent-orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
