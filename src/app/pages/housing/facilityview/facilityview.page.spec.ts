import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityviewPage } from './facilityview.page';

describe('FacilityviewPage', () => {
  let component: FacilityviewPage;
  let fixture: ComponentFixture<FacilityviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
