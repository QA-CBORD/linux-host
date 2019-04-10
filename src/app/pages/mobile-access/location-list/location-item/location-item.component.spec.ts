import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationItemPage } from './location-item.page';

describe('LocationItemPage', () => {
  let component: LocationItemPage;
  let fixture: ComponentFixture<LocationItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
