import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-recent-orders-list-item',
  templateUrl: './recent-orders-list-item.component.html',
  styleUrls: ['./recent-orders-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersListItemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
