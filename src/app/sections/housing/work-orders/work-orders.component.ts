import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WorkOrdersService } from './work-orders.service';

import { WorkOrder } from './work-orders.model';

@Component({
  selector: 'st-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrdersComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(private _workOrdersService: WorkOrdersService) {}

  workOrders: WorkOrder[];

  ngOnInit() {
    const workOrdersSubscription: Subscription = this._workOrdersService
      .getWorkOrders()
      .subscribe(this._handleSuccess.bind(this));

    this._subscription.add(workOrdersSubscription);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  trackById(_: number, workOrder: WorkOrder): number {
    return workOrder.id;
  }

  private _handleSuccess(workOrders: WorkOrder[]): void {
    this.workOrders = workOrders;
  }
}
