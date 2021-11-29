import { isDefined } from '../utils';
export interface WorkOrdersFormsOptions {
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

export class WorkOrder implements WorkOrdersFormsOptions{
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

  constructor(options: WorkOrdersFormsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as WorkOrdersFormsOptions;
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