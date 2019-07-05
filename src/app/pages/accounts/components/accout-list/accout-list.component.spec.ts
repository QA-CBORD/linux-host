import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutListPage } from './accout-list.page';

describe('AccoutListPage', () => {
  let component: AccoutListPage;
  let fixture: ComponentFixture<AccoutListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccoutListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoutListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
