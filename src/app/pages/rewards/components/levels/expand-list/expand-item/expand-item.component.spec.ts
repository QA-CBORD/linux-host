import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandItemPage } from './expand-item.page';

describe('ExpandItemPage', () => {
  let component: ExpandItemPage;
  let fixture: ComponentFixture<ExpandItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandItemPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
