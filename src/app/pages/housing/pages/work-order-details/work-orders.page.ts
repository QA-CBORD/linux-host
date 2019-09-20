import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.page.html',
})
export class WorkOrdersPage implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  workOrderId: number;

  ngOnInit() {
    this.workOrderId = parseInt(this._route.snapshot.paramMap.get('workOrderId'), 10);
  }
}
