import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccessPopoverComponent } from './mobile-access-popover.component';

describe('MobileAccessPopoverComponent', () => {
  let component: MobileAccessPopoverComponent;
  let fixture: ComponentFixture<MobileAccessPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileAccessPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccessPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
