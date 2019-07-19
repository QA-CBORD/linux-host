import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPagePage } from './deposit-page.page';

describe('DepositPagePage', () => {
  let component: DepositPagePage;
  let fixture: ComponentFixture<DepositPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositPagePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
