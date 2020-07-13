import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { generateWorkOrders } from './work-orders.mock';

import { WorkOrder } from './work-orders.model';

@Injectable({
  providedIn: 'root',
})
export class WorkOrdersService {
  workOrders: WorkOrder[] = generateWorkOrders(5);

  getWorkOrders(): Observable<WorkOrder[]> {
    return of(this.workOrders);
  }
}
