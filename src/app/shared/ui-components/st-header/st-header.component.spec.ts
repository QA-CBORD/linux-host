import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StHeaderPage } from './st-header.page';

describe('StHeaderPage', () => {
  let component: StHeaderPage;
  let fixture: ComponentFixture<StHeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StHeaderPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
