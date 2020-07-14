import { TestBed } from '@angular/core/testing';
import { generateFacilities } from './facilities.mock';
import { Facility } from '../facilities/facilities.model';

import { RoomsStateService } from './rooms-state.service';

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
});
