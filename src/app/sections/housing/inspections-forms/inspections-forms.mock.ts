import { Inspection } from './inspections-forms.model';

export function generateWorkOrder(_: any, index: number) {
  return {
    id: index,
  };
}

export function generateWorkOrders(amount = 3): Inspection {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}

export function generateWorkOrdersDetails(amount=3): Inspection {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}
