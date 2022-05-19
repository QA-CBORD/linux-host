import { PatronAttribute } from '@sections/housing/applications/applications.model';
import { isDefined } from '../utils';

export interface WaitingListOptions {
  termKey: string;
  waitListKey: number;
  waitListName: string;
  patronWaitingListKey?: number;
  formName: string;
  dateAdded?: Date;
}


export class WaitingList implements WaitingListOptions{
  termKey: string;
  waitListKey: number;
  waitListName: string;
  patronWaitingListKey?: number;
  formName: string;
  dateAdded?: Date;

  constructor(options: WaitingListOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as WaitingListOptions;
    }

    this.termKey = String(options.termKey);
    this.waitListKey = Number(options.waitListKey);
    this.waitListName = String(options.waitListName);
    this.patronWaitingListKey = Number(options.patronWaitingListKey)
    this.formName = String(options.formName);
    this.dateAdded = options.dateAdded ? new Date(options.dateAdded) : null;
  }
}

export interface WaitingListDetailstOptions {
  facilities: any[];
  attributes: PatronAttribute[];
  patronAttributes: PatronAttribute[];
  waitListKey: number;
  formDefinition: any;
  patronWaitingList?: PatronWaitingList;
}

export interface PatronWaitingListOptions {
  patronWaitingListKey: number;
  selectedValue?: string;
}

export class PatronWaitingList implements PatronWaitingListOptions {
  patronWaitingListKey: number;
  selectedValue?: string;

  constructor(options: PatronWaitingListOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as PatronWaitingListOptions;
    }

    if (isDefined(options.patronWaitingListKey)) {
      this.patronWaitingListKey = Number(options.patronWaitingListKey);
    }

    if (isDefined(options.selectedValue)) {
      this.selectedValue = String(options.selectedValue);
    }
  }
}

export class WaitingListDetails implements WaitingListDetailstOptions{
  facilities: any[];
  attributes: any[];
  patronAttributes: PatronAttribute[];
  formDefinition: any;
  waitListKey: number;
  patronWaitingList: PatronWaitingList;

  constructor(options: WaitingListDetailstOptions){
    if (options == null || typeof options !== 'object') {
      options = {} as WaitingListDetailstOptions;
    }

    this.formDefinition = options.formDefinition;
    this.attributes = Array.isArray(options.patronAttributes)
    ? options.patronAttributes.map((attribute: any) => new PatronAttribute(attribute))
    : [];
    
    this.facilities = options.facilities;
    this.waitListKey = options.waitListKey;
    this.patronAttributes = Array.isArray(options.patronAttributes)
    ? options.patronAttributes.map((attribute: any) => new PatronAttribute(attribute))
    : [];
    if (isDefined(options.patronWaitingList)) {
      this.patronWaitingList = new PatronWaitingList(options.patronWaitingList);
    }
  }
}

export interface WaitingListDetailstOptionsRequest {
  facilityKey: number;
  waitListKey: number;
  attributeValue: string;
}

export class WaitingListDetailsRequest implements WaitingListDetailstOptionsRequest{
  facilityKey: number;
  waitListKey: number;
  attributeValue: string;
  constructor(options: WaitingListDetailstOptionsRequest){
    if (options == null || typeof options !== 'object') {
      options = {} as WaitingListDetailstOptionsRequest;
    }
    this.facilityKey = options.facilityKey;
    this.waitListKey = options.waitListKey;
    this.attributeValue = options.attributeValue;
  }
}
