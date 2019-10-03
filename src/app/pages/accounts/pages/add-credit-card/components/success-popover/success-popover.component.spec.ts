import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPopoverComponent } from './success-popover.component';

describe('SuccessPopoverComponent', () => {
  let component: SuccessPopoverComponent;
  let fixture: ComponentFixture<SuccessPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
