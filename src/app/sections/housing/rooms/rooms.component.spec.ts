import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RoomsStateService } from './rooms-state.service';
import { RoomsComponent } from './rooms.component';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(() => {
    const roomsStateServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RoomsComponent],
      providers: [
        { provide: RoomsStateService, useFactory: roomsStateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
