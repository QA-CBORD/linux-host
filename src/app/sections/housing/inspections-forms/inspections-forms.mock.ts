import { InspectionForms, WorkOrderDetails } from './inspections-forms.model';

export function generateWorkOrder(_: any, index: number) {
  return {
    id: index,
  };
}

export function generateWorkOrders(amount: number = 3): InspectionForms {
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}

export function generateWorkOrdersDetails(amount: number=3): WorkOrderDetails {
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}
