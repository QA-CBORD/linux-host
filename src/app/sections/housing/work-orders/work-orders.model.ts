import { isDefined } from '../utils';

export enum WorkOrdersFields {
  DESCRIPTION = "DESCRIPTION",
  TYPE = "TYPE",
  NOTIFY_BY_EMAIL = "NOTIFY_BY_EMAIL",
  LOCATION= "LOCATION",
  PHONE_NUMBER = "CONTACT_PHONE_NUMBER",
  EMAIL = "EMAIL",
  IMAGE ="IMAGE",
  FACILITY = "FACILITY",
}

export interface ImageDataOptions {
  comments: string;
  contents: string;
  filename: string;
  studentSubmitted: boolean;
  workOrderKey: number;
  photoUrl?: string;
}

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}

export class ImageData implements ImageDataOptions {
  comments: string;
  contents: string;
  filename: string;
  studentSubmitted: boolean;
  workOrderKey: number;
  photoUrl?: string;
  constructor(options: ImageDataOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ImageDataOptions;
    }
    this.comments = String(options.comments);
    this.contents = String(options.contents);
    this.filename = String(options.filename);
    this.studentSubmitted = Boolean(options.studentSubmitted);
    this.workOrderKey = Number(options.workOrderKey);
  }
}
export interface WorkOrdersDetailsListOptions {
  key:number;
  typeKey: number;
  description: string;
  attachment?: ImageData;
  facilityKey: number;
  notificationEmail: string;
  notificationPhone: string;
  notify: boolean;
  requestedDate?: string;
  status?: string;
  statusKey?: number;
  type?: string;
}
export class WorkOrdersDetailsList implements WorkOrdersDetailsListOptions {
  key: number;
  attachment?: ImageData;
  facilityKey: number;
  notificationEmail: string;
  notificationPhone: string;
  notify: boolean;
  typeKey: number;
  description: string;
  requestedDate?: string;
  status?: string;
  statusKey?: number;
  type?: string;
  constructor(options: WorkOrdersDetailsListOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as WorkOrdersDetailsListOptions;
    }
    this.key = Number(options.key);
    this.typeKey = Number(options.typeKey);
    this.description = String(options.description);
    this.attachment = options.attachment;
    this.notificationEmail = String(options.notificationEmail);
    this.notificationPhone = String(options.notificationPhone);
    this.notify = Boolean(options.notify);
    this.facilityKey = Number(options.facilityKey);
    this.requestedDate = String(options.requestedDate);
    this.status = String(options.status);
    this.statusKey = Number(options.statusKey);
    this.type = String(options.type);
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
      ? options.workOrders.map((detail) => new WorkOrdersDetailsList(detail))
      : [];
  }

}
export interface WorkOrderDetailsOptions {
  workOrderKey: number,
  workOrderDetails: WorkOrdersDetailsList,
  formDefinition: FormDefinitionOptions,
  workOrderTypes: workOrderTypesOptions[],
  facilityTree: FacilityTreeOptions[]
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
  workOrderDetails: WorkOrdersDetailsList;
  formDefinition: FormDefinitionOptions;
  workOrderTypes: workOrderTypes[];
  facilityTree: FacilityTree[];
  constructor(options: WorkOrderDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as WorkOrderDetailsOptions;
    }
    this.workOrderKey = Number(options.workOrderKey)
    this.workOrderDetails = options.workOrderDetails;
    this.formDefinition = options.formDefinition;
    this.workOrderTypes = Array.isArray(options.workOrderTypes)
    ? options.workOrderTypes.map((detail) => new workOrderTypes(detail))
    : [];
    this.facilityTree = Array.isArray(options.facilityTree)
    ? options.facilityTree.map((detail) => new FacilityTree(detail))
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

export interface FacilityTreeOptions {
  facilityTree: FacilityTreeDetails[]
}
export interface FacilityTreeDetailsOptions {
  children: FacilityTreeDetailsOptions[],
  effectiveDate: string,
  endDate: string,
  facilityFullName: string,
  facilityKey: number,
  facilityType: number,
  parentKey: number,
}
export class FacilityTreeDetails implements FacilityTreeDetailsOptions{
  children: FacilityTreeDetailsOptions[];
  effectiveDate: string;
  endDate: string;
  facilityFullName: string;
  facilityKey: number;
  facilityType: number;
  parentKey: number;
  constructor(options: FacilityTreeDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as FacilityTreeDetailsOptions;
    }
    this.effectiveDate = String(options.effectiveDate);
    this.endDate = String(options.endDate);
    this.facilityFullName = options.facilityFullName;
    this.facilityKey = Number(options.facilityKey);
    this.facilityKey = Number(options.facilityKey);
    this.parentKey = Number(options.parentKey);
    this.facilityType = Number(options.facilityType);
    this.children = Array.isArray(options.parentKey)
    ? options.children.map((detail) => new FacilityTreeDetails(detail))
    : [];
  }

}

export class FacilityTree implements FacilityTreeOptions{
  facilityTree: FacilityTreeDetails[];
  facilityFullName?: string;
  constructor(options: FacilityTreeOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as FacilityTreeOptions;
    }
    this.facilityTree = Array.isArray(options.facilityTree)
    ? options.facilityTree.map((detail) => new FacilityTreeDetails(detail))
    : [];
  }
}


export class Identity {
  public id?: number;
  public creationTime?: string;
  public lastModificationTime?: string;
}

export class NamedIdentity {
  public id?: number;
  public name?: string;
  public facilityFullName?: string;
  public facilityKey?: number;
}

export enum SortOrder {
  ById = 0,
  Alphabetical = 1
}

export interface LookUpItemRaw extends NamedIdentity, Identity {
  parent_id?: number;
}

export interface LookUpItem extends NamedIdentity {
  parentId?: number;
  parentKey?: number;
  children: LookUpItem[];
}

export interface SlideItem extends NamedIdentity {
  parentId: number;
  nextSlideIndex: number;
  selected?: boolean;
  slide: Slide;
  lookUpItem: LookUpItem;
}

export interface Slide {
  parentSlideItem: SlideItem;
  parentSlide: Slide;
  slideIndex: number;
  items: SlideItem[];
}