import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationPermissionModal } from './location-disclosure.component';

describe('LocationPermissionModal', () => {
  let component: LocationPermissionModal;
  let fixture: ComponentFixture<LocationPermissionModal>;

  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPermissionModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPermissionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
