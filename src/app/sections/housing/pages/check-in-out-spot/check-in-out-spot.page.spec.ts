import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInOutSpotPage } from './check-in-out-spot.page';

describe('CheckInOutSpotComponent', () => {
  let component: CheckInOutSpotPage;
  let fixture: ComponentFixture<CheckInOutSpotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInOutSpotPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInOutSpotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
