import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WorkOrdersService } from './work-orders.service';

import { WorkOrder } from './work-orders.model';
import { WorkOrderStateService } from './work-order-state.service';
import { TermsService } from '../terms/terms.service';
import { ROLES } from 'src/app/app.global';
import { Router } from '@angular/router';

@Component({
  selector: 'st-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrdersComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public urlEditForm: string;
  private selectedTermKey = 0;

  constructor(private _workOrdersService: WorkOrdersService,
    public _workOrderStateService: WorkOrderStateService,
    private _termService : TermsService,
    private router: Router
    ) {}

  workOrders: WorkOrder[];

  ngOnInit() {
    const workOrdersSubscription: Subscription = this._workOrdersService
      .getWorkOrders()
      .subscribe();

    this._initTermsSubscription();
    this._subscription.add(workOrdersSubscription);
  }

  private _initTermsSubscription() {
    this._subscription.add(
      this._termService.termId$
          .subscribe(termId => {
            this.urlEditForm = `/patron/housing/work-orders/${termId}/`;
            this.selectedTermKey = termId;
          }));
    
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
  
  createWorkOrderDefault(): void {
    this.router.navigateByUrl(`/patron/housing/work-orders/${this.selectedTermKey}/-1`);
  }

  getPath(key: number): string {
    return `${ROLES.patron}/housing/work-orders/${this.selectedTermKey}/${key}`;
  }

  getClass(key: number){
    if(key === 1){
      return 'open';
    }else if(key === 2){
      return 'inProcess';
    }else if(key === 6){
      return 'close';
    }else if(key === 5){
      return 'toCancel';
    }else if(key === 90){
      return 'cleaning';
    }else {
      return 'thinking';
    }
  }
}
