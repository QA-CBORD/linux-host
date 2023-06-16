import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { RoomsService } from '@sections/housing/rooms/rooms.service';
import { BuildingsPage } from './buildings.page';

describe('BuildingsPage', () => {
  let component: BuildingsPage;
  let fixture: ComponentFixture<BuildingsPage>;

  beforeEach(() => {
    const roomsStateServiceStub = () => ({
      getParentFacilities: () => ({}),
      clearOccupantDetails: () => ({})
    });
    const roomsServiceStub = () => ({
      clearFilter: () => ({}),
      clearFilterCategories: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BuildingsPage],
      providers: [
        { provide: RoomsStateService, useFactory: roomsStateServiceStub },
        { provide: RoomsService, useFactory: roomsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(BuildingsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const roomsStateServiceStub: RoomsStateService = fixture.debugElement.injector.get(
        RoomsStateService
      );
      const roomsServiceStub: RoomsService = fixture.debugElement.injector.get(
        RoomsService
      );
     jest.spyOn(roomsStateServiceStub, 'getParentFacilities');
     jest.spyOn(roomsStateServiceStub, 'clearOccupantDetails');
     jest.spyOn(roomsServiceStub, 'clearFilter');
     jest.spyOn(roomsServiceStub, 'clearFilterCategories');
      component.ngOnInit();
      expect(roomsStateServiceStub.getParentFacilities).toHaveBeenCalled();
      expect(roomsStateServiceStub.clearOccupantDetails).toHaveBeenCalled();
      expect(roomsServiceStub.clearFilter).toHaveBeenCalled();
      expect(roomsServiceStub.clearFilterCategories).toHaveBeenCalled();
    });
  });
});
