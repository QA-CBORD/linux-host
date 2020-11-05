import { inject, TestBed } from '@angular/core/testing';

import { RoomsService } from './rooms.service';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { RoomsStateServiceMock } from '@sections/housing/rooms/mocks/rooms-state.service.mock';
import { Category } from '@sections/housing/search-filter/filter-sort/filter-sort.model';

describe('RoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RoomsService, {
      provide: RoomsStateService, useClass: RoomsStateServiceMock
    }]
  }));

  it('should be created', () => {
    const service: RoomsService = TestBed.get(RoomsService);
    expect(service).toBeTruthy();
  });

  it('should get categories for the filter', inject([RoomsService, RoomsStateService],(service: RoomsService, stateService: RoomsStateServiceMock) => {
    //order is important for test to pass
    const EXPECTED_CATEGORIES: Category[] = [
      new Category("Buildings",null),
      new Category("Facility Max Legal Occupancy",2317),
      new Category("Facility Assignment_Level",2312),
      new Category("Facility Smoking",2302),
      new Category("Facility Assignment_Limit",2308),
      new Category("Facility Gender",2306 ),
    ];
    expect(service.getFilterCategories()).toEqual(EXPECTED_CATEGORIES);

  }))
});
