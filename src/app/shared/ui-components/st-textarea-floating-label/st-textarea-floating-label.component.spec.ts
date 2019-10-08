import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StTextareaFloatingLabelComponent } from './st-textarea-floating-label.component';

describe('StTextareaFloatingLabelComponent', () => {
  let component: StTextareaFloatingLabelComponent;
  let fixture: ComponentFixture<StTextareaFloatingLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StTextareaFloatingLabelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StTextareaFloatingLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
