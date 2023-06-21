import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SuccessPopoverComponent } from './success-popover.component';

describe('SuccessPopoverComponent', () => {
  let component: SuccessPopoverComponent;
  let fixture: ComponentFixture<SuccessPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SuccessPopoverComponent]
    });
    fixture = TestBed.createComponent(SuccessPopoverComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'initPopover');
      component.ngOnInit();
      expect(component.initPopover).toHaveBeenCalled();
    });
  });
});
