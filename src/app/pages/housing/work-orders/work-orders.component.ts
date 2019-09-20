import { Component, OnInit } from '@angular/core';

import { WorkOrdersService } from './work-orders.service';

import { WorkOrder } from './work-orders.model';

@Component({
  selector: 'st-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss'],
})
export class WorkOrdersComponent implements OnInit {
  constructor(private _workOrdersService: WorkOrdersService) {}

  workOrders: WorkOrder[];

  ngOnInit() {
    this._workOrdersService.getWorkOrders().subscribe(this._handleSuccess.bind(this));
  }

  trackById(_: number, workOrder: WorkOrder): number {
    return workOrder.id;
  }

  private _handleSuccess(workOrders: WorkOrder[]): void {
    this.workOrders = workOrders;
  }
}
