import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChargeScheduleValue } from './charge-schedules.model';
import { ChargeSchedulesComponent } from './charge-schedules.component';

describe('ChargeSchedulesComponent', () => {
  let component: ChargeSchedulesComponent;
  let fixture: ComponentFixture<ChargeSchedulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ChargeSchedulesComponent]
    });
    fixture = TestBed.createComponent(ChargeSchedulesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
