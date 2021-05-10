import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInOutPage } from './check-in-out.page';

describe('CheckInOutPage', () => {
  let component: CheckInOutPage;
  let fixture: ComponentFixture<CheckInOutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInOutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
