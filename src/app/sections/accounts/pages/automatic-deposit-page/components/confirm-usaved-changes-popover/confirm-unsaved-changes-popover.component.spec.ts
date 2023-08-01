import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmUnsavedChangesPopoverComponent } from './confirm-unsaved-changes-popover.component';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { buttons } from '@core/utils/buttons.config';

describe('ConfirmUnsavedChangesPopoverComponent', () => {
  let component: ConfirmUnsavedChangesPopoverComponent;
  let fixture: ComponentFixture<ConfirmUnsavedChangesPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfirmUnsavedChangesPopoverComponent]
    });
    fixture = TestBed.createComponent(ConfirmUnsavedChangesPopoverComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should init component', () => {
    component.ngOnInit();
    expect(component.config).toEqual({
      type: PopupTypes.CANCEL,
      title: 'Unsaved changes',
      buttons: [{ ...buttons.CANCEL, label: 'no' }, { ...buttons.OKAY, label: 'yes' },],
      message: 'Your changes wont be saved, would you like to leave without saving?',
      code: '',
    });
  });
});
