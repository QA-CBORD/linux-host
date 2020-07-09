export class Facility {
  constructor(
    public facilityName: string,
    public facilityId: number,
    public bedCount: string,
    public bathCount: string,
    public floors: number,
    public builtYear: number,
    public campus: string,
    public parking: string,
    public availableUnits: number,
    public isExpanded: boolean = false,
    public iconName: string = 'arrow-down',
    public assetTypeKey: number = null,
    public attributes: FacilityAttribute[] = null,
    public isTopLevel: boolean = false,
    public topLevelKey: number = null,
    public currentOccupancy: number = 0,
    public occupancyKeys: number[] = [],
) {}
}
export class FacilityAttribute {
  constructor(public facilityAttributeKey: number,
              public facilityKey: number,
              public attributeConsumerKey: number,
              public value: string,
              public effectiveDate: Date,
              public endDate: Date) {}
}
export interface FacilityDetailsOptions {
  facilityKey: number;
  assetTypeKey: number;
  name: string;
  isTopLevel: boolean;
  topLevelKey: number;
  currentOccupancy: number //currentOccupancyCount?
  attributes: FacilityAttribute[];
  occupancyKeys: number[];
}

export class FacilityDetails {
  facilityKey: number;
  assetTypeKey: number;
  name: string;
  isTopLevel: boolean;
  topLevelKey: number;
  currentOccupancy: number //currentOccupancyCount?
  attributes: FacilityAttribute[];
  occupancyKeys: number[];
  constructor(options: FacilityDetailsOptions){}
}
