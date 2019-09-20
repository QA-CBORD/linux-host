import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'st-work-order-details',
  templateUrl: './work-order-details.page.html',
})
export class WorkOrderDetailsPage implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  workOrderId: number;

  ngOnInit() {
    this.workOrderId = parseInt(this._route.snapshot.paramMap.get('workOrderId'), 10);
  }
}
