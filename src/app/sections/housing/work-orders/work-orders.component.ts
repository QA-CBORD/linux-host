import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WorkOrdersService } from './work-orders.service';

import { WorkOrder } from './work-orders.model';
import { ROLES } from '../../../app.global';
import { WorkOrderStateService } from './work-order-state.service';
import { TermsService } from '../terms/terms.service';

@Component({
  selector: 'st-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrdersComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public urlEditForm: string;
  private selectedTermKey: number = 0;

  constructor(private _workOrdersService: WorkOrdersService,
    public _workOrderStateService: WorkOrderStateService,
    private _termService : TermsService
    ) {}

  workOrders: WorkOrder[];

  ngOnInit() {
    const workOrdersSubscription: Subscription = this._workOrdersService
      .getWorkOrders()
      .subscribe();

      this._subscription.add(
        this._termService.termId$
            .subscribe(termId => this.selectedTermKey = termId));
    this._subscription.add(workOrdersSubscription);
    this.urlEditForm = `${ROLES.patron}/housing/waiting-lists/` //TODO: Url workOrders aPI
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  getStatus(key: number): string {
    if (key || key !== 0) {
      return 'Submitted'
    }

    return 'New';
  }
  
  createWorkOrderDefault(): string {
    return `/patron/housing/work-orders/${this.selectedTermKey}/-1`;
  }

  createWorkOrder(termKey: number, workOrderKey: number): string {
    return `/patron/housing/work-orders/${this.selectedTermKey}/${workOrderKey}`;
  }

  getWorkOrder(termKey:number,workOrderKey:number){
    return `/patron/housing/work-orders/${this.selectedTermKey}/${workOrderKey}`;
  }
}
