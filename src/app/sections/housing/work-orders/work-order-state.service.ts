import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkOrder } from './work-orders.model';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderStateService  {

  public workOrderList: BehaviorSubject<WorkOrder[]> = new BehaviorSubject<WorkOrder[]>([]);

  constructor() {
   
  }

  setWorkOrderList(value: WorkOrder[]) {
    this.workOrderList.next(value);
  }
}
