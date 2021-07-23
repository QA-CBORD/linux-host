import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPermissionPopover } from './location-popover.component';

describe('LocationPopoverComponent', () => {
  let component: LocationPermissionPopover;
  let fixture: ComponentFixture<LocationPermissionPopover>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPermissionPopover ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPermissionPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
