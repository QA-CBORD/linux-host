import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/accounts.service';
import { MenuReceivingFundsComponent } from './menu-receiving-funds.component';
import { of } from 'rxjs';
import { CONTENT_STRINGS } from '@sections/accounts/accounts.config';

describe('MenuReceivingFundsComponent', () => {
  let component: MenuReceivingFundsComponent;
  let fixture: ComponentFixture<MenuReceivingFundsComponent>;

  beforeEach( async () => {
    const routerStub = { navigate: jest.fn() };
    const accountServiceStub = {
      settings$: of([{
        id: "",
        name: "",
        domain: "",
        category: "",
        contentMediaType: 0,
        value: "",
        description: ""
      }]),
      getContentStrings: jest.fn().mockReturnValue(of({}))
    };
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuReceivingFundsComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AccountService, useValue: accountServiceStub }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MenuReceivingFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('MenuReceivingFundsComponent', () => {

    it('should navigate to the correct route when redirect is called', () => {
      const router = TestBed.inject(Router);
      const navigateSpy = jest.spyOn(router, 'navigate');
      const name = 'patron/accounts';
      
      component.redirect(name);
      
      expect(navigateSpy).toHaveBeenCalledWith([name]);
    });

    it('should return the correct trackBy value for menu items', () => {
      const index = 0;
      const menuItem = { name: 'example-menu-item' } as any;
      const result = component.trackByMenuName(index, menuItem);
      expect(result).toBe(menuItem.name);
    });

    it('should return an array of menu items when handleListItems is called', () => {
      const settings = [
        { name: 'enable_onetime_deposits', value: 'value1' },
        { name: 'enable_auto_deposits', value: 'value2' }
      ];
      component.contentString = { [CONTENT_STRINGS.autoDepositBtn] : "button_auto-deposit", [CONTENT_STRINGS.addFundsBtn]: "enable_onetime_deposits" };
      const result = component['handleListItems'](settings);
      
      expect(result).toBeDefined();
    });

    it('should return an array of menu items when handleListItems is called', () => {
      const settings = [
        { name: [CONTENT_STRINGS.autoDepositBtn], value: 'value1' },
        { name: [CONTENT_STRINGS.addFundsBtn], value: 'value2' },
        { name: [CONTENT_STRINGS.requestFundsBtn], value: 'value3' },
        { name: [CONTENT_STRINGS.mealDonationsBtn], value: 'value4' }
      ] as any;
      component.contentString = { [CONTENT_STRINGS.autoDepositBtn] : "button_auto-deposit", [CONTENT_STRINGS.addFundsBtn]: "enable_onetime_deposits" };
      const result = component['handleListItems'](settings);
      
      expect(result).toBeDefined();
    });

    it('should set the contentString property when setContentStrings is called', async () => {
      const accountService = TestBed.inject(AccountService);
      const getContentStringsSpy = jest.spyOn(accountService, 'getContentStrings').mockReturnValue({});
      
      await component.setContentStrings();
      
      expect(getContentStringsSpy).toHaveBeenCalled();
      expect(component.contentString).toEqual({});
    });    
  });
});
