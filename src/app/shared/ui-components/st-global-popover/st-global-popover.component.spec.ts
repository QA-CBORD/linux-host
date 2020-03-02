import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StGlobalPopoverComponent } from './st-global-popover.component';

describe('StGlobalPopoverComponent', () => {
  let component: StGlobalPopoverComponent;
  let fixture: ComponentFixture<StGlobalPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StGlobalPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StGlobalPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
