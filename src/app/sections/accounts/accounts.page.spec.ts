import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountService } from './services/accounts.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { TransactionService } from './services/transaction.service';
import { AccountsPage } from './accounts.page';

describe('AccountsPage', () => {
  let component: AccountsPage;
  let fixture: ComponentFixture<AccountsPage>;

  beforeEach(() => {
    const accountServiceStub = () => ({
      getAccountsFilteredByDisplayTenders: () => ({}),
      getContentStrings: accountStringNames => ({})
    });
    const platformStub = () => ({ width: () => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    const transactionServiceStub = () => ({
      transactions$: { pipe: () => ({}) },
      getContentStrings: transactionStringNames => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AccountsPage],
      providers: [
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: Platform, useFactory: platformStub },
        { provide: Router, useFactory: routerStub },
        { provide: TransactionService, useFactory: transactionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AccountsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const accountServiceStub: AccountService = fixture.debugElement.injector.get(
        AccountService
      );
      spyOn(component, 'setContentStrings').and.callThrough();
      spyOn(component, 'defineInitRoute').and.callThrough();
      spyOn(
        accountServiceStub,
        'getAccountsFilteredByDisplayTenders'
      ).and.callThrough();
      component.ngOnInit();
      expect(component.setContentStrings).toHaveBeenCalled();
      expect(component.defineInitRoute).toHaveBeenCalled();
      expect(
        accountServiceStub.getAccountsFilteredByDisplayTenders
      ).toHaveBeenCalled();
    });
  });

  describe('defineInitRoute', () => {
    it('makes expected calls', () => {
      spyOn(component, 'goToAllAccounts').and.callThrough();
      component.defineInitRoute();
      expect(component.goToAllAccounts).toHaveBeenCalled();
    });
  });

  describe('goToAllAccounts', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.goToAllAccounts();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('setContentStrings', () => {
    it('makes expected calls', () => {
      const accountServiceStub: AccountService = fixture.debugElement.injector.get(
        AccountService
      );
      const transactionServiceStub: TransactionService = fixture.debugElement.injector.get(
        TransactionService
      );
      spyOn(accountServiceStub, 'getContentStrings').and.callThrough();
      spyOn(transactionServiceStub, 'getContentStrings').and.callThrough();
      component.setContentStrings();
      expect(accountServiceStub.getContentStrings).toHaveBeenCalled();
      expect(transactionServiceStub.getContentStrings).toHaveBeenCalled();
    });
  });
});
