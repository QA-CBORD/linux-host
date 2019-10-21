import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StDateTimePickerComponent } from './st-date-time-picker.component';

describe('StDateTimePickerComponent', () => {
  let component: StDateTimePickerComponent;
  let fixture: ComponentFixture<StDateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StDateTimePickerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
