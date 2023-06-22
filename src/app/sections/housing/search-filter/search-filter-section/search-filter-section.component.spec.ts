import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchFilterSectionComponent } from './search-filter-section.component';

describe('SearchFilterSectionComponent', () => {
  let component: SearchFilterSectionComponent;
  let fixture: ComponentFixture<SearchFilterSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchFilterSectionComponent]
    });
    fixture = TestBed.createComponent(SearchFilterSectionComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`toggled has default value`, () => {
    expect(component.toggled).toEqual(false);
  });
});
