import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickCheckinModeComponent } from './pick-checkin-mode.component';

describe('PickCheckinModeComponent', () => {
  let component: PickCheckinModeComponent;
  let fixture: ComponentFixture<PickCheckinModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickCheckinModeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickCheckinModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});