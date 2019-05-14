import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandListPage } from './expand-list.page';

describe('ExpandListPage', () => {
  let component: ExpandListPage;
  let fixture: ComponentFixture<ExpandListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
