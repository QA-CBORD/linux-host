import { WorkOrder, WorkOrdersFormsOptions } from './work-orders.model';

export function generateWorkOrder(_: any, index: number) {
  return {
    id: index,
  };
}

export function generateWorkOrders(amount: number): WorkOrder[] {
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}
