import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AccountsService } from '@sections/dashboard/services';
import { Router } from '@angular/router';
import { AccountsTileComponent } from './accounts-tile.component';

describe('AccountsTileComponent', () => {
  let component: AccountsTileComponent;
  let fixture: ComponentFixture<AccountsTileComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const accountsServiceStub = () => ({
      getAccountsFilteredByDisplayTenders: () => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AccountsTileComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: AccountsService, useFactory: accountsServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(AccountsTileComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`itemsPerSlide has default value`, () => {
    expect(component.itemsPerSlide).toEqual(4);
  });

  it(`slides has default value`, () => {
    expect(component.slides).toEqual([]);
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(true);
  });

  it(`pager has default value`, () => {
    expect(component.pager).toEqual(false);
  });

  describe('getUserAccounts', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const accountsServiceStub: AccountsService = fixture.debugElement.injector.get(
        AccountsService
      );
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
     jest.spyOn(
        accountsServiceStub,
        'getAccountsFilteredByDisplayTenders'
      );
      component.getUserAccounts();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(
        accountsServiceStub.getAccountsFilteredByDisplayTenders
      ).toHaveBeenCalled();
    });
  });
});
