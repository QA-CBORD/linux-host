import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FocusNextDirective } from './focus-next.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div [stFocusNext]="second">Default</div>
    <div #second>Second</div>
  `,
})
class TestComponent {}

describe('FocusNextDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: DebugElement;
  let bareElement: DebugElement;
  let directiveInstance: FocusNextDirective; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FocusNextDirective, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.query(By.directive(FocusNextDirective));
    directiveInstance = elementsWithDirective.injector.get(FocusNextDirective);
    bareElement = fixture.debugElement.query(By.css(':not([stFocusNext])'));
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  //fix Cannot use spyOn on a primitive value; null given on this test
  it('should focus on next element when enter key is pressed', () => {
    const directiveElement = elementsWithDirective.nativeElement;
    const nextElement = directiveElement.nextElementSibling;
    const focusSpy = jest.spyOn(nextElement, 'focus');
    directiveElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    setTimeout(() => {
      expect(focusSpy).toHaveBeenCalled();
    }, 101);
  });
  it('should call focus on nextField after a timeout', () => {
    jest.useFakeTimers();
    const focusSpy = jest.spyOn(directiveInstance.nextField, 'focus');
    directiveInstance.onInputChange();
    jest.runAllTimers();
    expect(focusSpy).toHaveBeenCalled();
  });
});
