import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmDepositPopoverComponent } from './confirm-deposit-popover.component';

describe('ConfirmDepositPopoverComponent', () => {
  let component: ConfirmDepositPopoverComponent;
  let fixture: ComponentFixture<ConfirmDepositPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfirmDepositPopoverComponent]
    });
    fixture = TestBed.createComponent(ConfirmDepositPopoverComponent);
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
