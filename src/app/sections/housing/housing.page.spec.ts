import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HousingPage } from './housing.page';

describe('HousingPage', () => {
  let component: HousingPage;
  let fixture: ComponentFixture<HousingPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HousingPage]
    });
    fixture = TestBed.createComponent(HousingPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
