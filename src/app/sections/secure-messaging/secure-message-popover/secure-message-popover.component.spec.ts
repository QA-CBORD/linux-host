import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SecureMessagePopoverComponent } from './secure-message-popover.component';

describe('SecureMessagePopoverComponent', () => {
  let component: SecureMessagePopoverComponent;
  let fixture: ComponentFixture<SecureMessagePopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SecureMessagePopoverComponent]
    });
    fixture = TestBed.createComponent(SecureMessagePopoverComponent);
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

  describe('initPopover', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'configureButtons');
      component.initPopover();
      expect(component.configureButtons).toHaveBeenCalled();
    });
  });
});
