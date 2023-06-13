import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { IsDividerAppearDirective } from './is-divider-appear.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div stIsDividerAppear>Default</div>
  `
})
class TestComponent {}

describe('IsDividerAppearDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    const elementRefStub = () => ({ nativeElement: {} });
    const renderer2Stub = () => ({
      setStyle: (nativeElement, string, arg1) => ({})
    });
    TestBed.configureTestingModule({
      declarations: [IsDividerAppearDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(IsDividerAppearDirective)
    );
    bareElement = fixture.debugElement.query(
      By.css(':not([stIsDividerAppear])')
    );
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const renderer2Stub: Renderer2 = TestBed.inject(Renderer2);
      spyOn(renderer2Stub, 'setStyle').and.callThrough();
      pipe.ngOnInit();
      expect(renderer2Stub.setStyle).toHaveBeenCalled();
    });
  });
});
