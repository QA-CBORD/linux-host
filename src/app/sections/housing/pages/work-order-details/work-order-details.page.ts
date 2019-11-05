import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'st-work-order-details',
  templateUrl: './work-order-details.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrderDetailsPage implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  workOrderId: number;

  ngOnInit() {
    this.workOrderId = parseInt(this._route.snapshot.paramMap.get('workOrderId'), 10);
  }
}
