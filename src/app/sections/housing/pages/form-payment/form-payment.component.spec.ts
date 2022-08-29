import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { StInputAmountModule } from '@sections/accounts/pages/deposit-page/input-amount/input-amount.module';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { CreditCardTypePipeModule } from '@sections/accounts/shared/pipes/credit-card-type/credit-card-type.module';
import { ConfirmDepositPopoverModule } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module';
import { DepositModalModule } from '@sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { ContractsService } from '@sections/housing/contracts/contracts.service';
import { StCreditCardListModule } from '@sections/settings/creditCards/credit-card-mgmt/card-list/credit-card-list.module';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { of } from 'rxjs';
import { FormPaymentComponent } from "./form-payment.component";
import { FormType } from './form-payment.service';
import { MockCurrentForm } from './form-payment.service.spec';

const cardInfo = JSON.parse(JSON.stringify({ "sourceAcc": { "accountTender": "4", "lastFour": "2224" }, "selectedAccount": { "accountDisplayName": "R19c08 student", "accountType": 2 }, "amount": "60.00" }));

const card = JSON.parse(JSON.stringify({
  "display": "Visa ending in 2224",
  "account": {
    "id": "63e3978c-4804-496b-9b52-e9504b7ea42a",
    "institutionId": "7b651444-2531-4e77-9daa-0a44087b3472",
    "paymentSystemId": "8a244198-8aa6-4294-bda9-774c3830ea71",
    "userId": "1208a4c0-cbe9-4819-a6fe-978c80638f43",
    "isActive": true,
    "accountDisplayName": "R19c08 student",
    "paymentSystemType": 4,
    "accountTender": "4",
    "accountType": 2,
    "depositAccepted": false,
    "lastFour": "2224",
    "nameOnMedia": "R19c08 student",
    "expirationMonth": null,
    "expirationYear": null,
    "billingAddressId": "f715a906-8505-4b13-880f-0307c3f9f4fd",
    "balance": null
  },
  "iconSrc": "/assets/icon/visa_dark.svg"
}));

const cd = {
  detectChanges: jest.fn(),
};

const depositService = {
  makePayment: jest.fn(() => of("")),
};

const _loadingService = {
  showSpinner: jest.fn(),
  closeSpinner: jest.fn(),
};

const creditCardService = {
  addCreditCard: jest.fn(() => of(true)),
  retrieveAccounts: jest.fn(() => of(true))
};

const applicationsService = {
  saveApplication: jest.fn(() => of(true)),
  submitApplication: jest.fn(() => of(true))
};

const contractsService = {
  submitContract: jest.fn(() => of(true))
};

const popoverCtrl = {
  create: jest.fn(() => ({
    onDidDismiss: () => ({ then: () => of({ role: BUTTON_TYPE.OKAY }) }),
    present: () => of(true)
  }))
};

const modalCtrl = {
  create: jest.fn(() => ({
    present: () => of(true)
  }))
};

const accountService = {};


describe("FormPaymentComponent", () => {
  let component: FormPaymentComponent;
  let fixture: ComponentFixture<FormPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPaymentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        HttpClientModule,
        StPopoverLayoutModule,
        TransactionUnitsPipeModule,
        CreditCardTypePipeModule,
        StCreditCardListModule,
        StInputAmountModule,
        ConfirmDepositPopoverModule,
        DepositModalModule,
        StButtonModule,
      ],
      providers: [
        { provide: DepositService, useValue: depositService },
        { provide: CreditCardService, useValue: creditCardService },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: ModalController, useValue: modalCtrl },
        { provide: ApplicationsService, useValue: applicationsService },
        { provide: LoadingService, useValue: _loadingService },
        { provide: ChangeDetectorRef, useValue: cd },
        { provide: ContractsService, useValue: contractsService },
        { provide: Location, useValue: location },
        { provide: AccountService, useValue: accountService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaymentComponent);
    component = fixture.componentInstance;
    component.currentForm = MockCurrentForm;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Form payment', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should add credit cards and refresh the cards', async () => {
      const spy = jest.spyOn(creditCardService, 'addCreditCard');
      const spy2 = jest.spyOn(creditCardService, 'retrieveAccounts');
      await component.addCreditCard();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });

    it('should  ask for confirmation', async () => {
      const spy = jest.spyOn(component as any, 'confirmPaymentPopover');
      await component.confirmPayment(card);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should make payment after confirmation', () => {
      const spy = jest.spyOn(component as any, 'makePayment');
      component['onConfirmation'](BUTTON_TYPE.OKAY, card.account, component.amountDue, cardInfo);
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockReset();
    });

    it('should NOT make payment after confirmation cancelled', () => {
      const spy = jest.spyOn(component as any, 'makePayment');
      component['onConfirmation'](BUTTON_TYPE.CANCEL, card.account, component.amountDue, cardInfo);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should show payment success modal', () => {
      const spy = jest.spyOn(component as any, 'openPaymentSuccessModal');
      component['onConfirmation'](BUTTON_TYPE.OKAY, card.account, component.amountDue, cardInfo);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call submit payment on success', async () => {
      const spy = jest.spyOn(applicationsService, 'submitApplication');
      await component['onPaymentSuccess'](cardInfo);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call submit contract on success', async () => {
      const spy = jest.spyOn(contractsService, 'submitContract');
      component.currentForm.type = FormType.WorkOrder;
      component.currentForm.details = {...component.currentForm.details, contractInfo: {contractName: "Test" }}
      fixture.detectChanges();
      await component['onPaymentSuccess'](cardInfo);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});