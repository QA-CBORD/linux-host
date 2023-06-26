import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmUnsavedChangesPopoverComponent } from './confirm-unsaved-changes-popover.component';

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
});
