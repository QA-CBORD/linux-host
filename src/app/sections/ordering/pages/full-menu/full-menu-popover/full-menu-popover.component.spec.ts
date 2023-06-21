import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FullMenuPopoverComponent } from './full-menu-popover.component';

describe('FullMenuPopoverComponent', () => {
  let component: FullMenuPopoverComponent;
  let fixture: ComponentFixture<FullMenuPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FullMenuPopoverComponent]
    });
    fixture = TestBed.createComponent(FullMenuPopoverComponent);
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
