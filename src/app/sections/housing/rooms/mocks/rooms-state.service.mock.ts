import { StateService } from '@sections/housing/rooms/rooms-state.service';
import {
  Facility,
  FacilityAttribute,
  FacilityDetailsToFacilityMapper,
} from '@sections/housing/facilities/facilities.model';
import { OccupantAttribute } from '@sections/housing/attributes/attributes.model';
import { BehaviorSubject } from 'rxjs';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roommate.model';

export class RoomsStateServiceMock implements StateService<number, Facility[]>{

  private _parentFacilities: Facility[] = [
    new Facility("Able", 9000485,"","",2,null,
      "","", 2, false, 'arrow-down',[
        new FacilityAttribute(0,9000485, 2317, "0",
          "Max Legal Occupancy", new Date ("0001-01-01T00:00:00"), null),
        new FacilityAttribute(9028000,9000485, 2308, "2",
          "Assignment_Limit", new Date ("0001-01-01T00:00:00"), null),
        new FacilityAttribute(9027451,9000485, 2312, "Below",
          "Assignment_Level", new Date ("0001-01-01T00:00:00"), null),
        new FacilityAttribute(9030649,9000485, 2302, "No",
          "Smoking", new Date ("0001-01-01T00:00:00"), null)
      ],true,9000485,[])
  ];
  entityDictionary: Map<number, Facility[]> = new Map<number, Facility[]>([
      [9000485, RoomsStateServiceMock.getFacilitiesData() ]
    ]
  )
  private _activeFilterFacilities: Facility[] = null;
  private _activeFacilities$: BehaviorSubject<Facility[]> = new BehaviorSubject<Facility[]>([]);
  private _occupantDictionary: Map<number, FacilityOccupantDetails[]>;


  getActiveFilterFacilities(): Facility[] {
    return this._activeFilterFacilities.map(x => new Facility(x.facilityName,x.facilityId, x.bedCount,
      x.bathCount, x.floors, x.builtYear, x.campus, x.parking, x.availableUnits, x.isExpanded, 'arrow-down',
      x.attributes.map(y => new FacilityAttribute(y.facilityAttributeKey, y.facilityKey, y.attributeConsumerKey,
        y.value, y.name, y.effectiveDate, y.endDate)), x.isTopLevel, x.topLevelKey, x.occupantKeys));
  }

  updateActiveFilterFacilities(facilities: Facility[]) {
    this._activeFilterFacilities = facilities;
  }

  getOccupantDetails(facilityKey: number): FacilityOccupantDetails[] {
    return  this._occupantDictionary.get(facilityKey);
  }

  public getAllFacilityChildren(): Facility[] {
    return  RoomsStateServiceMock.getFacilitiesData() as Facility[];
}

