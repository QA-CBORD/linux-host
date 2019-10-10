import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticDepositPagePage } from './automatic-deposit-page.page';

describe('AutomaticDepositPagePage', () => {
  let component: AutomaticDepositPagePage;
  let fixture: ComponentFixture<AutomaticDepositPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutomaticDepositPagePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticDepositPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
