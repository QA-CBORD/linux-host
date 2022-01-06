import { isDefined } from '../utils';


export interface ImageDataOptions {
  comments: string;
  contents: string;
  filename: string;
  studentSubmitted: boolean;
}

export class ImageData implements ImageDataOptions {
  comments: string;
  contents: string;
  filename: string;
  studentSubmitted: boolean;
  constructor(options: ImageDataOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ImageDataOptions;
    }
    this.comments = String(options.comments);
    this.contents = String(options.contents);
    this.filename = String(options.filename);
    this.studentSubmitted = Boolean(options.studentSubmitted);
  }
}
export interface WorkOrdersDetailsListOptions {
  typeKey: number;
  description: string;
  attachment?: ImageData;
  facilityKey: number;
  notificationEmail: string;
  notificationPhone: string;
  notify: boolean;
}
export class WorkOrdersDetailsList implements WorkOrdersDetailsListOptions {
  attachment?: ImageData;
  facilityKey: number;
  notificationEmail: string;
  notificationPhone: string;
  notify: boolean;
  typeKey: number;
  description: string;
  constructor(options: WorkOrdersDetailsListOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as WorkOrdersDetailsListOptions;
    }
    this.typeKey = Number(options.typeKey);
    this.description = String(options.description);
    this.attachment = options.attachment;
    this.notificationEmail = String(options.notificationEmail);
    this.notificationPhone = String(options.notificationPhone);
    this.notify = Boolean(options.notify);
    this.facilityKey = Number(options.facilityKey);

  }
}
export interface WorkOrderOptions {
  canSubmit: boolean,
  workOrders: WorkOrdersDetailsList[],
}

export class WorkOrder implements WorkOrderOptions{
  canSubmit: boolean;
  workOrders: WorkOrdersDetailsList[];
  constructor(options: WorkOrderOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as WorkOrderOptions;
    }
    this.canSubmit = Boolean(options.canSubmit)
    this.workOrders = Array.isArray(options.workOrders)
      ? options.workOrders.map((detail: any) => new WorkOrdersDetailsList(detail))
      : [];
  }
  
}
export interface WorkOrderDetailsOptions {
  workOrderKey: number,
  workOrders: WorkOrdersDetailsList,
  formDefinition: FormDefinitionOptions,
  workOrderTypes: workOrderTypesOptions[]
}

export interface workOrderTypesOptions{
  key: number,
  name: string
}

export class workOrderTypes implements workOrderTypesOptions{
  key: number;
  name: string;
  constructor(options: workOrderTypesOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as workOrderTypesOptions;
    }
    this.key = Number(options.key)
    this.name = String(options.name);
  }
}
export class WorkOrderDetails implements WorkOrderDetailsOptions{
  workOrderKey: number;
  workOrders: WorkOrdersDetailsList;
  formDefinition: FormDefinitionOptions;
  workOrderTypes: workOrderTypes[];
  constructor(options: WorkOrderDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as WorkOrderDetailsOptions;
    }
    this.workOrderKey = Number(options.workOrderKey)
    this.workOrders = options.workOrders;
    this.formDefinition = options.formDefinition;
    this.workOrderTypes = Array.isArray(options.workOrderTypes)
    ? options.workOrderTypes.map((detail: any) => new workOrderTypes(detail))
    : [];
  }

}
export interface FormDefinitionOptions {
  id: number;
  applicationDescription: string;
  applicationFormJson: string;
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

export class FormDefinition implements FormDefinitionOptions{
  id: number;
  applicationDescription: string;
  applicationFormJson: string;
  applicationTitle: string;
  applicationTypeId: number;
  applicationAvailableEndDateTime: string;
  applicationAvailableStartDateTime: string;
  cancellationDateTime: string;
  expirationDateTime: string;
  expireWhenAssigned: number;
  numberOfDaysToExpire: number;
  termId: number

  constructor(options: FormDefinitionOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as FormDefinitionOptions;
    }
    this.id = Number(options.id);
    this.applicationDescription = String(options.applicationDescription);
    this.applicationFormJson = String(options.applicationFormJson);
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