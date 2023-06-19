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
});
