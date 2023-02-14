import { WorkOrder, WorkOrderDetails } from './work-orders.model';

export function generateWorkOrder(_, index: number) {
  return {
    id: index,
  };
}

export function generateWorkOrders(amount = 3): WorkOrder {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}

export function generateWorkOrdersDetails(amount=3): WorkOrderDetails {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}
