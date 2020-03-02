import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StPopoverLayoutComponent } from './st-popover-layout.component';

describe('StPopoverLayoutComponent', () => {
  let component: StPopoverLayoutComponent;
  let fixture: ComponentFixture<StPopoverLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StPopoverLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StPopoverLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
