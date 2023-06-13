import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { monthDayYear } from '@shared/constants/dateFormats.constant';
import { hourMinTime } from '@shared/constants/dateFormats.constant';
import { RoomSelectionListComponent } from './room-selection-list.component';

describe('RoomSelectionListComponent', () => {
  let component: RoomSelectionListComponent;
  let fixture: ComponentFixture<RoomSelectionListComponent>;

  beforeEach(() => {
    const roomsStateServiceStub = () => ({ setActiveRoomSelect: key => ({}) });
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: array => ({ then: () => ({}) }) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RoomSelectionListComponent],
      providers: [
        { provide: RoomsStateService, useFactory: roomsStateServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RoomSelectionListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`dateFormat has default value`, () => {
    expect(component.dateFormat).toEqual(monthDayYear);
  });

  it(`timeFormat has default value`, () => {
    expect(component.timeFormat).toEqual(hourMinTime);
  });
});
