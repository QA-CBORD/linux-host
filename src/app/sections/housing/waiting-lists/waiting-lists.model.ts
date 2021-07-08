import { PatronAttribute } from '@sections/housing/applications/applications.model';

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
  attributes: any[];
  waitListKey: number;
  formDefinition: any;
}

export class WaitingListDetails implements WaitingListDetailstOptions{
  facilities: any[];
  attributes: any[];
  formDefinition: any;
  waitListKey: number;
  constructor(options: WaitingListDetailstOptions){
    if (options == null || typeof options !== 'object') {
      options = {} as WaitingListDetailstOptions;
    }
    this.formDefinition = options.formDefinition;
    this.attributes = options.attributes;
    this.facilities = options.facilities;
    this.waitListKey = options.waitListKey;
  }
}

export interface WaitingListDetailstOptionsRequest {
  facilityKey: number;
  waitListKey: number;
  attributeValue: String;
}

export class WaitingListDetailsRequest implements WaitingListDetailstOptionsRequest{
  facilityKey: number;
  waitListKey: number;
  attributeValue: String;
  constructor(options: WaitingListDetailstOptionsRequest){
    if (options == null || typeof options !== 'object') {
      options = {} as WaitingListDetailstOptionsRequest;
    }
    this.facilityKey = options.facilityKey;
    this.waitListKey = options.waitListKey;
    this.attributeValue = options.attributeValue;
  }
}
