import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReceivingFundsPage } from './menu-receiving-funds.page';

describe('MenuReceivingFundsPage', () => {
  let component: MenuReceivingFundsPage;
  let fixture: ComponentFixture<MenuReceivingFundsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuReceivingFundsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReceivingFundsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
