import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StepperComponent } from './stepper.component';
import { StepperNextDirective } from './stepper-buttons';
import { StepperBackDirective } from './stepper-buttons';

@Component({
  template: `
    <div>Without Directive</div>
    <div utton[stepperNext], ion-button[stepperNext>Default</div>
  `
})
class TestComponent {}

describe('StepperNextDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    const stepperComponentStub = () => ({ next: () => ({}) });
    TestBed.configureTestingModule({
      declarations: [
        StepperNextDirective,
        TestComponent,
        StepperBackDirective,
        TestComponent
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(StepperNextDirective)
    );
    bareElement = fixture.debugElement.query(
      By.css(':not(button[stepperNext], ion-button[stepperNext])')
    );
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
@Component({
  template: `
    <div>Without Directive</div>
    <div utton[stepperBack], ion-button[stepperBack>Default</div>
  `
})
class TestComponent {}

describe('StepperBackDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    const stepperComponentStub = () => ({ next: () => ({}) });
    TestBed.configureTestingModule({
      declarations: [
        StepperNextDirective,
        TestComponent,
        StepperBackDirective,
        TestComponent
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(StepperBackDirective)
    );
    bareElement = fixture.debugElement.query(
      By.css(':not(button[stepperBack], ion-button[stepperBack])')
    );
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
