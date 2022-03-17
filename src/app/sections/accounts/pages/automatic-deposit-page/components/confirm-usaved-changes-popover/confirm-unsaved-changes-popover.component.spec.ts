import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmUnsavedChangesPopoverComponent } from './confirm-unsaved-changes-popover.component';

describe('ConfirmUsavedChangesPopoverComponent', () => {
  let component: ConfirmUnsavedChangesPopoverComponent;
  let fixture: ComponentFixture<ConfirmUnsavedChangesPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmUnsavedChangesPopoverComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUnsavedChangesPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
