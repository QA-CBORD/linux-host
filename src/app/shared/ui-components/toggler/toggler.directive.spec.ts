import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TogglerDirective } from './toggler.directive';

@Component({
  template: `<div stToggler></div>`
})
class TestComponent {}

describe('TogglerDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divEl: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TogglerDirective, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    divEl = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    const directive = new TogglerDirective();
    expect(directive).toBeTruthy();
  });

  it('should toggle the class "toggled" on the host element', () => {
    const directive = divEl.injector.get(TogglerDirective);

    expect(divEl.nativeElement.classList.contains('toggled')).toBe(false);

    directive.toggle();
    fixture.detectChanges();
    expect(divEl.nativeElement.classList.contains('toggled')).toBe(true);

    directive.toggle();
    fixture.detectChanges();
    expect(divEl.nativeElement.classList.contains('toggled')).toBe(false);
  });
});