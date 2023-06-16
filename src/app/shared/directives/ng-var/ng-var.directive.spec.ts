import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ViewContainerRef } from '@angular/core';
import { VarDirective } from './ng-var.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div ngVar>Default</div>
  `
})
class TestComponent {}

describe('VarDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;
  const pipe = new VarDirective({} as any, {} as any);
  beforeEach(() => {
    const templateRefStub = () => ({});
    const viewContainerRefStub = () => ({
      clear: () => ({}),
      createEmbeddedView: (templateRef, context) => ({})
    });
    TestBed.configureTestingModule({
      declarations: [VarDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(VarDirective)
    );
    bareElement = fixture.debugElement.query(By.css(':not([ngVar])'));
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });

  describe('updateView', () => {
    it('makes expected calls', () => {
      const viewContainerRefStub: ViewContainerRef = TestBed.inject(
        ViewContainerRef
      );
      spyOn(viewContainerRefStub, 'clear').and.callThrough();
      spyOn(viewContainerRefStub, 'createEmbeddedView').and.callThrough();
      pipe.updateView();
      expect(viewContainerRefStub.clear).toHaveBeenCalled();
      expect(viewContainerRefStub.createEmbeddedView).toHaveBeenCalled();
    });
  });
});
