import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserAccount } from '@core/model/account/account.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController, IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { AccountsService } from '@sections/dashboard/services';
import { ConfirmModule } from '@shared/confirm-modal/confirm-modal.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { CreditCardService } from '../credit-card.service';
import { CardCs } from './card-list/credit-card-list.component';
import { StCreditCardListModule } from './card-list/credit-card-list.module';
import { CreditCardMgmtComponent } from './credit-card-mgmt.component';

describe('CreditCardMgmtComponent', () => {
  let fixture: ComponentFixture<CreditCardMgmtComponent>;
  let component: CreditCardMgmtComponent;
  let accountService, creditCardService, modalControler, loadingService, toastService, alertCtrl, popoverCtrl;

  beforeEach(async () => {
    (accountService = {}),
      (creditCardService = {
        addCreditCard: jest.fn(),
        removeCreditCardAccount: jest.fn().mockResolvedValue(true),
        retrieveAccounts: jest.fn().mockResolvedValue([
          {
            account: {
              accountDisplayName: 'Bonus Bucks',
              accountTender: '802',
              accountType: 3,
              balance: 3326.14,
              billingAddressId: null,
              depositAccepted: true,
              expirationMonth: null,
              expirationYear: null,
              id: 'T:1:efa5035a-0c8f-4e31-b7e4-d7f0484fb792:802',
              institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
              isActive: true,
              lastFour: null,
              nameOnMedia: null,
              paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
              paymentSystemType: 1,
              userId: 'efa5035a-0c8f-4e31-b7e4-d7f0484fb792',
            },
            display: '',
            iconSrc: '',
          },
        ]),
      }),
      (modalControler = {}),
      (loadingService = {
        showSpinner: jest.fn(),
        closeSpinner: jest.fn()
      }),
      (toastService = {
        showToast: jest.fn()
      }),
      (alertCtrl = {}),
      (popoverCtrl = {});

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        IonicModule,
        StHeaderModule,
        ConfirmModule,
        StButtonModule,
        StCreditCardListModule,
        RouterTestingModule,
      ],
      declarations: [CreditCardMgmtComponent],
      providers: [
        { provide: AccountsService, useValue: accountService },
        { provide: CreditCardService, useValue: creditCardService },
        { provide: ModalController, useValue: modalControler },
        { provide: LoadingService, useValue: loadingService },
        { provide: ToastService, useValue: toastService },
        { provide: AlertController, useValue: alertCtrl },
        { provide: PopoverController, useValue: popoverCtrl },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CreditCardMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create the CreditCardMgmtComponent', async () => {
    expect(component).toBeTruthy();
  });

  it('On remove confirm should delete user account and retrieve all accounts  ', async () => {
    const spyDeleteAccounts = jest.spyOn(creditCardService, 'removeCreditCardAccount');
    const spyRetrieveAccounts = jest.spyOn(creditCardService, 'retrieveAccounts');

    await component.onRemoveConfirmed({} as UserAccount, {} as CardCs);

    expect(spyRetrieveAccounts).toHaveBeenCalledTimes(1);
    expect(spyDeleteAccounts).toHaveBeenCalledTimes(1);
  });

  it('On add creditCard account should retrieve all accounts  ', async () => {
    const spyAddAccount = jest.spyOn(creditCardService, 'addCreditCard');
    const spyRetrieveAccounts = jest.spyOn(creditCardService, 'retrieveAccounts');

    await component.addCreditCard();

    expect(spyAddAccount).toHaveBeenCalledTimes(1);
    expect(spyRetrieveAccounts).toHaveBeenCalledTimes(1);
  });
});
