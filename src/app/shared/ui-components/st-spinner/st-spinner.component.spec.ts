import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StSpinnerPage } from './st-spinner.page';

describe('StSpinnerPage', () => {
  let component: StSpinnerPage;
  let fixture: ComponentFixture<StSpinnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StSpinnerPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StSpinnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
