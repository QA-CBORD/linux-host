import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div appClickStopPropagation>Default</div>
  `
})
class TestComponent {}

describe('ClickStopPropagationDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickStopPropagationDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(ClickStopPropagationDirective)
    );
    bareElement = fixture.debugElement.query(
      By.css(':not([appClickStopPropagation])')
    );
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
