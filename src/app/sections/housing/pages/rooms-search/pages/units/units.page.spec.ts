import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { ActivatedRoute } from '@angular/router';
import { UnitsPage } from './units.page';

describe('UnitsPage', () => {
  let component: UnitsPage;
  let fixture: ComponentFixture<UnitsPage>;

  beforeEach(() => {
    const roomsStateServiceStub = () => ({
      setFacilities$: facilityId => ({}),
      updateActiveFilterFacilities: arg => ({}),
      getAllFacilityChildren: () => ({}),
      getFacilities$: () => ({ pipe: () => ({}) })
    });
    const activatedRouteStub = () => ({
      snapshot: { params: { buildingKey: {} }, queryParams: { allUnits: {} } }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UnitsPage],
      providers: [
        { provide: RoomsStateService, useFactory: roomsStateServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub }
      ]
    });
    fixture = TestBed.createComponent(UnitsPage);
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
      spyOn(roomsStateServiceStub, 'setFacilities$').and.callThrough();
      spyOn(
        roomsStateServiceStub,
        'updateActiveFilterFacilities'
      ).and.callThrough();
      spyOn(roomsStateServiceStub, 'getAllFacilityChildren').and.callThrough();
      spyOn(roomsStateServiceStub, 'getFacilities$').and.callThrough();
      component.ngOnInit();
      expect(roomsStateServiceStub.setFacilities$).toHaveBeenCalled();
      expect(
        roomsStateServiceStub.updateActiveFilterFacilities
      ).toHaveBeenCalled();
      expect(roomsStateServiceStub.getAllFacilityChildren).toHaveBeenCalled();
      expect(roomsStateServiceStub.getFacilities$).toHaveBeenCalled();
    });
  });
});
