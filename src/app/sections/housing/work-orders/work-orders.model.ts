import { isDefined } from '../utils';
import { PatronAttribute } from '../applications/applications.model';

export interface WorkOrdersListOptions {
  key: number;
  type: number;
  description: string;
  status: number;
  requestedDate: string;
}

export class WorkOrdersList implements WorkOrdersListOptions {
  key: number;
  type: number;
  description: string;
  status: number;
  requestedDate: string;
  constructor(options: WorkOrdersListOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as WorkOrdersListOptions;
    }
    this.key = Number(options.key);
    this.type = Number(options.type);
    this.description = String(options.description);
    this.status= Number(options.status);
    this.requestedDate = String(options.requestedDate);

  }
}
export interface WorkOrderOptions {
  canSubmit: boolean,
  workOrders: WorkOrdersList[],
}

export class WorkOrder implements WorkOrderOptions{
  canSubmit: boolean;
  workOrders: WorkOrdersList[];
  constructor(options: WorkOrderOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as WorkOrderOptions;
    }
    this.canSubmit = Boolean(options.canSubmit)
    this.workOrders = Array.isArray(options.workOrders)
      ? options.workOrders.map((detail: any) => new WorkOrdersList(detail))
      : [];
  }
  
}

export interface WorkOrdersDetailsOptions {
  id: number;
  applicationDescription: string;
  applicationFormJson: {};
  applicationTitle: string;
  applicationTypeId: number;
  applicationAvailableEndDateTime: string;
  applicationAvailableStartDateTime: string;
  cancellationDateTime: string;
  expirationDateTime: string;
  expireWhenAssigned: number;
  numberOfDaysToExpire: number;
  termId: number
}

export class WorkOrderDetails implements WorkOrdersDetailsOptions{
  id: number;
  applicationDescription: string;
  applicationFormJson: {};
  applicationTitle: string;
  applicationTypeId: number;
  applicationAvailableEndDateTime: string;
  applicationAvailableStartDateTime: string;
  cancellationDateTime: string;
  expirationDateTime: string;
  expireWhenAssigned: number;
  numberOfDaysToExpire: number;
  termId: number

  constructor(options: WorkOrdersDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as WorkOrdersDetailsOptions;
    }
    this.id = Number(options.id);
    this.applicationDescription = String(options.applicationDescription);
    this.applicationFormJson = options.applicationFormJson;
    this.applicationTitle = String(options.applicationTitle);
    this.applicationTypeId = Number(options.applicationTypeId);
    this.applicationAvailableEndDateTime = String(options.applicationAvailableEndDateTime);
    this.applicationAvailableStartDateTime = String(options.applicationAvailableStartDateTime);
    this.cancellationDateTime = String(options.cancellationDateTime);
    this.expirationDateTime = String(options.expirationDateTime);
    this.expireWhenAssigned = Number(options.expireWhenAssigned);
    this.numberOfDaysToExpire = Number(options.numberOfDaysToExpire);
    this.termId = Number(options.termId);
  }
}