import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/accounts.service';
import { MenuReceivingFundsListItem } from '../../../models/menu-list-item';
import { MenuReceivingFundsComponent } from './menu-receiving-funds.component';

describe('MenuReceivingFundsComponent', () => {
  let component: MenuReceivingFundsComponent;
  let fixture: ComponentFixture<MenuReceivingFundsComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const accountServiceStub = () => ({
      settings$: { pipe: () => ({}) },
      getContentStrings: accountStringNames => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuReceivingFundsComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: AccountService, useFactory: accountServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MenuReceivingFundsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
