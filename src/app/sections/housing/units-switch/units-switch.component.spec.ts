import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsSwitchComponent } from './units-switch.component';

describe('UnitsSwitchComponent', () => {
  let component: UnitsSwitchComponent;
  let fixture: ComponentFixture<UnitsSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitsSwitchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
