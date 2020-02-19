import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupComponent } from './radio-group.component';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioGroupComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
