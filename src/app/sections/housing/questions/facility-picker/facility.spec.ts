import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FacilityPickerComponent } from './facility-picker.component';
import { QuestionReorder, QuestionReorderValue } from '../types/question-reorder';

describe('FacilityPickerComponent', () => {
  let component: FacilityPickerComponent;
  let fixture: ComponentFixture<FacilityPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FacilityPickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityPickerComponent);
    component = fixture.componentInstance;
    component.question = {
      name: 'test',
      label: 'Test',
      inline: true,
      facilityPicker: true,
      prefRank: 45454,
      facilityKey: 789,
      preferenceKey: 789,
      required: true,
      consumerKey: 789,
      type: 'FACILITY',
      attribute: 'asda',
      PrefKeys: [{ defaultRank: 656, preferenceKey: 121, active: true, name: 'test', preferenceType: 'building' }],
      values: [
        { value: 'A', label: 'A', selected: false },
        { value: 'B', label: 'B', selected: false },
        { value: 'C', label: 'C', selected: false },
      ],
    };
    component.parentForm = new FormGroup({
      test: new FormControl(),
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component with the correct facilities', () => {
    const facilitiesControl = component.parentForm.get(component.question.name);
    facilitiesControl.setValue([
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
    ]);
    expect(component.facilities).toEqual([
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
    ]);
  });

  it('should update the facilities when the value of the form control changes', () => {
    const facilitiesControl = component.parentForm.get(component.question.name);
    facilitiesControl.setValue([{ value: 'C', label: 'C' }]);
    expect(component.facilities).toEqual([{ value: 'C', label: 'C' }]);
  });

  it('should unsubscribe from valueChanges on ngOnDestroy', () => {
    jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should reorder the facilities and update the form control value', () => {
    const facilitiesControl = component.parentForm.get(component.question.name);
    facilitiesControl.setValue([
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
    ]);
    const reorderEvent = new CustomEvent('test', {
      detail: {
        complete: (facilities: QuestionReorderValue[]) => {
          return [facilities[2], facilities[0], facilities[1]];
        },
      },
    });
    component.doReorder(reorderEvent);
    expect(component.facilities).toEqual([
      { value: 'C', label: 'C' },
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
    ]);
    expect(facilitiesControl.value).toEqual([
      { value: 'C', label: 'C' },
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
    ]);
  });

  it('should track facilities by value', () => {
    const index = 1;
    const facility = { value: 'B', label: 'B', selected: true };
    const result = component.trackByValue(index, facility);
    expect(result).toEqual('B');
  });
});
