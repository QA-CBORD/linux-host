import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInputElement } from './get-input-element.component';

describe('GetInputElementComponent', () => {
  let component: GetInputElement;
  let fixture: ComponentFixture<GetInputElement>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInputElement ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInputElement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
