import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoommateSearchPage } from './roommate-search.page';

describe('RoommateSearchComponent', () => {
  let component: RoommateSearchPage;
  let fixture: ComponentFixture<RoommateSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoommateSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoommateSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
