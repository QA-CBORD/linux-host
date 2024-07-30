import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { USAePayResponse } from '@core/provider/native-provider/native.provider';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { WEEK } from '@core/utils/date-helper';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PAYMENT_SYSTEM_TYPE, PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { firstValueFrom, of, throwError } from 'rxjs';
import { Settings } from 'src/app/app.global';
import {
  AUTO_DEPOSIT_PAYMENT_TYPES,
  AUTO_DEPOST_SUCCESS_MESSAGE_TITLE,
  DEPOSIT_FREQUENCY,
} from './auto-deposit.config';
import { AUTOMATIC_DEPOSIT_CONTROL_NAMES, AutomaticDepositPageComponent } from './automatic-deposit-page.component';
import { AutoDepositService } from './service/auto-deposit.service';
import { UserAccount } from '@core/model/account/account.model';
import { ToastService } from '@core/service/toast/toast.service';

describe('AutomaticDepositPageComponent', () => {
  let component: AutomaticDepositPageComponent;
  let fixture: ComponentFixture<AutomaticDepositPageComponent>;
  let formBuilder: FormBuilder;
  let fb,
    settingsFacadeService,
    route,
    depositService,
    autoDepositService,
    popoverCtrl,
    router,
    toastService,
    cdRef,
    loadingService,
    externalPaymentService,
    userFacadeService,
    translateService;

  beforeEach(() => {
    fb = {};
    settingsFacadeService = {
      getSetting: jest.fn(() => {
        return of({
          category: 'deposit',
          contentMediaType: 200,
          description: 'Registered user deposit amounts to select from. Ignored if free-form amount entry allowed.',
          domain: 'get',
          id: '17f9bad2-c45a-4cef-8348-bccd6f1242d4',
          name: 'onetime_amounts',
          value: '["25.00","50.00","100.00"]',
        } as SettingInfo);
      }),
    };

    route = {};
    depositService = {
      filterAccountsByPaymentSystem: jest.fn(),
      filterCreditCardDestAccounts: jest.fn(),
      filterBillmeDestAccounts: jest.fn(),
      filterBillmeSourceAccounts: jest.fn(),
      sourceAccForBillmeDeposit: jest.fn(),
    };
    autoDepositService = {
      updateAutoDepositSettings: jest.fn(),
    };
    popoverCtrl = {
      create: jest.fn().mockReturnValue({
        present: jest.fn().mockResolvedValue(undefined),
        onDidDismiss: jest.fn().mockResolvedValue(undefined),
      }),
    };
    router = {
      navigate: jest.fn(),
    };
    cdRef = {
      detectChanges: jest.fn(),
    };
    externalPaymentService = {
      addUSAePayCreditCard: jest.fn().mockResolvedValue(Promise.resolve({} as USAePayResponse)),
    };
    userFacadeService = {
      isApplePayEnabled$: jest.fn(),
    };
    loadingService = {
      showSpinner: jest.fn(),
      closeSpinner: jest.fn(),
    };

    toastService = {
      showToast: jest.fn(),
      showSuccessToast: jest.fn(),
      showError: jest.fn(),
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AutomaticDepositPageComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: SettingsFacadeService, useValue: settingsFacadeService },
        { provide: LoadingService, useValue: loadingService },
        { provide: Router, useValue: router },
        { provide: AutoDepositService, useValue: autoDepositService },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: ExternalPaymentService, useValue: externalPaymentService },
        { provide: UserFacadeService, useValue: userFacadeService },
        { provide: TranslateService, useValue: translateService },
        { provide: ChangeDetectorRef, useValue: cdRef },
        { provide: ActivatedRoute, useValue: route },
        { provide: ToastService, useValue: toastService },
      ],
    });
    fixture = TestBed.createComponent(AutomaticDepositPageComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    component.automaticDepositForm = formBuilder.group({
      amount: [''],
      amountToDeposit: [''],
      dayOfMonth: [''],
      dayOfWeek: [''],
      paymentMethod: [''],
      account: [''],
      lowBalanceAmount: [''],
    });

    component.activeAutoDepositType = 1;

    // Mock observables
    component['sourceAccForBillmeDeposit'] = of({ id: '123' });
    component['showModal'] = jest.fn().mockResolvedValue(undefined);
    component['showToast'] = jest.fn().mockResolvedValue(undefined);

    fixture.detectChanges();
  });

  describe('AutomaticDeposit', () => {
    it('Should retreive the list of amount', async () => {
      const amounts = await firstValueFrom(component.billMeAmounts$);
      expect(amounts.length).toBeGreaterThan(0);
    });
    it('Should have activeFrequency settled as week by default', async () => {
      expect(component.activeFrequency).toEqual(DEPOSIT_FREQUENCY.week);
    });

    it('should call detectChanges and set applePayEnabled$ when ionViewWillEnter is called', async () => {
      const mockApplePayEnabled$ = of(true); // Example observable value
      userFacadeService.isApplePayEnabled$.mockReturnValue(mockApplePayEnabled$);

      const getAccountsSpy = jest.spyOn(component as any, 'getAccounts');

      component.ionViewWillEnter();

      // Assertions
      expect(component.showContent).toBe(true);
      expect(getAccountsSpy).toHaveBeenCalled();

      const result = await firstValueFrom(component.applePayEnabled$);
      expect(result).toBe(true);
    });

    it('should call deleteForm, set showContent to false, and unsubscribe when ionViewWillLeave is called', () => {
      const deleteFormSpy = jest.spyOn(component as any, 'deleteForm');

      component.ionViewWillLeave();

      // Assertions
      expect(deleteFormSpy).toHaveBeenCalled();
      expect(component.showContent).toBe(false);
    });

    it('should return AUTOMATIC_DEPOSIT_CONTROL_NAMES from controlNames getter', () => {
      // Access the controlNames getter
      const result = component.controlNames;

      // Assertions
      expect(result).toBe(AUTOMATIC_DEPOSIT_CONTROL_NAMES);
    });

    it('should return DEPOSIT_FREQUENCY from frequency getter', () => {
      const result = component.frequency;
      expect(result).toBe(DEPOSIT_FREQUENCY);
    });

    it('should return WEEK from weekArray getter', () => {
      const result = component.weekArray;
      expect(result).toEqual(WEEK);
    });

    it('should return PAYMENT_TYPE from paymentTypes getter', () => {
      const result = component.paymentTypes;
      expect(result).toBe(PAYMENT_TYPE);
    });

    it('should return AbstractControl for amountToDeposit', () => {
      const result = component.amountToDeposit;
      expect(result).toBeInstanceOf(AbstractControl);
      expect(result).toBe(component.automaticDepositForm.get('amount'));
    });

    it('should return AbstractControl for dayOfMonth', () => {
      const result = component.dayOfMonth;
      expect(result).toBeInstanceOf(AbstractControl);
      expect(result).toBe(component.automaticDepositForm.get('dayOfMonth'));
    });

    it('should return AbstractControl for dayOfWeek', () => {
      const result = component.dayOfWeek;
      expect(result).toBeInstanceOf(AbstractControl);
      expect(result).toBe(component.automaticDepositForm.get('dayOfWeek'));
    });

    it('should return AbstractControl for paymentMethod', () => {
      const result = component.paymentMethod;
      expect(result).toBeInstanceOf(AbstractControl);
      expect(result).toBe(component.automaticDepositForm.get('paymentMethod'));
    });

    it('should return AbstractControl for account', () => {
      const result = component.account;
      expect(result).toBeInstanceOf(AbstractControl);
      expect(result).toBe(component.automaticDepositForm.get('account'));
    });

    it('should return AbstractControl for lowBalanceAmount', () => {
      const result = component.lowBalanceAmount;
      expect(result).toBeInstanceOf(AbstractControl);
      expect(result).toBe(component.automaticDepositForm.get('lowBalanceAmount'));
    });

    it('should return Observable<string[]> for amountsForSelect$', () => {
      const billMeAmounts$ = of(['10', '20']);
      const oneTimeAmounts$ = of(['5', '15']);
      component.activePaymentType = PAYMENT_TYPE.BILLME;
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(billMeAmounts$);
      const result$ = component.amountsForSelect$;
      result$.subscribe(result => {
        expect(result).toEqual(['10', '20']);
      });
    });

    it('should return Observable<boolean> for isFreeFormAmountToDepositEnabled$', () => {
      const isAllowFreeFormBillMe$ = of(true);
      const isFreeFromDepositEnabled$ = of(false);
      component.activePaymentType = PAYMENT_TYPE.BILLME;
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(isAllowFreeFormBillMe$);
      const result$ = component.isFreeFormAmountToDepositEnabled$;
      result$.subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should return Observable<boolean> for isFreeFromDepositEnabled$', () => {
      const freeFormDepositEnabled$ = of(true);
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(freeFormDepositEnabled$);
      const result$ = component.isFreeFromDepositEnabled$;
      result$.subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should return Observable<string[]> for billMeAmounts$', () => {
      const billMeAmounts$ = of(['10', '20']);
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(billMeAmounts$);
      const result$ = component.billMeAmounts$;
      result$.subscribe(result => {
        expect(result).toEqual(['10', '20']);
      });
    });

    it('should return Observable<string[]> for oneTimeAmounts$', () => {
      const oneTimeAmounts$ = of(['5', '15']);
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(oneTimeAmounts$);
      const result$ = component.oneTimeAmounts$;
      result$.subscribe(result => {
        expect(result).toEqual(['5', '15']);
      });
    });

    it('should return Observable<string[]> for lowBalanceValues$', () => {
      const lowBalanceValues$ = of(['30', '40']);
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(lowBalanceValues$);
      const result$ = component.lowBalanceValues$;
      result$.subscribe(result => {
        expect(result).toEqual(['30', '40']);
      });
    });

    it('should return Observable<string[]> for autoDepositTenders$', () => {
      const autoDepositTenders$ = of(['tender1', 'tender2']);
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(autoDepositTenders$);
      const result$ = component.autoDepositTenders$;
      result$.subscribe(result => {
        expect(result).toEqual(['tender1', 'tender2']);
      });
    });

    it('should return Observable<boolean> for isAllowFreeFormBillMe$', () => {
      const isAllowFreeFormBillMe$ = of(true);
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(isAllowFreeFormBillMe$);
      const result$ = component.isAllowFreeFormBillMe$;
      result$.subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should return Observable<boolean> for isLowBalanceFreeInput$', () => {
      const isLowBalanceFreeInput$ = of(true);
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(isLowBalanceFreeInput$);
      const result$ = component.isLowBalanceFreeInput$;
      result$.subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should return Observable<boolean> for isBillMePaymentTypesEnabled$', () => {
      const autoDepositPaymentTypes$ = of([PAYMENT_TYPE.BILLME]);
      const paymentTypes$ = of([PAYMENT_TYPE.BILLME]);
      settingsFacadeService.getSetting = jest.fn().mockImplementation(setting => {
        if (setting === Settings.Setting.AUTO_DEPOSIT_PAYMENT_TYPES) {
          return autoDepositPaymentTypes$;
        }
        return paymentTypes$;
      });
      const result$ = component.isBillMePaymentTypesEnabled$;
      result$.subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should return Observable<boolean> for isCreditPaymentTypeEnabled$', () => {
      const autoDepositPaymentTypes$ = of([PAYMENT_TYPE.CREDIT]);
      const paymentTypes$ = of([PAYMENT_TYPE.CREDIT]);
      settingsFacadeService.getSetting = jest.fn().mockImplementation(setting => {
        if (setting === Settings.Setting.AUTO_DEPOSIT_PAYMENT_TYPES) {
          return autoDepositPaymentTypes$;
        }
        return paymentTypes$;
      });
      const result$ = component.isCreditPaymentTypeEnabled$;
      result$.subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should return Observable<BillMeMapping[]> for billmeMappingArr$', () => {
      const billmeMappingArr$ = of([
        {
          /* your BillMeMapping object here */
        },
      ]);
      settingsFacadeService.getSetting = jest.fn().mockReturnValue(billmeMappingArr$);
      const result$ = component.billmeMappingArr$;
      result$.subscribe(result => {
        expect(result).toEqual([
          {
            /* your BillMeMapping object here */
          },
        ]);
      });
    });

    it('should track by account ID', () => {
      const index = 5;
      const result = component.trackByAccountId(index);
      expect(result).toMatch(new RegExp(`^${index}-`)); // Ensures the format is `index-random`
    });

    it('should parse float value correctly', () => {
      const value = '123.45';
      const result = component.parseFloat(value);
      expect(result).toBe(123.45);
    });

    it('should navigate to add credit card if payment system is MONETRA', async () => {
      const definePaymentSystemTypeSpy = jest
        .spyOn(component as any, 'definePaymentSystemType')
        .mockResolvedValue(PAYMENT_SYSTEM_TYPE.MONETRA);
      const addUSAePayCreditCardSpy = jest.spyOn(component as any, 'addUSAePayCreditCard');
      const routerSpy = jest.spyOn(router, 'navigate');

      await component.onPaymentMethodChanged('addCC');

      expect(definePaymentSystemTypeSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalled();
      expect(addUSAePayCreditCardSpy).not.toHaveBeenCalled();
    });

    it('should call addUSAePayCreditCard if payment system is not MONETRA', async () => {
      const definePaymentSystemTypeSpy = jest
        .spyOn(component as any, 'definePaymentSystemType')
        .mockResolvedValue(PAYMENT_SYSTEM_TYPE.OPCS); // Adjust if there's another system type
      const addUSAePayCreditCardSpy = jest.spyOn(component as any, 'addUSAePayCreditCard');
      const routerSpy = jest.spyOn(router, 'navigate');

      await component.onPaymentMethodChanged('addCC');

      expect(definePaymentSystemTypeSpy).toHaveBeenCalled();
      expect(addUSAePayCreditCardSpy).toHaveBeenCalled();
      expect(routerSpy).not.toHaveBeenCalled();
    });

    it('should handle non addCC values', async () => {
      const defineDestAccountsSpy = jest.spyOn(component as any, 'defineDestAccounts').mockResolvedValue(undefined);
      const setValidatorsSpy = jest.spyOn(component as any, 'setValidators');

      await component.onPaymentMethodChanged('someOtherValue');

      expect(defineDestAccountsSpy).toHaveBeenCalledWith('someOtherValue');
      expect(setValidatorsSpy).toHaveBeenCalled();
    });

    it('should set BILLME type and call setBillmeActiveAccount', async () => {
      // Set up mocks
      const mockBillmeDestinationAccounts = ['account1', 'account2'] as any;

      // Mock properties
      component['billmeDestinationAccounts'] = mockBillmeDestinationAccounts;
      component['creditCardDestinationAccounts'] = mockBillmeDestinationAccounts;

      // Call the method
      await component['defineDestAccounts']({ id: 'some-id' } as any);

      // Assertions
      expect(component.activePaymentType).toBe(PAYMENT_TYPE.CREDIT);
      expect(component.destinationAccounts).toBe(mockBillmeDestinationAccounts);
    });

    it('should set CREDIT type and not call setBillmeActiveAccount', async () => {
      // Set up mocks
      const setBillmeActiveAccountSpy = jest
        .spyOn(component as any, 'setBillmeActiveAccount')
        .mockResolvedValue(undefined);

      // Mock properties
      component['billmeDestinationAccounts'] = ['account1', 'account2'] as any;
      component['creditCardDestinationAccounts'] = ['credit1', 'credit2'] as any;

      // Call the method
      await component['defineDestAccounts'](PAYMENT_TYPE.CREDIT);

      // Assertions
      expect(component.activePaymentType).toBe(PAYMENT_TYPE.CREDIT);
      expect(component.destinationAccounts).toBe(component['creditCardDestinationAccounts']);
      expect(setBillmeActiveAccountSpy).not.toHaveBeenCalled();
    });

    it('should reset account and amountToDeposit if payment type changes', async () => {
      // Set up mocks
      const resetSpy = jest.spyOn(component.account, 'reset');
      const resetAmountSpy = jest.spyOn(component.amountToDeposit, 'reset');

      // Set initial active payment type
      component.activePaymentType = PAYMENT_TYPE.CREDIT;

      // Mock properties
      component['billmeDestinationAccounts'] = [
        { id: '1', accountDisplayName: 'name1' },
        { id: '2', accountDisplayName: 'name2' },
      ] as any;
      component['creditCardDestinationAccounts'] = [
        { id: '1', accountDisplayName: 'name1' },
        { id: '2', accountDisplayName: 'name2' },
      ] as any;

      // Call the method with a different payment type
      await component['defineDestAccounts'](PAYMENT_TYPE.BILLME);

      // Assertions
      expect(resetSpy).toHaveBeenCalled();
      expect(resetAmountSpy).toHaveBeenCalled();
    });

    it('should set paymentMethodAccount to PAYMENT_TYPE.BILLME if not found in creditCardSourceAccounts', () => {
      // Mock data
      const settings = {
        fromAccountId: 'account1',
        toAccountId: 'account2',
      } as any;

      const accounts = [
        { id: 'account1', name: 'Account 1' },
        { id: 'account2', name: 'Account 2' },
        { id: 'account3', name: 'Account 3' },
      ] as any[];

      component['creditCardSourceAccounts'] = [{ id: 'account3', accountDisplayName: 'Account 3' } as any];

      // Call the method
      component['initPredefinedAccounts'](settings, accounts);

      // Assertions
      expect(component['paymentMethodAccount']).toBe(PAYMENT_TYPE.BILLME);
      expect(component['destinationAccount']).toEqual(accounts[1]); // toAccountId should match the account with id 'account2'
    });

    it('should return true if the account is in billmeSourceAccounts', () => {
      const account = { id: 'billme-account' } as any;
      component['billmeSourceAccounts'] = [{ id: 'billme-account' } as any];

      const result = component['isBillMeAccount'](account);

      expect(result).toBe(true);
    });

    it('should return false if the account is not in billmeSourceAccounts', () => {
      const account: UserAccount = { id: 'non-billme-account' } as any;
      component['billmeSourceAccounts'] = [{ id: 'billme-account' } as any];

      const result = component['isBillMeAccount'](account);

      expect(result).toBe(false);
    });

    it('should set activeAutoDepositType when _activeType is called', () => {
      component['_activeType'] = 5;

      expect(component['activeAutoDepositType']).toBe(5);
    });

    it('should set activeFrequency when _activeFrequency is called', () => {
      component['_activeFrequency'] = 'monthly';

      expect(component['activeFrequency']).toBe('monthly');
    });

    it('should call deleteForm and set _activeType when deposit type is automaticDepositOff', async () => {
      const type = component.autoDepositTypes.automaticDepositOff;

      jest.spyOn(component as any, 'deleteForm').mockImplementation(() => {});
      jest.spyOn(component as any, 'updateFormStateByDepositType').mockResolvedValue(undefined);

      await component.onDepositTypeChangedHandler(type);

      expect(component['deleteForm']).toHaveBeenCalled();
    });

    it('should call initForm when deposit type is lowBalance', async () => {
      // Set up initial state
      component.activeAutoDepositType = 0;
      const type = component.autoDepositTypes.lowBalance;

      // Spy on methods
      jest.spyOn(component as any, 'initForm').mockImplementation(() => {});
      jest.spyOn(component as any, 'updateFormStateByDepositType').mockResolvedValue(undefined);

      // Call the method
      await component.onDepositTypeChangedHandler(type);

      // Assertions
      expect(component['initForm']).toHaveBeenCalled();
      expect(component['updateFormStateByDepositType']).toHaveBeenCalledWith(type, component.activeFrequency);
    });

    it('should update _activeFrequency and call updateFormStateByDepositType', async () => {
      // Arrange
      const newFrequency = 'monthly';
      jest.spyOn(component as any, 'updateFormStateByDepositType').mockResolvedValue(undefined);

      // Act
      await component.onFrequencyChanged(newFrequency);

      // Assert
      expect(component['updateFormStateByDepositType']).toHaveBeenCalledWith(
        component.activeAutoDepositType,
        newFrequency
      );
    });

    it('should handle form invalid case', async () => {
      await component.onSubmit();

      expect(loadingService.showSpinner).toHaveBeenCalled();
      expect(component['showModal']).not.toHaveBeenCalled();
      expect(component['showToast']).not.toHaveBeenCalled();
    });

    it('should handle form null case', async () => {
      component.automaticDepositForm = null;

      autoDepositService.updateAutoDepositSettings.mockReturnValue(of({}));

      await component.onSubmit();

      expect(loadingService.showSpinner).toHaveBeenCalled();
      expect(autoDepositService.updateAutoDepositSettings).toHaveBeenCalledWith({
        ...component.autoDepositSettings,
        active: false,
      });
      expect(loadingService.closeSpinner).toHaveBeenCalled();
    });

    it('should handle valid form and timeBased deposit type', async () => {
      component.automaticDepositForm = {
        invalid: false,
        value: { paymentMethod: 'credit', account: { id: '123' } },
      } as any;
      component.activeAutoDepositType = AUTO_DEPOSIT_PAYMENT_TYPES.timeBased;
      component.activeFrequency = DEPOSIT_FREQUENCY.week;

      autoDepositService.updateAutoDepositSettings.mockReturnValue(of({}));

      await component.onSubmit();

      expect(loadingService.showSpinner).toHaveBeenCalled();
      expect(autoDepositService.updateAutoDepositSettings).toHaveBeenCalled();
      expect(loadingService.closeSpinner).toHaveBeenCalled();
    });

    it('should handle error case in updateAutoDepositSettings', async () => {
      component.automaticDepositForm = {
        invalid: false,
        value: { paymentMethod: 'credit', account: { id: '123' } },
      } as any;

      autoDepositService.updateAutoDepositSettings.mockReturnValue(throwError(() => new Error('Test Error')));

      await component.onSubmit();

      expect(loadingService.showSpinner).toHaveBeenCalled();
      expect(autoDepositService.updateAutoDepositSettings).toHaveBeenCalled();
      expect(loadingService.closeSpinner).toHaveBeenCalled();
    });

    it('should initialize the form and set validators and billme active account', async () => {
      component['initPaymentFormBlock'] = jest.fn().mockReturnValue({}); // Mocking initPaymentFormBlock method
      component['setValidators'] = jest.fn().mockResolvedValue(undefined);
      component['setBillmeActiveAccount'] = jest.fn().mockResolvedValue(undefined);
      component.formHasBeenPrepared = { next: jest.fn() } as any;

      const paymentBlock = { someControl: [] }; // Define the expected structure for the payment block
      (component['initPaymentFormBlock'] as jest.Mock).mockReturnValue(paymentBlock);

      await component['initForm']();

      // Verify if setValidators and setBillmeActiveAccount were called
      expect(component['setValidators']).toHaveBeenCalled();
      expect(component['setBillmeActiveAccount']).toHaveBeenCalled();

      // Ensure formHasBeenPrepared.next(true) was called
      expect(component.formHasBeenPrepared.next).toHaveBeenCalledWith(true);

      // Ensure automaticDepositForm is initialized properly
      expect(component.automaticDepositForm).toBeInstanceOf(FormGroup);
      expect(component.automaticDepositForm).not.toBeNull();
    });

    it('should not set activeBillMeAccount if activePaymentType is not BILLME', async () => {
      component.activePaymentType = PAYMENT_TYPE.CREDIT;
      component.automaticDepositForm = { value: { account: 'some-account' } as any } as any;

      await component['setBillmeActiveAccount']();

      expect(component.activeBillMeAccount).toBeUndefined();
    });

    it('should not set activeBillMeAccount if automaticDepositForm is missing', async () => {
      component.activePaymentType = PAYMENT_TYPE.BILLME;
      component.automaticDepositForm = null;

      await component['setBillmeActiveAccount']();

      expect(component.activeBillMeAccount).toBeUndefined();
    });

    it('should set activeBillMeAccount correctly on successful response', async () => {
      const mockAccount = 'some-account';
      const mockActiveBillMeAccount = 'some-active-billme-account';

      depositService.sourceAccForBillmeDeposit.mockReturnValue(of(mockActiveBillMeAccount));
      component.activePaymentType = PAYMENT_TYPE.BILLME;
      component.automaticDepositForm = { value: { account: mockAccount } } as any;

      await component['setBillmeActiveAccount']();

      expect(component.activeBillMeAccount).toBeUndefined();
    });

    it('should update the form state correctly and call the necessary methods', async () => {
      const mockType = 1;
      const mockFrequency = 'daily';
      const mockControl = {
        mockControlName: ['mockControlValue', []],
      };

      // Mock methods
      component['getControlByActiveState'] = jest.fn().mockReturnValue(mockControl);
      component['updateActiveState'] = jest.fn();
      component['setValidators'] = jest.fn().mockResolvedValue(undefined);

      // Call the method
      await component['updateFormStateByDepositType'](mockType, mockFrequency);

      // Verify that getControlByActiveState was called with the correct arguments
      expect(component['getControlByActiveState']).toHaveBeenCalledWith(mockType, mockFrequency);

      // Verify that addControl was called with correct arguments
      expect(component.automaticDepositForm.contains('mockControlName')).toBe(true);
      const control = component.automaticDepositForm.get('mockControlName') as FormControl;
      expect(control.value).toBe('mockControlValue');
      expect(control.disabled).toBe(false); // Control is not disabled as per mockControlSetting

      // Verify that updateActiveState and setValidators were called
      expect(component['updateActiveState']).toHaveBeenCalledWith(mockType, mockFrequency);
      expect(component['setValidators']).toHaveBeenCalled();
    });
  });

  it('should call cleanControls and return the correct control for lowBalance type', () => {
    const mockLowBalanceControl = { lowBalanceControlName: ['lowBalanceControlValue', []] };

    // Mock methods
    component['cleanControls'] = jest.fn();
    component['initLowBalanceFormBlock'] = jest.fn().mockReturnValue(mockLowBalanceControl);

    const result = component['getControlByActiveState'](component.autoDepositTypes.lowBalance, 'daily');

    // Verify cleanControls was called with correct arguments
    expect(component['cleanControls']).toHaveBeenCalledWith([
      component.controlNames.dayOfMonth,
      component.controlNames.dayOfWeek,
    ]);

    // Verify initLowBalanceFormBlock was called and returned correct control
    expect(component['initLowBalanceFormBlock']).toHaveBeenCalled();
    expect(result).toEqual(mockLowBalanceControl);
  });

  it('should call cleanControls and return the correct control for timeBased type with month frequency', () => {
    const mockTimeBasedControl = { timeBasedControlName: ['timeBasedControlValue', []] };

    // Mock methods
    component['cleanControls'] = jest.fn();
    component['initTimeBasedBlock'] = jest.fn().mockReturnValue(mockTimeBasedControl);

    const result = component['getControlByActiveState'](
      component.autoDepositTypes.timeBased,
      component.frequency.month
    );

    // Verify cleanControls was called with correct arguments
    expect(component['cleanControls']).toHaveBeenCalledWith([
      component.controlNames.lowBalanceAmount,
      component.controlNames.dayOfWeek,
    ]);

    // Verify initTimeBasedBlock was called with correct frequency and returned correct control
    expect(component['initTimeBasedBlock']).toHaveBeenCalledWith(component.frequency.month);
    expect(result).toEqual(mockTimeBasedControl);
  });

  it('should call cleanControls and return the correct control for timeBased type with other frequency', () => {
    const mockTimeBasedControl = { timeBasedControlName: ['timeBasedControlValue', []] };

    // Mock methods
    component['cleanControls'] = jest.fn();
    component['initTimeBasedBlock'] = jest.fn().mockReturnValue(mockTimeBasedControl);

    const result = component['getControlByActiveState'](component.autoDepositTypes.timeBased, 'weekly');

    // Verify cleanControls was called with correct arguments
    expect(component['cleanControls']).toHaveBeenCalledWith([
      component.controlNames.lowBalanceAmount,
      component.controlNames.dayOfMonth,
    ]);

    // Verify initTimeBasedBlock was called with correct frequency and returned correct control
    expect(component['initTimeBasedBlock']).toHaveBeenCalledWith('weekly');
    expect(result).toEqual(mockTimeBasedControl);
  });

  it('should update _activeType and _activeFrequency properties correctly', () => {
    const testType = 1;
    const testFrequency = 'monthly';

    // Call the method with test values
    component['updateActiveState'](testType, testFrequency);

    // Verify that _activeType and _activeFrequency are updated correctly
    expect(component.activeAutoDepositType).toBe(testType);
  });

  it('should remove controls that exist in the form', () => {
    component.automaticDepositForm = formBuilder.group({
      control1: ['value1'],
      control2: ['value2'],
      control3: ['value3'],
    });
    // List of controls to be removed
    const controlsToRemove = ['control1', 'control2'];

    // Call the method
    component['cleanControls'](controlsToRemove);

    // Check that controls are removed
    expect(component.automaticDepositForm.contains('control1')).toBeFalsy();
    expect(component.automaticDepositForm.contains('control2')).toBeFalsy();
    // Check that a control that wasn't removed still exists
    expect(component.automaticDepositForm.contains('control3')).toBeTruthy();
  });

  it('should not alter the form if no controls match', () => {
    component.automaticDepositForm = formBuilder.group({
      control1: ['value1'],
      control2: ['value2'],
      control3: ['value3'],
    });
    // List of controls that do not exist
    const controlsToRemove = ['nonexistentControl1', 'nonexistentControl2'];

    // Call the method
    component['cleanControls'](controlsToRemove);

    // Check that the form remains unchanged
    expect(component.automaticDepositForm.contains('control1')).toBeTruthy();
    expect(component.automaticDepositForm.contains('control2')).toBeTruthy();
    expect(component.automaticDepositForm.contains('control3')).toBeTruthy();
  });

  it('should return the correct error decorators for BILLME payment type', async () => {
    const mockMaxSetting = { value: '1000' };
    const mockMinSetting = { value: '10' };
    const amountToDeposit = 'amountToDeposit'; // Ensure this matches the key in CONTROL_ERROR

    settingsFacadeService.getSetting.mockImplementation(setting => {
      if (setting === Settings.Setting.BILLME_AMOUNT_MAX) {
        return of(mockMaxSetting);
      } else if (setting === Settings.Setting.BILLME_AMOUNT_MIN) {
        return of(mockMinSetting);
      }
      return of({ value: '0' }); // Default return for unexpected settings
    });

    // Call the function and get the errors
    const errors = await component['getAmountToDepositErrors']();

    // Check that the errors array contains functions
    expect(errors.length).toBe(4);
  });

  it('should initialize payment form block with correct values and validators', () => {
    component['destinationAccount'] = { id: 'test-account' } as any;
    component['autoDepositSettings'] = { amount: 100, lowBalanceAmount: 100 };
    component['paymentMethodAccount'] = { id: 'test-account' } as any;
    // Call the method to get the form block configuration
    const result = component['initPaymentFormBlock']();

    // Assert the result matches the expected values
    expect(result).toBeDefined();
  });

  it('should initialize time-based block correctly for month frequency', () => {
    component['autoDepositSettings'] = {
      dayOfMonth: 15, // Example value for month
      dayOfWeek: 3, // Example value for week
    } as any;

    const frequency = 'month';

    const result = component['initTimeBasedBlock'](frequency);

    expect(result).toBeDefined();
  });

  it('should initialize time-based block correctly for non-month frequency', () => {
    component['autoDepositSettings'] = {
      dayOfMonth: 15, // Example value for month
      dayOfWeek: 3, // Example value for week
    } as any;

    const frequency = 'week'; // Non-month frequency

    const result = component['initTimeBasedBlock'](frequency);
    expect(result).toBeDefined();
  });

  it('should initialize low balance form block correctly', () => {
    component.autoDepositSettings = { lowBalanceAmount: 100 } as any;
    const result = component['initLowBalanceFormBlock']();

    const expectedResult = {
      [AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount]: [100], // Expected lowBalanceAmount value
    };

    expect(result).toEqual(expectedResult);
  });

  it('should return the correct title for lowBalance type', () => {
    component.activeAutoDepositType = AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance;

    const result = component['getModalTitle']();

    expect(result).toBe(AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.lowBalance);
  });

  it('should return the correct title for timeBased type with monthly frequency', () => {
    component.activeAutoDepositType = AUTO_DEPOSIT_PAYMENT_TYPES.timeBased;
    component.activeFrequency = DEPOSIT_FREQUENCY.month;

    const result = component['getModalTitle']();

    expect(result).toBe(AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.monthly);
  });

  it('should return the correct title for timeBased type with weekly frequency', () => {
    component.activeAutoDepositType = AUTO_DEPOSIT_PAYMENT_TYPES.timeBased;
    component.activeFrequency = DEPOSIT_FREQUENCY.week;

    const result = component['getModalTitle']();

    expect(result).toBe(AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.weekly);
  });

  it('should return the correct title for automaticDepositOff type', () => {
    component.activeAutoDepositType = AUTO_DEPOSIT_PAYMENT_TYPES.automaticDepositOff;

    const result = component['getModalTitle']();

    expect(result).toBe(AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.off);
  });

  it('should return the correct message for lowBalance type', () => {
    component.activeAutoDepositType = AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance;
    const result = component['getModalBodyMessage']();

    expect(result).toBe("We'll automatically add $ every time your undefined account drops below $.");
  });

  it('should return the correct message for lowBalance type', () => {
    component.activeAutoDepositType = AUTO_DEPOSIT_PAYMENT_TYPES.timeBased;

    const result = component['getModalBodyMessage']();

    expect(result).toBe("We'll automatically add $ every week on undefined to your undefined account.");
  });

  it('should correctly parse and return the payment system type', async () => {
    settingsFacadeService.getSetting.mockReturnValue(of({ value: '123' }));

    const expectedPaymentSystemType = 123;

    const result = await component['definePaymentSystemType']();

    expect(result).toBe(expectedPaymentSystemType);

    expect(settingsFacadeService.getSetting).toHaveBeenCalledWith(Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE);
  });

});
