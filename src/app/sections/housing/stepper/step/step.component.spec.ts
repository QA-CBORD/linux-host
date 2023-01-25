import { Subscription } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StepComponent } from './step.component';
import { FormBuilder, FormControl } from '@angular/forms';

describe('StepComponent', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StepComponent],
      providers: [FormBuilder],
    });
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;

    const formBuilder = TestBed.inject(FormBuilder);
    component.stepControl = formBuilder.group({
      recipient: new FormControl({
        value: ['test'],
        disabled: false,
      }),
    });
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`interacted has default value`, () => {
    component['sub'] = new Subscription();
    expect(component.interacted).toEqual(false);
  });

  it(`should react on changes`, () => {
    const debounceTime = 1000;
    const spy = jest.spyOn(component.stepChanged, 'emit');
    component.stepControl.get('recipient').setValue('7');
    setTimeout(() => expect(spy).toBeCalled(), debounceTime);
  });
});
