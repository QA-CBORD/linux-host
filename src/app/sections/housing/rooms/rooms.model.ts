import { isDefined } from '../utils';

export interface RoomSelectOptions{
    key: number;
    name: string;
}

export class RoomSelect implements RoomSelectOptions{
    key: number;
    name: string;

    constructor(options: RoomSelectOptions){
        if (options == null || typeof options !== 'object') {
            options = {} as RoomSelectOptions;
          }

        this.key = options.key;
        this.name = options.name;
    }
}

export interface CreateContractRequestOptions {
  facilityKey: number;
  assetKey: number;
  facilityOrAsset: number;
  StartDate: Date;
  EndDate: Date;
}


export  class CreateContractRequest implements  CreateContractRequestOptions {

  EndDate: Date;
  StartDate: Date;
  assetKey: number;
  facilityKey: number;
  facilityOrAsset: number;

  constructor(options: CreateContractRequestOptions) {
    if(!isDefined(options) || typeof options !== 'object')  {
      options = {} as CreateContractRequestOptions;
    }
    this.assetKey = options.assetKey;
    this.facilityKey = options.facilityKey;
    this.facilityOrAsset = options.facilityOrAsset;
    this.StartDate = options.StartDate;
    this.EndDate = options.EndDate;
  }
}
