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
      console.log('hello');

      expect(service.getFilterCategories).toEqual(23);

    }))
});
