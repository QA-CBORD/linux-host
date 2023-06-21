import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserAccount } from '@core/model/account/account.model';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { ALL_ACCOUNTS } from '@sections/accounts/accounts.config';
import { AccountListComponent } from './account-list.component';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;

  beforeEach(() => {
    const platformStub = () => ({ width: () => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    const accountServiceStub = () => ({
      getContentStrings: accountStringNames => ({})
    });
    const transactionServiceStub = () => ({
      getContentStrings: transactionStringNames => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AccountListComponent],
      providers: [
        { provide: Platform, useFactory: platformStub },
        { provide: Router, useFactory: routerStub },
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: TransactionService, useFactory: transactionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`accountsShowed has default value`, () => {
    expect(component.accountsShowed).toEqual([]);
  });

  it(`accountsHidden has default value`, () => {
    expect(component.accountsHidden).toEqual([]);
  });

  it(`tabletResolution has default value`, () => {
    expect(component.tabletResolution).toEqual(false);
  });

  it(`allAccounts has default value`, () => {
    expect(component.allAccounts).toEqual(ALL_ACCOUNTS);
  });

  it(`activeAccount has default value`, () => {
    expect(component.activeAccount).toEqual(ALL_ACCOUNTS);
  });
});
