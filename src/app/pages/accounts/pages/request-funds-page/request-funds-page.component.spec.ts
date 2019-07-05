import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFundsPagePage } from './request-funds-page.page';

describe('RequestFundsPagePage', () => {
  let component: RequestFundsPagePage;
  let fixture: ComponentFixture<RequestFundsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestFundsPagePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFundsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
