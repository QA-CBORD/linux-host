import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StPopoverComponent } from './st-popover.component';

describe('StPopoverComponent', () => {
  let component: StPopoverComponent;
  let fixture: ComponentFixture<StPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
