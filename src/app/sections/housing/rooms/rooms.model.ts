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
  isFacility: boolean;
  isAssetType: boolean;
  termKey: number;
  startDate: Date;
  endDate: Date;
}


export  class CreateContractRequest implements  CreateContractRequestOptions {

  endDate: Date;
  startDate: Date;
  assetKey: number;
  facilityKey: number;
  isFacility: boolean;
  isAssetType: boolean;
  termKey: number;

  constructor(options: CreateContractRequestOptions) {
    if(!isDefined(options) || typeof options !== 'object')  {
      options = {} as CreateContractRequestOptions;
    }
    this.assetKey = options.assetKey;
    this.facilityKey = options.facilityKey;
    this.isFacility = options.isFacility;
    this.isAssetType = options.isAssetType;
    this.startDate = options.startDate;
    this.endDate = options.endDate;
    this.termKey = options.termKey;
  }
}
