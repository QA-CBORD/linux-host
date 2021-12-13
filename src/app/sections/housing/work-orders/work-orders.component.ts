import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WorkOrdersService } from './work-orders.service';

import { WorkOrder } from './work-orders.model';
import { Platform } from '@ionic/angular';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { HousingService } from '../housing.service';
import { ROLES } from '../../../app.global';
import { WorkOrderStateService } from './work-order-state.service';

@Component({
  selector: 'st-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrdersComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public urlEditForm: string;

  constructor(private _workOrdersService: WorkOrdersService,
    private _platform: Platform,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    public _workOrderStateService: WorkOrderStateService
    ) {}

  workOrders: WorkOrder[];

  ngOnInit() {
    const workOrdersSubscription: Subscription = this._workOrdersService
      .getWorkOrders()
      .subscribe();

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
// TODO: Create form send 0 to API
  createButtonForm(){
    //urlToAPI
  }

  // createWorkOrder(){
    
  // }
  
  createWorkOrder(termKey: number, workOrderKey: number): string {
    return "/patron/housing/work-orders/140/0";
  }

  getWorkOrder(termKey:number,workOrderKey:number){
    //TODO: view workOrderDetails
  }
}
