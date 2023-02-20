import { isDefined } from "../utils";

export interface CheckInOutOptions {
  name: string;
  availableStartDate: Date;
  availableEndDate: Date;
  key: number;
  type: number;
  selectedFacilityName?: string;
  selectedSpotDateTime?: Date;
}

export class CheckInOut implements CheckInOutOptions {
    name: string;
    availableStartDate: Date;
    availableEndDate: Date;
    key: number;
    type: number;
    selectedFacilityName?: string;
    selectedSpotDateTime?: Date;
  
    constructor(options) {
      if (options == null || typeof options !== 'object') {
        options = {} as CheckInOutOptions;
      }
  
      this.name = String(options.name);
      this.availableStartDate = new Date(options.availableStartDateTime);
      this.availableEndDate = new Date(options.availableEndDateTime);
      this.key = Number(options.checkInOutKey);
      this.type = Number(options.checkInOutType);
      this.selectedFacilityName = isDefined(options.selectedFacilityName) ?
        String(options.selectedFacilityName) : null;
      this.selectedSpotDateTime = isDefined(options.selectedSpotDateTime) ?
        new Date(options.selectedSpotDateTime) : null;
    }
}

export interface CheckInOutSlotOptions {
  checkInOutKey: number;
  slotDateTime: Date;
}

export class CheckInOutSlot implements CheckInOutSlotOptions {
  checkInOutKey: number;
  slotDateTime: Date;

  constructor(options: CheckInOutSlotOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as CheckInOutSlotOptions;
    }

    this.checkInOutKey = Number(options.checkInOutKey);
    this.slotDateTime = new Date(options.slotDateTime);
  }
}

export interface CheckInOutSpotOptions {
  slotDateTime: Date;
  spots: CheckInOutSlot[];
}

export class CheckInOutSpot implements CheckInOutSpotOptions {
  slotDateTime: Date;
  spots: CheckInOutSlot[];

  constructor(options: CheckInOutSpotOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as CheckInOutSpotOptions;
    }

    this.slotDateTime = new Date(options.slotDateTime);
    if (Array.isArray(options.spots)) {
      this.spots = options.spots.map(spot => new CheckInOutSlot(spot));
    }
  }
}