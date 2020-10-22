import { TestBed } from '@angular/core/testing';
import { generateFacilities } from './facilities.mock';
import { Facility } from '../facilities/facilities.model';

import { RoomsStateService } from './rooms-state.service';
import { Unit } from '@sections/housing/unit/unit.model';

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
    const parentKey: number = 9000487;
    const unitKey: number =  9000493;
    const facility = facilities.find(x => x.facilityId == unitKey);
    const EXPECTED_UNIT_DETAILS = new Unit({
      facilityKey: facility.facilityId,
      parentKey: facility.topLevelKey,
      title: `${facility.facilityName} \u{2014} Charles`,
      isFavorite: false,
      labels: facility.attributes.map(x => x.value),
      occupantKeys: facility.occupantKeys
    });
    service.createFacilityDictionary(facilities);

    let details: Unit = service.getUnitDetails(parentKey, unitKey);

    expect(details).toEqual(EXPECTED_UNIT_DETAILS)
    })
});
