import { TestBed } from '@angular/core/testing';
import { generateFacilities, generateOccupantDetails } from './mocks/facilities.mock';
import { Facility } from '../facilities/facilities.model';

import { RoomsStateService } from './rooms-state.service';
import { Unit } from '@sections/housing/unit/unit.model';
import { generateRoomSelects } from './mocks/rooms.mock';
import { RoomSelect } from '@sections/housing/rooms/rooms.model';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roomate.model';
import { OccupantAttribute } from '@sections/housing/attributes/attributes.model';

describe('RoomsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomsStateService = TestBed.get(RoomsStateService);
    expect(service).toBeTruthy();
  });
  it('should create parent facilities', () => {
    let facilities: Facility[] = generateFacilities();
    const service: RoomsStateService = TestBed.get(RoomsStateService);
    service.storeParentFacilities(facilities);
    const parents = service.getParentFacilities();
    expect(parents.length).toBeGreaterThan(0);
  });
  it('should create facility dictionary', () => {
    let facilities: Facility[] = generateFacilities();
    const service: RoomsStateService = TestBed.get(RoomsStateService);
    service.createFacilityDictionary(facilities);
    const childrenFacilities = service.getParentFacilityChildren(9000485);
    expect(childrenFacilities.length).toEqual(4);
  });
  it('should get unit representation of facility', () => {
    let facilities: Facility[] = generateFacilities();
    const service: RoomsStateService = TestBed.get(RoomsStateService);
    const parentKey: number = 9000316;
    const unitKey: number =  9000639;
    const facility = facilities.find(x => x.facilityId == unitKey);
    const EXPECTED_UNIT_DETAILS = new Unit({
      facilityKey: facility.facilityId,
      parentKey: facility.topLevelKey,
      title: `${facility.facilityName} \u{2014} Anderson Hall`,
      isFavorite: false,
      labels: facility.attributes.map(x => x.value),
      attributes: facility.attributes,
      occupantKeys: facility.occupantKeys
    });
    service.createFacilityDictionary(facilities);

    let details: Unit = service.getUnitDetails(parentKey, unitKey);

    expect(details).toEqual(EXPECTED_UNIT_DETAILS)
    })

  // test setting active roomSelect
  it('should update the active roomSelection', () => {
    const service:RoomsStateService = TestBed.get(RoomsStateService);
    const EXPECTED_ROOM_SELECT: RoomSelect = {
      key: 3,
      name: 'Mocked RoomSelect 2'
    };

    service.setRoomSelects(generateRoomSelects());
    service.setActiveRoomSelect(3);

    const roomSelect = service.getActiveRoomSelect();

    expect(roomSelect).toEqual(EXPECTED_ROOM_SELECT);

  })

  it('should return all occupant attributes and values', function() {
    const service: RoomsStateService = TestBed.get(RoomsStateService);
    const EXPECTED_ATTRIBUTES: OccupantAttribute[] = [
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
    service.createFacilityDictionary(generateFacilities());
    const occupants: FacilityOccupantDetails[] = generateOccupantDetails()
    service.setOccupantDetails(occupants);

    expect(service.getAllOccupantAttributes()).toEqual(EXPECTED_ATTRIBUTES);

  });
});
