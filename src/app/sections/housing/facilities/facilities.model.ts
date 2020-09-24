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
    public occupantKeys: number[] = [],
  ) {
  }
}

export class FacilityAttribute {
  constructor(public facilityAttributeKey: number,
              public facilityKey: number,
              public attributeConsumerKey: number,
              public value: string,
              public effectiveDate: Date,
              public endDate: Date) {
  }
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
  currentOccupancy: number; //currentOccupancyCount?
  attributes: FacilityAttribute[];
  occupantKeys: number[];

  constructor(options: FacilityDetailsOptions) {
    this.facilityKey = options.facilityKey;
    this.assetTypeKey = options.assetTypeKey;
    this.name = options.name;
    this.isTopLevel = options.isTopLevel;
    this.topLevelKey = options.topLevelKey;
    this.currentOccupancy = options.currentOccupancy;
    if (Array.isArray(options.attributes)) {
      this.attributes = options.attributes.map(x => new FacilityAttribute(x.facilityAttributeKey, x.facilityKey, x.attributeConsumerKey, x.value, x.effectiveDate, x.endDate));
    }
    this.occupantKeys = this.occupantKeys || [];
  }
}


export interface IMapper {
  map(items): any;
}

export class FacilityDetailsToFacilityMapper implements  IMapper{

  map(items: FacilityDetails[]): Facility[] {
    return items.map(x => new Facility(x.name, x.facilityKey,
      '2', '2', 3, 1990,
      'xyz', 'A', x.currentOccupancy,
      false, 'arrow-down', x.assetTypeKey,
      x.attributes, x.isTopLevel, x.topLevelKey, x.currentOccupancy,
      x.occupantKeys));
  }
}
