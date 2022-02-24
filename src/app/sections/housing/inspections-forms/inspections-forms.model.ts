import { isDefined } from '../utils';

export enum WorkOrdersFields {
  DESCRIPTION = "DESCRIPTION",
  TYPE = "TYPE",
  NOTIFY_BY_EMAIL = "NOTIFY_BY_EMAIL",
  LOCATION= "LOCATION",
  PHONE_NUMBER = "CONTACT_PHONE_NUMBER",
  EMAIL = "EMAIL",
  IMAGE ="IMAGE"
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
export interface FormInspectionOptions{
  formDefinition: FormDefinition;
  requirements: Requirements;
}
export class FormInspection implements FormInspectionOptions{
  formDefinition: FormDefinition;
  requirements: Requirements;
}

export interface ItemsOptions{
  comments: string;
  inventoryTemplateItemKey: number;
  name: string;
  residentConditionKey: number;
  residentInspectionItemKey: number;
  staffConditionKey: number;
  staffInspectionItemKey: number;
}
export class Items implements ItemsOptions{
  comments: string;
  inventoryTemplateItemKey: number;
  name: string;
  residentConditionKey: number;
  residentInspectionItemKey: number;
  staffConditionKey: number;
  staffInspectionItemKey: number;
  constructor(options : ItemsOptions){
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ItemsOptions;
    }
    this.comments = String(options.comments);
    this.inventoryTemplateItemKey = Number(options.inventoryTemplateItemKey);
    this.name = String(options.name);
    this.residentConditionKey = Number(options.residentConditionKey);
    this.residentInspectionItemKey = Number(options.residentInspectionItemKey);
    this.staffConditionKey = Number(options.staffConditionKey);
    this.staffInspectionItemKey = Number(options.staffInspectionItemKey);
  }

}
export interface InspectionSectionsOptions{
  items: Items[];
  name: string;
}

export class InspectionSections implements InspectionSectionsOptions{
  items: Items[];
  name: string;
  constructor(options: InspectionSectionsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as InspectionSectionsOptions;
    }
    this.items = Array.isArray(options.items)? options.items.map((details:any)=> new Items(details)):[];
    this.name = String(options.name);

  }
}
export interface InspectionOptions {
  contractElementKey: number;
  form: FormInspection;
  isSubmitted: boolean;
  residentInspectionKey: number;
  sections: InspectionSections[]
  staffInspectionKey: number;
}
export interface RequirementsOptions {
  formKey: number;
  numberOfDaysAfterCheckIn: number;
  afterTermSearchDays: number;
  beforeTermSearchDays: number;
}

export class Requirements implements RequirementsOptions{
  formKey: number;
  numberOfDaysAfterCheckIn: number;
  afterTermSearchDays: number;
  beforeTermSearchDays: number;
  constructor(options: RequirementsOptions){
    this.formKey = Number(options.formKey)
    this.numberOfDaysAfterCheckIn = Number(options.numberOfDaysAfterCheckIn)
    this.afterTermSearchDays = Number(options.afterTermSearchDays)
    this.beforeTermSearchDays = Number(options.beforeTermSearchDays)
  }
}

export class Inspection implements InspectionOptions{
  contractElementKey: number;
  form: FormInspection;
  isSubmitted: boolean;
  residentInspectionKey: number;
  sections: InspectionSections[];
  staffInspectionKey: number;
  constructor(options: InspectionOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as InspectionOptions;
    }
   this.contractElementKey = Number(options.contractElementKey)
   this.form = options.form;
   this.isSubmitted = Boolean(options.isSubmitted);
   this.residentInspectionKey = Number(options.residentInspectionKey);
   this.sections = Array.isArray(options.sections)
   ? options.sections.map((details:any)=> new InspectionSections(details)): [];
   this.staffInspectionKey = Number(options.staffInspectionKey);
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
