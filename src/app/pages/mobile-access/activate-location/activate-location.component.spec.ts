import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateLocationPage } from './activate-location.page';

describe('ActivateLocationPage', () => {
  let component: ActivateLocationPage;
  let fixture: ComponentFixture<ActivateLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateLocationPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
