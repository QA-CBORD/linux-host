import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReceivingFundsComponent } from './menu-receiving-funds.component';

describe('MenuReceivingFundsComponent', () => {
  let component: MenuReceivingFundsComponent;
  let fixture: ComponentFixture<MenuReceivingFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuReceivingFundsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReceivingFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
