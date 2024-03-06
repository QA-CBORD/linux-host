import { of } from 'rxjs';
import { DepositPageComponent } from './deposit-page.component';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { ToastService } from '@core/service/toast/toast.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { CommonService } from '@shared/index';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { AppRateService } from '@shared/services/app-rate/app-rate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DepositModule } from './deposit.module';
import { Storage } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { By } from '@angular/platform-browser';
import { AccountType } from 'src/app/app.global';
import { DepositCsModel } from './deposit-page.content.string';
import { UserAccount } from '@core/model/account/account.model';

const fb = new FormBuilder();

const orderingService = {};

const commonService = {
  getString: jest.fn(() => {
    return 'test';
  }),
};

const depositService = {
  getSettingByName: jest.fn().mockReturnValue({
    id: '13cba56e-d78e-4c55-9f04-d73037ebcdea',
    name: 'allow_freeform_onetime_amounts',
    domain: 'get',
    category: 'deposit',
    contentMediaType: 3,
    value: '[1,2]',
    description: 'Whether free-form amount entry is allowed for registered users.',
  }),
  settings$: of([
    {
      name: 'test',
      value: '1',
      category: 'cat',
    } as SettingInfo,
    {
      name: 'test2',
      value: '3',
      category: 'cat 2',
    } as SettingInfo,
  ] as SettingInfo[]),
  accounts$: of([]),
  calculateDepositFee: jest.fn().mockReturnValue(of(42)),
  getUserAccounts: jest.fn().mockReturnValue(of([])),
  filterAccountsByPaymentSystem: jest.fn().mockReturnValue([]),
  filterCreditCardDestAccounts: jest.fn().mockReturnValue([]),
  filterBillmeDestAccounts: jest.fn().mockReturnValue([]),
  sourceAccForBillmeDeposit: jest.fn().mockReturnValue(of({})),
};

const userFacadeService = {
  isApplePayEnabled$: jest.fn(() => {
    return of(true);
  }),
};

const externalPaymentService = {
  payWithApplePay: jest.fn().mockResolvedValue({ success: true }),
};

const cdRef = {};

const modalController = {
  create: jest.fn().mockResolvedValue({ present: jest.fn(), onDidDismiss: jest.fn().mockResolvedValue(true) }),
  dismiss: jest.fn(),
  present: jest.fn(),
  onDidDismiss: jest.fn().mockResolvedValue({ role: BUTTON_TYPE.RETRY }),
};

const toastService = {};

const popoverCtrl = {
  create: jest.fn().mockResolvedValue({
    present: jest.fn().mockResolvedValue(true),
    onDidDismiss: jest.fn().mockReturnValue(Promise.resolve()),
  }),
};

const appRateService = {
  evaluateToRequestRateApp: jest.fn().mockResolvedValue(null),
};

const loadingService = {
  showSpinner: jest.fn(),
  closeSpinner: jest.fn(),
};

const storage = {
  clear: jest.fn(),
  ready: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
};

const router = {
  navigate: jest.fn().mockResolvedValue(true),
};

