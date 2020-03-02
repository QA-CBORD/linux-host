import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingDashboardPage } from './housing-dashboard.page';

describe('HousingDashboardPage', () => {
  let component: HousingDashboardPage;
  let fixture: ComponentFixture<HousingDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
