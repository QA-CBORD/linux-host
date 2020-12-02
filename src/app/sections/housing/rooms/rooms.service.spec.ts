import { inject, TestBed } from '@angular/core/testing';

import { RoomsService } from './rooms.service';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { RoomsStateServiceMock } from '@sections/housing/rooms/mocks/rooms-state.service.mock';
import { Category } from '@sections/housing/search-filter/filter-sort/filter-sort.model';
import { HousingProxyService } from '@sections/housing/housing-proxy.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Facility, FacilityAttribute } from '@sections/housing/facilities/facilities.model';
import { convertObjectToMap } from '@sections/housing/utils/convert-object-to-map';

describe('RoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RoomsService,
      {provide: RoomsStateService, useClass: RoomsStateServiceMock},
      {provide: HousingProxyService, useValue: jasmine.createSpyObj('HousingProxyService', ['post'])},
      {provide: EnvironmentFacadeService, useValue: jasmine.createSpyObj('EnvironmentFacadeService', ['getHousingAPIURL'])}
    ]
  }));

  it('should be created', () => {
    const service: RoomsService = TestBed.get(RoomsService);
    expect(service).toBeTruthy();
  });

  it('should get categories for the filter', inject([RoomsService, RoomsStateService],(service: RoomsService, stateService: RoomsStateServiceMock) => {
    //order is important for test to pass
    const EXPECTED_CATEGORIES: Category[] = [
      new Category("Buildings",-777),
      new Category("Facility Max Legal Occupancy",2317),
      new Category("Facility Smoking",2302),
      new Category("Facility Assignment_Limit",2308),
      new Category("Facility Gender",2306 ),
      new Category('Patron gender', 2384),
      new Category('Patron age', 2387),
      new Category('Patron smoking', 2381)
    ];
    expect(service.getFilterCategories()).toEqual(EXPECTED_CATEGORIES);
  }));
it('should  get category options', inject([RoomsService, RoomsStateService, HousingProxyService, EnvironmentFacadeService],
  (service: RoomsService, stateService: RoomsStateServiceMock) => {
    const EXPECTED_CATEGORY_OPTIONS = {
      Buildings: ['Able'],
      "Facility Max Legal Occupancy": ["2", "0", "3", "6"],
      "Facility Smoking": ['No'],
      "Facility Assignment_Limit": ["1","2","4"],
      "Facility Gender": ["Female"],
      "Patron gender": ["test 1", "test 22"],
      "Patron age": ["test 2", "test 44"],
      "Patron smoking": ["yes", "no"]
    };
    const categories: Category[] = [
      new Category("Buildings",-777),
      new Category("Facility Max Legal Occupancy",2317),
      new Category("Facility Assignment_Level",2312),
      new Category("Facility Smoking",2302),
      new Category("Facility Assignment_Limit",2308),
      new Category("Facility Gender",2306 ),
    ];

    expect(service.getFilterOptions(categories)).toEqual(EXPECTED_CATEGORY_OPTIONS);
  }));

  it('should filter rooms successfully for one Category', inject([RoomsService, RoomsStateService, HousingProxyService, EnvironmentFacadeService],
    (service: RoomsService, stateService: RoomsStateServiceMock) => {
      const EXPECTED_ROOMS: Facility[] = [
        new Facility("217",9000333, "2","2",3, 1990,'xyz',
          'A', 4,false,'arrow-down',
          [
            new FacilityAttribute(0,9000333,2317, "3",
              'Max Legal Occupancy',  new Date ("0001-01-01T00:00:00"), null ),
            new FacilityAttribute(9025127,9000333,2312, 'This',
              'Assignment_Level',  new Date ("0001-01-01T00:00:00"), null ),
            new FacilityAttribute(9025129,9000333,2308, '2',
              'Assignment_Limit',  new Date ("0001-01-01T00:00:00"), null ),
            new FacilityAttribute(9025132,9000333,2302, 'No',
              'Smoking',  new Date ("0001-01-01T00:00:00"), null ),
            new FacilityAttribute(9030343,9000333,2306, 'Female',
              'Gender',  new Date ("0001-01-01T00:00:00"), null )
          ], false, 9000485, [],''),
        new Facility("218",9000334, "2","2",3, 1990,'xyz',
          'A', 4,false,'arrow-down',
          [
            new FacilityAttribute(0,9000334,2317, "2",
              'Max Legal Occupancy',  new Date ("0001-01-01T00:00:00"), null ),
            new FacilityAttribute(9025139,9000334,2312, 'This',
              'Assignment_Level',  new Date ("0001-01-01T00:00:00"), null ),
            new FacilityAttribute(9025141,9000334,2308, '2',
              'Assignment_Limit',  new Date ("0001-01-01T00:00:00"), null ),
            new FacilityAttribute(9025144,9000334,2302, 'No',
              'Smoking',  new Date ("0001-01-01T00:00:00"), null ),
            new FacilityAttribute(9030342,9000334,2306, 'Female',
              'Gender',  new Date ("0001-01-01T00:00:00"), null )
          ], false, 9000485, [],'')
      ]
      const WAS_OCCUPANT_SELECTED = false;
      const CATEGORY_OPTIONS = {
        "Facility Gender": ["Female"]
      };
      const _map = convertObjectToMap(CATEGORY_OPTIONS);
      service.filterBuildings(_map, WAS_OCCUPANT_SELECTED)
      expect(stateService.getActiveFilterFacilities()).toEqual(EXPECTED_ROOMS)
    }));

  it('should filter rooms successfully for two Categories', inject([RoomsService, RoomsStateService, HousingProxyService, EnvironmentFacadeService],
    (service: RoomsService, stateService: RoomsStateServiceMock) => {
      let EXPECTED_ROOMS: Facility[];
      EXPECTED_ROOMS = [
        new Facility(
          '217', 9000333, '2', '2', 3, 1990, 'xyz',
          'A', 4, false, 'arrow-down',
          [
            new FacilityAttribute(0, 9000333, 2317, '3',
              'Max Legal Occupancy', new Date('0001-01-01T00:00:00'), null),
            new FacilityAttribute(9025127, 9000333, 2312, 'This',
              'Assignment_Level', new Date('0001-01-01T00:00:00'), null),
            new FacilityAttribute(9025129, 9000333, 2308, '2',
              'Assignment_Limit', new Date('0001-01-01T00:00:00'), null),
            new FacilityAttribute(9025132, 9000333, 2302, 'No',
              'Smoking', new Date('0001-01-01T00:00:00'), null),
            new FacilityAttribute(9030343, 9000333, 2306, 'Female',
              'Gender', new Date('0001-01-01T00:00:00'), null),
          ], false, 9000485, [], ''),
      ];
      const WAS_OCCUPANT_SELECTED = false;

      const CATEGORY_OPTIONS = {
        "Facility Max Legal Occupancy": ["3"],
        "Facility Gender": ["Female"],
      };
      const optionsMap = convertObjectToMap(CATEGORY_OPTIONS);
      service.filterBuildings(optionsMap, WAS_OCCUPANT_SELECTED);

      expect(stateService.getActiveFilterFacilities()).toEqual(EXPECTED_ROOMS);
    }));
});