const accounts = [
  {
    id: 'T:1:8b230383-0b35-4b0a-87b3-ec6f62dedd34:800',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'GET Meals',
    paymentSystemType: 1,
    accountTender: '800',
    isAccountTenderActive: true,
    accountType: 1,
    depositAccepted: false,
    lastFour: null,
    nameOnMedia: null,
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: null,
    balance: 0,
  },
  {
    id: 'T:1:8b230383-0b35-4b0a-87b3-ec6f62dedd34:801',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Dining Dollars',
    paymentSystemType: 1,
    accountTender: '801',
    isAccountTenderActive: true,
    accountType: 3,
    depositAccepted: true,
    lastFour: null,
    nameOnMedia: null,
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: null,
    balance: 99759.73,
  },
  {
    id: 'T:1:8b230383-0b35-4b0a-87b3-ec6f62dedd34:802',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Bonus Bucks',
    paymentSystemType: 1,
    accountTender: '802',
    isAccountTenderActive: true,
    accountType: 3,
    depositAccepted: true,
    lastFour: null,
    nameOnMedia: null,
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: null,
    balance: 956.12,
  },
  {
    id: 'T:1:8b230383-0b35-4b0a-87b3-ec6f62dedd34:3',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Points',
    paymentSystemType: 1,
    accountTender: '3',
    isAccountTenderActive: true,
    accountType: 3,
    depositAccepted: true,
    lastFour: null,
    nameOnMedia: null,
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: null,
    balance: 100083.55,
  },
  {
    id: 'T:1:8b230383-0b35-4b0a-87b3-ec6f62dedd34:6',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Charge',
    paymentSystemType: 1,
    accountTender: '6',
    isAccountTenderActive: true,
    accountType: 2,
    depositAccepted: false,
    lastFour: null,
    nameOnMedia: null,
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: null,
    balance: -14,
  },
  {
    id: 'T:1:8b230383-0b35-4b0a-87b3-ec6f62dedd34:4',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Bonus Points',
    paymentSystemType: 1,
    accountTender: '4',
    isAccountTenderActive: true,
    accountType: 3,
    depositAccepted: true,
    lastFour: null,
    nameOnMedia: null,
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: null,
    balance: 991.11,
  },
  {
    id: 'T:1:8b230383-0b35-4b0a-87b3-ec6f62dedd34:9',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Aux Sales',
    paymentSystemType: 1,
    accountTender: '9',
    isAccountTenderActive: true,
    accountType: 2,
    depositAccepted: false,
    lastFour: null,
    nameOnMedia: null,
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: null,
    balance: 0,
  },
  {
    id: 'T:1:8b230383-0b35-4b0a-87b3-ec6f62dedd34:29',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Cafe Dollars',
    paymentSystemType: 1,
    accountTender: '29',
    isAccountTenderActive: true,
    accountType: 3,
    depositAccepted: true,
    lastFour: null,
    nameOnMedia: null,
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: null,
    balance: 200,
  },
  {
    id: '440c7611-cea8-4320-837d-8be2e551bddc',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'test',
    paymentSystemType: 4,
    accountTender: '2',
    isAccountTenderActive: true,
    accountType: 2,
    depositAccepted: false,
    lastFour: '4889',
    nameOnMedia: 'test',
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: 'a34fbaed-0e1c-4e88-a5d0-871d399bc2d8',
    balance: null,
  },
  {
    id: '3c194af6-aa5c-4449-bffa-e9e2a9886183',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Amex',
    paymentSystemType: 4,
    accountTender: '1',
    isAccountTenderActive: false,
    accountType: 2,
    depositAccepted: false,
    lastFour: '1005',
    nameOnMedia: 'Amex',
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: 'f76d91ca-3bdd-4a3e-a734-26c53b57f777',
    balance: null,
  },
  {
    id: '8a1122d3-43e6-48e3-9dd7-5a5aa26e5591',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Master card',
    paymentSystemType: 4,
    accountTender: '3',
    isAccountTenderActive: true,
    accountType: 2,
    depositAccepted: false,
    lastFour: '0049',
    nameOnMedia: 'Master card',
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: 'b83eafd5-f2e4-4ef0-a742-6465d151ef94',
    balance: null,
  },
  {
    id: '90a655dd-2ae1-4076-b984-936b40678749',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Visa',
    paymentSystemType: 4,
    accountTender: '4',
    isAccountTenderActive: true,
    accountType: 2,
    depositAccepted: false,
    lastFour: '0492',
    nameOnMedia: 'Visa',
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: '281356c8-99b5-4dda-a4e9-68f54ee4d006',
    balance: null,
  },
  {
    id: '7403738f-96c8-4ec4-b41f-c5474677beeb',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'new card',
    paymentSystemType: 4,
    accountTender: '3',
    isAccountTenderActive: true,
    accountType: 2,
    depositAccepted: false,
    lastFour: '8095',
    nameOnMedia: 'new card',
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: '9bcc5520-f96b-438f-8e8c-d2b1cb5ff791',
    balance: null,
  },
  {
    id: 'cba6a4a0-cbf4-4d18-beac-9d0372395bef',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
    userId: '8b230383-0b35-4b0a-87b3-ec6f62dedd34',
    isActive: true,
    accountDisplayName: 'Visa new',
    paymentSystemType: 4,
    accountTender: '4',
    isAccountTenderActive: true,
    accountType: 2,
    depositAccepted: false,
    lastFour: '0224',
    nameOnMedia: 'Visa new',
    expirationMonth: null,
    expirationYear: null,
    billingAddressId: '0f92c218-d496-42db-b7f5-71ce92be29f2',
    balance: null,
  },
];
describe('DepositPageComponent', () => {
  let component: DepositPageComponent;
  let fixture: ComponentFixture<DepositPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [DepositPageComponent],
      providers: [
        UserFacadeService,
        { provide: Storage, useValue: storage },
        { provide: DepositService, useValue: depositService },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: ModalController, useValue: modalController },
        { provide: ToastService, useValue: toastService },
        { provide: LoadingService, useValue: loadingService },
        { provide: ChangeDetectorRef, useValue: cdRef },
        { provide: ExternalPaymentService, useValue: externalPaymentService },
        { provide: CommonService, useValue: commonService },
        { provide: OrderingService, useValue: orderingService },
        { provide: AppRateService, useValue: appRateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.depositForm).toBeDefined();
  });

  it('should call getAccounts method on ngOnInit', () => {
    jest.spyOn(component as any, 'getAccounts');
    component.ngOnInit();
    expect(component['getAccounts']).toHaveBeenCalled();
  });

  it('should call depositService.getSettingByName method on ngOnInit', () => {
    jest.spyOn(component as any, 'getSettingByName');
    component.ngOnInit();
    expect(component['getSettingByName']).toHaveBeenCalled();
  });

  it('should show confirmation popover when confirmationDepositPopover is called', async () => {
    jest.spyOn(popoverCtrl, 'create');
    await component.confirmationDepositPopover({});
    expect(popoverCtrl.create).toHaveBeenCalled();
  });

  it('should show popover when payment method changes with credit billme', () => {
    component.billmeDestinationAccounts = [{ id: '1', balance: 1000 } as UserAccount];
    component.onPaymentMethodChanged({ target: { value: PAYMENT_TYPE.BILLME } });
    expect(component.destinationAccounts).toEqual(component.billmeDestinationAccounts);
  });

  it('should show popover when payment method changes with credit', () => {
    component.creditCardDestinationAccounts = [{ id: '3', balance: 777777 } as UserAccount];
    component.onPaymentMethodChanged({ target: { value: PAYMENT_TYPE.CREDIT } });
    expect(component.destinationAccounts).toEqual(component.creditCardDestinationAccounts);
  });

  it('should update the button label with amount on amount changes', () => {
    const button = fixture.debugElement.query(By.css('#depositBtnText'));
    component.contentString = { submitButtonText: 'test' } as DepositCsModel;
    component.onAmountChanged({ target: { value: '100' } });
    fixture.detectChanges();
    expect(button.nativeElement.textContent).toEqual('test $100');
  });

  it('should update the button label without amount on amount change', () => {
    const button = fixture.debugElement.query(By.css('#depositBtnText'));
    component.contentString = { submitButtonText: 'test' } as DepositCsModel;
    component.onAmountChanged({ target: {} });
    fixture.detectChanges();
    expect(button.nativeElement.textContent).toEqual('test');
  });

  it('should show confirmation popover with Apple Pay', () => {
    const spy = jest.spyOn(component, 'confirmationDepositPopover');
    component.sourceAccount.setValue({ accountType: AccountType.APPLEPAY });
    component.depositForm.setErrors({ invalid: true });
    component.onFormSubmit();
    expect(spy).not.toBeCalled();
  });

  it('should not call Apple Pay  when billme is payment method', async () => {
    const spy = jest.spyOn(externalPaymentService, 'payWithApplePay');
    component.sourceAccount.setValue(PAYMENT_TYPE.BILLME);
    component.selectedAccount.setValue({});
    component.mainFormInput.setValue('25');
    component.mainSelect.setValue('5');
    component.onFormSubmit();
    expect(spy).not.toBeCalled();
  });

  it('should call Apple Pay when it is the account type selected', () => {
    const spy = jest.spyOn(externalPaymentService, 'payWithApplePay');
    const spyConfirmation = jest.spyOn(component, 'confirmationDepositPopover');
    component.sourceAccount.setValue({ accountType: AccountType.APPLEPAY });
    component.selectedAccount.setValue({});
    component.mainFormInput.setValue('5');
    component.mainSelect.setValue('5');
    component.onFormSubmit();
    expect(spy).toBeCalled();
    expect(spyConfirmation).not.toBeCalled();
  });

  it('should calculate fee on billme payment type and prompt the confirmation', async () => {
    const spyFee = jest.spyOn(depositService, 'calculateDepositFee');
    const spyConfirmation = jest.spyOn(component, 'confirmationDepositPopover');
    component.sourceAccount.setValue(PAYMENT_TYPE.BILLME);
    component.selectedAccount.setValue({});
    component.mainFormInput.setValue('5');
    component.mainSelect.setValue('10');
    component.onFormSubmit();
    expect(spyFee).toBeCalled();
    expect(spyConfirmation).toBeCalled();
  });

  it('should filter the different accounts', () => {
    const spyAccounts = jest.spyOn(component as any, 'filterAccountsByPaymentSystem');
    const spyCreditcards = jest.spyOn(component as any, 'filterCreditCardDestAccounts');
    const spyBillme = jest.spyOn(component as any, 'filterBillmeDestAccounts');
    component['getAccounts']();
    expect(spyAccounts).toHaveBeenCalled();
    expect(spyCreditcards).toHaveBeenCalled();
    expect(spyBillme).toHaveBeenCalled();
  });

  it('should call depositService.filterAccountsByPaymentSystem method when filterAccountsByPaymentSystem is called', () => {
    const spy = jest.spyOn(depositService, 'filterAccountsByPaymentSystem');
    component['filterAccountsByPaymentSystem'](accounts);
    expect(spy).toHaveBeenCalled();
  });

  it('should call depositService.filterCreditCardDestAccounts method when filterCreditCardDestAccounts is called', () => {
    jest.spyOn(depositService, 'filterCreditCardDestAccounts');
    component['filterCreditCardDestAccounts']([], accounts);
    expect(depositService.filterCreditCardDestAccounts).toHaveBeenCalled();
  });

  it('should call depositService.filterBillmeDestAccounts method when filterBillmeDestAccounts is called', () => {
    jest.spyOn(depositService, 'filterBillmeDestAccounts');
    component['filterBillmeDestAccounts']([], []);
    expect(depositService.filterBillmeDestAccounts).toHaveBeenCalled();
  });

  it('should call depositService.souceAccForBillmeDeposit method when sourceAccForBillmeDeposit is called', () => {
    jest.spyOn(depositService, 'sourceAccForBillmeDeposit');
    component['sourceAccForBillmeDeposit']({} as any, []);
    expect(depositService.sourceAccForBillmeDeposit).toHaveBeenCalled();
  });

  it('should call depositService.getSettingByName method when getSettingByName is called', () => {
    jest.spyOn(depositService, 'getSettingByName');
    component['getSettingByName']([], '');
    expect(depositService.getSettingByName).toHaveBeenCalled();
  });

  it('should format the input amount', () => {
    component.formatInput({ target: { value: '100.595' } });
    expect(component.mainFormInput.value).toEqual('100.5');
  });
});
