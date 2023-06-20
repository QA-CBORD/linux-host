import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { QuestionReorderValue } from '../types/question-reorder';
import { FacilityPickerComponent } from './facility-picker.component';

describe('FacilityPickerComponent', () => {
  let component: FacilityPickerComponent;
  let fixture: ComponentFixture<FacilityPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FacilityPickerComponent]
    });
    fixture = TestBed.createComponent(FacilityPickerComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isDisabled has default value`, () => {
    expect(component.isDisabled).toEqual(false);
  });
});
