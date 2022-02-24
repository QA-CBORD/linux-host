import { Inspection } from './inspections-forms.model';

export function generateWorkOrder(_: any, index: number) {
  return {
    id: index,
  };
}

export function generateWorkOrders(amount: number = 3): Inspection {
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}

export function generateWorkOrdersDetails(amount: number=3): Inspection {
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}
