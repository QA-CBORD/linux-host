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
    public attributes: FacilityAttribute[] = null,
    public isTopLevel: boolean = false,
    public topLevelKey: number = null,
    public occupantKeys: number[] = [],
    public topLevelName: string = '',
  ) {
  }

  public hasAttribute(name: string): boolean {
    if (this.attributes && this.attributes.length > 0) {
      return !!this.attributes.find(x => x.name === name);
    }
  }

  public getAttributeValue(attribute: string): FacilityAttribute {
    if (this.hasAttribute(attribute)) {
      return this.attributes.find(x => x.name === attribute);
    }
  }
}

export class FacilityAttribute {
  constructor(public facilityAttributeKey: number,
              public facilityKey: number,
              public attributeConsumerKey: number,
              public value: string,
              public name: string,
              public effectiveDate: Date,
              public endDate: Date) {
  }
}

export interface FacilityDetailsOptions {
  facilityKey: number;
  name: string;
  isTopLevel: boolean;
  topLevelKey: number;
  attributes: FacilityAttribute[];
  occupantKeys: number[];
}

export class FacilityDetails {
  facilityKey: number;
  name: string;
  isTopLevel: boolean;
  topLevelKey: number;
  attributes: FacilityAttribute[];
  occupantKeys: number[];

  constructor(options: FacilityDetailsOptions) {
    this.facilityKey = options.facilityKey;
    this.name = options.name;
    this.isTopLevel = options.isTopLevel;
    this.topLevelKey = options.topLevelKey;
    if (Array.isArray(options.attributes)) {
      this.attributes = options.attributes.map(x => new FacilityAttribute(x.facilityAttributeKey, x.facilityKey,
        x.attributeConsumerKey, x.value,x.name , x.effectiveDate, x.endDate));
    }
    this.occupantKeys = options.occupantKeys || [];
  }
}


export interface IMapper {
  map(items): object;
}

export class FacilityDetailsToFacilityMapper implements  IMapper{

  map(items: FacilityDetails[]): Facility[] {
    return items.map(x => new Facility(x.name, x.facilityKey,
      '2', '2', 3, 1990,
      'xyz', 'A', 4,false,
      'arrow-down', x.attributes, x.isTopLevel,
      x.topLevelKey, x.occupantKeys));
  }
}
