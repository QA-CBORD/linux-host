import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFloatingLabelComponent } from './input-floating-label.component';

describe('InputFloatingLabelComponent', () => {
  let component: InputFloatingLabelComponent;
  let fixture: ComponentFixture<InputFloatingLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFloatingLabelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFloatingLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
