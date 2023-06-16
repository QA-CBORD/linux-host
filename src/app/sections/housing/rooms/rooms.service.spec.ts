import { TestBed } from '@angular/core/testing';
import { HousingProxyService } from '@sections/housing/housing-proxy.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { CreateContractRequestOptions } from '@sections/housing/rooms/rooms.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(() => {
    const housingProxyServiceStub = () => ({
      post: (url, request) => ({ pipe: () => ({}) })
    });
    const environmentFacadeServiceStub = () => ({});
    const roomsStateServiceStub = () => ({
      getAllOccupantAttributes: () => ({ forEach: () => ({}) }),
      getParentFacilities: () => ({
        forEach: () => ({}),
        filter: () => ({ map: () => ({}) })
      }),
      getParentFacilityChildren: facilityId => ({}),
      updateActiveFilterFacilities: array => ({}),
      getAllFacilityChildren: () => ({ forEach: () => ({}) }),
      getOccupantDetails: facilityId => ({ find: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        RoomsService,
        { provide: HousingProxyService, useFactory: housingProxyServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: RoomsStateService, useFactory: roomsStateServiceStub }
      ]
    });
    service = TestBed.inject(RoomsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('postContractRequest', () => {
    it('makes expected calls', () => {
      const housingProxyServiceStub: HousingProxyService = TestBed.inject(
        HousingProxyService
      );
      const createContractRequestOptionsStub: CreateContractRequestOptions = <
        any
      >{};
     jest.spyOn(housingProxyServiceStub, 'post');
      service.postContractRequest(createContractRequestOptionsStub);
      expect(housingProxyServiceStub.post).toHaveBeenCalled();
    });
  });

  describe('clearFilter', () => {
    it('makes expected calls', () => {
      const roomsStateServiceStub: RoomsStateService = TestBed.inject(
        RoomsStateService
      );
     jest.spyOn(
        roomsStateServiceStub,
        'updateActiveFilterFacilities'
      );
      service.clearFilter();
      expect(
        roomsStateServiceStub.updateActiveFilterFacilities
      ).toHaveBeenCalled();
    });
  });
});
