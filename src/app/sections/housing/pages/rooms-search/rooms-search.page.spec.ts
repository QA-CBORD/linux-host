import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HousingService } from '../../housing.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { RoomsSearchPage } from './rooms-search.page';

describe('RoomsSearchPage', () => {
  let component: RoomsSearchPage;
  let fixture: ComponentFixture<RoomsSearchPage>;

  beforeEach(() => {
    const housingServiceStub = () => ({
      getFacilities: roomSelectKey => ({ subscribe: f => f({}) }),
      goToDashboard: () => ({})
    });
    const activatedRouteStub = () => ({
      snapshot: { params: { roomSelectKey: {} } }
    });
    const routerStub = () => ({
      url: { includes: () => ({}) },
      navigate: (array, object) => ({})
    });
    const roomsStateServiceStub = () => ({
      createFacilityDictionary: data => ({}),
      getParentFacilities: () => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RoomsSearchPage],
      providers: [
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: RoomsStateService, useFactory: roomsStateServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RoomsSearchPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const housingServiceStub: HousingService = fixture.debugElement.injector.get(
        HousingService
      );
      const roomsStateServiceStub: RoomsStateService = fixture.debugElement.injector.get(
        RoomsStateService
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
     jest.spyOn(housingServiceStub, 'getFacilities');
     jest.spyOn(
        roomsStateServiceStub,
        'createFacilityDictionary'
      );
     jest.spyOn(roomsStateServiceStub, 'getParentFacilities');
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
      component.ngOnInit();
      expect(housingServiceStub.getFacilities).toHaveBeenCalled();
      expect(roomsStateServiceStub.createFacilityDictionary).toHaveBeenCalled();
      expect(roomsStateServiceStub.getParentFacilities).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('goToDashboard', () => {
    it('makes expected calls', () => {
      const housingServiceStub: HousingService = fixture.debugElement.injector.get(
        HousingService
      );
     jest.spyOn(housingServiceStub, 'goToDashboard');
      component.goToDashboard();
      expect(housingServiceStub.goToDashboard).toHaveBeenCalled();
    });
  });
});