  private static getFacilitiesData(): Facility[] {
    const facilities = [
      {
        "facilityKey": 9000324,
        "name": "205",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000324,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025019,
            "facilityKey": 9000324,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025024,
            "facilityKey": 9000324,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          },
          {
            "facilityAttributeKey": 9033132,
            "facilityKey": 9000324,
            "attributeConsumerKey": 2308,
            "value": "1",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000761,
        "name": "105",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000761,
            "attributeConsumerKey": 2317,
            "value": "0",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9033149,
            "facilityKey": 9000761,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9033151,
            "facilityKey": 9000761,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9033157,
            "facilityKey": 9000761,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000762,
        "name": "106",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000762,
            "attributeConsumerKey": 2317,
            "value": "0",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9033159,
            "facilityKey": 9000762,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9033161,
            "facilityKey": 9000762,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9033165,
            "facilityKey": 9000762,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000763,
        "name": "107",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000763,
            "attributeConsumerKey": 2317,
            "value": "0",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9033167,
            "facilityKey": 9000763,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9033169,
            "facilityKey": 9000763,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9033173,
            "facilityKey": 9000763,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000764,
        "name": "108",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000764,
            "attributeConsumerKey": 2317,
            "value": "0",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9033175,
            "facilityKey": 9000764,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9033177,
            "facilityKey": 9000764,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9033181,
            "facilityKey": 9000764,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000765,
        "name": "109",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000765,
            "attributeConsumerKey": 2317,
            "value": "0",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9033183,
            "facilityKey": 9000765,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9033185,
            "facilityKey": 9000765,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9033189,
            "facilityKey": 9000765,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000766,
        "name": "110",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000766,
            "attributeConsumerKey": 2317,
            "value": "0",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9033191,
            "facilityKey": 9000766,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9033193,
            "facilityKey": 9000766,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9033197,
            "facilityKey": 9000766,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000767,
        "name": "111",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000767,
            "attributeConsumerKey": 2317,
            "value": "0",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9033199,
            "facilityKey": 9000767,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9033201,
            "facilityKey": 9000767,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9033205,
            "facilityKey": 9000767,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000768,
        "name": "112",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000768,
            "attributeConsumerKey": 2317,
            "value": "0",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9033207,
            "facilityKey": 9000768,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9033209,
            "facilityKey": 9000768,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9033213,
            "facilityKey": 9000768,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000325,
        "name": "207",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000325,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025031,
            "facilityKey": 9000325,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025036,
            "facilityKey": 9000325,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          },
          {
            "facilityAttributeKey": 9030172,
            "facilityKey": 9000325,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000323,
        "name": "204",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000323,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025007,
            "facilityKey": 9000323,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025012,
            "facilityKey": 9000323,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          },
          {
            "facilityAttributeKey": 9030173,
            "facilityKey": 9000323,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000321,
        "name": "202",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000321,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9024983,
            "facilityKey": 9000321,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9024988,
            "facilityKey": 9000321,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          },
          {
            "facilityAttributeKey": 9033021,
            "facilityKey": 9000321,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000485,
        "name": "Able",
        "isTopLevel": true,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000485,
            "attributeConsumerKey": 2317,
            "value": "0",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9028000,
            "facilityKey": 9000485,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9027451,
            "facilityKey": 9000485,
            "attributeConsumerKey": 2312,
            "value": "Below",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9030649,
            "facilityKey": 9000485,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000326,
        "name": "208",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000326,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025043,
            "facilityKey": 9000326,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025045,
            "facilityKey": 9000326,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025048,
            "facilityKey": 9000326,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000322,
        "name": "203",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000322,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9024995,
            "facilityKey": 9000322,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025000,
            "facilityKey": 9000322,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          },
          {
            "facilityAttributeKey": 9033013,
            "facilityKey": 9000322,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000330,
        "name": "213",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000330,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025091,
            "facilityKey": 9000330,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025093,
            "facilityKey": 9000330,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025096,
            "facilityKey": 9000330,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000327,
        "name": "209",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000327,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025055,
            "facilityKey": 9000327,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025057,
            "facilityKey": 9000327,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025060,
            "facilityKey": 9000327,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000328,
        "name": "210",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000328,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025067,
            "facilityKey": 9000328,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025069,
            "facilityKey": 9000328,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025072,
            "facilityKey": 9000328,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000329,
        "name": "212",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000329,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025079,
            "facilityKey": 9000329,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025081,
            "facilityKey": 9000329,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025084,
            "facilityKey": 9000329,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000331,
        "name": "214",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000331,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025103,
            "facilityKey": 9000331,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025105,
            "facilityKey": 9000331,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025108,
            "facilityKey": 9000331,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000332,
        "name": "215",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000332,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025115,
            "facilityKey": 9000332,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025117,
            "facilityKey": 9000332,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025120,
            "facilityKey": 9000332,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000333,
        "name": "217",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000333,
            "attributeConsumerKey": 2317,
            "value": "3",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025127,
            "facilityKey": 9000333,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025129,
            "facilityKey": 9000333,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025132,
            "facilityKey": 9000333,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          },
          {
            "facilityAttributeKey": 9030343,
            "facilityKey": 9000333,
            "attributeConsumerKey": 2306,
            "value": "Female",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Gender"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000334,
        "name": "218",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000334,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025139,
            "facilityKey": 9000334,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025141,
            "facilityKey": 9000334,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025144,
            "facilityKey": 9000334,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          },
          {
            "facilityAttributeKey": 9030342,
            "facilityKey": 9000334,
            "attributeConsumerKey": 2306,
            "value": "Female",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Gender"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000335,
        "name": "219",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000335,
            "attributeConsumerKey": 2317,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025151,
            "facilityKey": 9000335,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025153,
            "facilityKey": 9000335,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025156,
            "facilityKey": 9000335,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000336,
        "name": "352-354",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000336,
            "attributeConsumerKey": 2317,
            "value": "6",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025162,
            "facilityKey": 9000336,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025163,
            "facilityKey": 9000336,
            "attributeConsumerKey": 2308,
            "value": "4",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025166,
            "facilityKey": 9000336,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000338,
        "name": "356",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000338,
            "attributeConsumerKey": 2317,
            "value": "3",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025180,
            "facilityKey": 9000338,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025182,
            "facilityKey": 9000338,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025185,
            "facilityKey": 9000338,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000339,
        "name": "358",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000339,
            "attributeConsumerKey": 2317,
            "value": "3",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025192,
            "facilityKey": 9000339,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025194,
            "facilityKey": 9000339,
            "attributeConsumerKey": 2308,
            "value": "2",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025197,
            "facilityKey": 9000339,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      },
      {
        "facilityKey": 9000340,
        "name": "360-362",
        "isTopLevel": false,
        "topLevelKey": 9000485,
        "attributes": [
          {
            "facilityAttributeKey": 0,
            "facilityKey": 9000340,
            "attributeConsumerKey": 2317,
            "value": "6",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Max Legal Occupancy"
          },
          {
            "facilityAttributeKey": 9025203,
            "facilityKey": 9000340,
            "attributeConsumerKey": 2312,
            "value": "This",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Level"
          },
          {
            "facilityAttributeKey": 9025205,
            "facilityKey": 9000340,
            "attributeConsumerKey": 2308,
            "value": "4",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Assignment_Limit"
          },
          {
            "facilityAttributeKey": 9025208,
            "facilityKey": 9000340,
            "attributeConsumerKey": 2302,
            "value": "No",
            "effectiveDate": new Date ("0001-01-01T00:00:00"),
            "endDate": null,
            "name": "Smoking"
          }
        ],
        "occupantKeys": []
      }
    ];
    const mapper = new FacilityDetailsToFacilityMapper()
    return mapper.map(facilities);
  }
  public getParentFacilities(): Facility[] {
    return this._parentFacilities;
  }

  public getParentFacilityChildren(parentKey: number): Facility[] {
    return this.entityDictionary.get(parentKey);
  }

  public getAllOccupantAttributes(): OccupantAttribute[] {
    return [
      new OccupantAttribute({
        attributeConsumerKey: 2384,
        value: "test 1",
        name: "gender"
      }),
      new OccupantAttribute({
        attributeConsumerKey: 2387,
        value: "test 2",
        name: "age"
      }),
      new OccupantAttribute({
        attributeConsumerKey: 2381,
        value: "yes",
        name: "smoking"
      }),
      new OccupantAttribute({
        attributeConsumerKey: 2384,
        value: "test 22",
        name: "gender"
      }),
      new OccupantAttribute({
        attributeConsumerKey: 2387,
        value: "test 44",
        name: "age"
      }),
      new OccupantAttribute({
        attributeConsumerKey: 2381,
        value: "no",
        name: "smoking"
      })
    ];
  }
}
