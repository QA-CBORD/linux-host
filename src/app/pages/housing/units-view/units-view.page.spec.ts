import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsViewPage } from './units-view.page';

describe('UnitsViewPage', () => {
  let component: UnitsViewPage;
  let fixture: ComponentFixture<UnitsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
