import { isDefined } from '../utils';

export enum WorkOrdersFields {
  DESCRIPTION = "DESCRIPTION",
  TYPE = "TYPE",
  NOTIFY_BY_EMAIL = "NOTIFY_BY_EMAIL",
  LOCATION = "LOCATION",
  PHONE_NUMBER = "CONTACT_PHONE_NUMBER",
  EMAIL = "EMAIL",
  IMAGE = "IMAGE"
}

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
export interface FormInspectionOptions {
  formDefinition: FormDefinition;
  requirements: Requirements;
}
export class FormInspection implements FormInspectionOptions {
  formDefinition: FormDefinition;
  requirements: Requirements;
}

export interface ItemsOptions {
  comments: string;
  inventoryTemplateItemKey: number;
  name: string;
  residentConditionKey: number;
  residentInspectionItemKey: number;
  staffConditionKey: number;
  staffInspectionItemKey: number;
}
export class Items implements ItemsOptions {
  comments: string;
  inventoryTemplateItemKey: number;
  name: string;
  residentConditionKey: number;
  residentInspectionItemKey: number | null;
  staffConditionKey: number;
  staffInspectionItemKey: number;
  constructor(options: ItemsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ItemsOptions;
    }
    this.comments = options.comments? String(options.comments): '';
    this.inventoryTemplateItemKey = Number(options.inventoryTemplateItemKey);
    this.name = String(options.name);
    this.residentConditionKey = Number(options.residentConditionKey);
    this.residentInspectionItemKey = options.residentInspectionItemKey? Number(options.residentInspectionItemKey): null;
    this.staffConditionKey = Number(options.staffConditionKey);
    this.staffInspectionItemKey = Number(options.staffInspectionItemKey);
  }

}
export interface InspectionSectionsOptions {
  items: Items[];
  name: string;
}

export class InspectionSections implements InspectionSectionsOptions {
  items: Items[];
  name: string;
  constructor(options: InspectionSectionsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as InspectionSectionsOptions;
    }
    this.items = Array.isArray(options.items) ? options.items.map((details: any) => new Items(details)) : [];
    this.name = String(options.name);

  }
}
export interface InspectionOptions {
  contractElementKey: number;
  formDefinition: FormDefinition;
  isSubmitted: boolean;
  residentInspectionKey: number;
  sections: InspectionSections[]
  staffInspectionKey: number;
  termKey: number;
  checkIn: boolean;
}
export interface RequirementsOptions {
  formKey: number;
  numberOfDaysAfterCheckIn: number;
  afterTermSearchDays: number;
  beforeTermSearchDays: number;
}

export class Requirements implements RequirementsOptions {
  formKey: number;
  numberOfDaysAfterCheckIn: number;
  afterTermSearchDays: number;
  beforeTermSearchDays: number;
  constructor(options: RequirementsOptions) {
    this.formKey = Number(options.formKey)
    this.numberOfDaysAfterCheckIn = Number(options.numberOfDaysAfterCheckIn)
    this.afterTermSearchDays = Number(options.afterTermSearchDays)
    this.beforeTermSearchDays = Number(options.beforeTermSearchDays)
  }
}

export class Inspection implements InspectionOptions {
  contractElementKey: number;
  formDefinition: FormDefinition;
  isSubmitted: boolean;
  residentInspectionKey: number | null;
  sections: InspectionSections[];
  staffInspectionKey: number;
  termKey: number;
  checkIn: boolean;
  constructor(options: InspectionOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as InspectionOptions;
    }
    this.contractElementKey = Number(options.contractElementKey)
    this.formDefinition = options.formDefinition;
    this.isSubmitted = Boolean(options.isSubmitted);
    this.residentInspectionKey = options.residentInspectionKey? Number(options.residentInspectionKey): null;
    this.termKey = Number(options.termKey)
    this.sections = Array.isArray(options.sections)
      ? options.sections.map((details: any) => new InspectionSections(details)) : [];
    this.staffInspectionKey = Number(options.staffInspectionKey);
    this.checkIn = Boolean(options.checkIn);
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

export class FormDefinition implements FormDefinitionOptions {
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


export interface InspectionsOptions {
  residentInspectionKey: number;
  staffInspectionKey: number;
  contractKey: number;
  isSubmitted: boolean;
  checkIn: boolean;
  scheduleDate: string;
  dueDate: string;
  inspectionDate: string;
  facilityLocation: string;
  formTitle: string;
  totalItems: number;
  remainingItems: number;
}

export class Inspections implements InspectionsOptions {
  residentInspectionKey: number;
  staffInspectionKey: number;
  contractKey: number;
  isSubmitted: boolean;
  checkIn: boolean;
  scheduleDate: string;
  dueDate: string;
  inspectionDate: string;
  facilityLocation: string;
  formTitle: string;
  totalItems: number;
  remainingItems: number;
  constructor(options: InspectionsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as InspectionsOptions;
    }
    this.residentInspectionKey = Number(options.residentInspectionKey);
    this.staffInspectionKey = Number(options.staffInspectionKey);
    this.contractKey = Number(options.contractKey);
    this.isSubmitted = Boolean(options.isSubmitted);
    this.checkIn = Boolean(options.checkIn);
    this.scheduleDate = String(options.scheduleDate);
    this.dueDate = String(options.dueDate);
    this.inspectionDate = String(options.inspectionDate);
    this.facilityLocation = String(options.facilityLocation);
    this.formTitle = String(options.formTitle);
    this.totalItems = Number(options.totalItems);
    this.remainingItems = Number(options.remainingItems);
  }
}


export interface InspectionsDataOptions{
  data: Inspections[]
}
export class InspectionsData implements InspectionsDataOptions {
  data : Inspections[];
  constructor(options: InspectionsDataOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as InspectionsDataOptions;
    }
    this.data = Array.isArray(options) ? options.map((detail: any) => new Inspections(detail)): [];
  }
}