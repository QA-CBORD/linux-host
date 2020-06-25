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
  ) {}
}
export class FacilityAttribute { //can we use existing attriute dto?
  facilityAttributeKey: number;
  facilityKey: number;
  attributeConsumerKey: number;
  value: string;
  effectiveDate: Date;
  endDate: Date;
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
{
  "facilityKey": 0,
  "assetTypeKey": 0,
  "name": "string",
  "isTopLevel": true,
  "topLevelKey": 0,
  "currentOccupancy": 0,
  "attributes": [
    {
      "facilityAttributeKey": 0,
      "facilityKey": 0,
      "attributeConsumerKey": 0,
      "value": "string",
      "effectiveDate": "2020-06-24T19:31:28.843Z",
      "endDate": "2020-06-24T19:31:28.843Z"
    }
  ],
  "occupantKeys": [
    0
  ]