import { TestBed } from '@angular/core/testing';
import { UserAccount } from '@core/model/account/account.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AccountsService } from '@sections/dashboard/services';
import { CreditCardService } from './credit-card.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    const externalPaymentServiceStub = () => ({
      addUSAePayCreditCard: () => ({})
    });
    const loadingServiceStub = () => ({
      closeSpinner: () => ({}),
      showSpinner: () => ({})
    });
    const toastServiceStub = () => ({
      showToast: object => ({}),
      showError: (message, duration) => ({})
    });
    const accountsServiceStub = () => ({
      getUserAccounts: array => ({}),
      removeCreditCardAccount: userAccount => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        CreditCardService,
        {
          provide: ExternalPaymentService,
          useFactory: externalPaymentServiceStub
        },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: AccountsService, useFactory: accountsServiceStub }
      ]
    });
    service = TestBed.inject(CreditCardService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('removeCreditCardAccount', () => {
    it('makes expected calls', () => {
      const userAccountStub: UserAccount = <any>{};
      const accountsServiceStub: AccountsService = TestBed.inject(
        AccountsService
      );
     jest.spyOn(accountsServiceStub, 'removeCreditCardAccount');
      service.removeCreditCardAccount(userAccountStub);
      expect(accountsServiceStub.removeCreditCardAccount).toHaveBeenCalled();
    });
  });

  describe('addCreditCard', () => {
    it('makes expected calls', () => {
      const externalPaymentServiceStub: ExternalPaymentService = TestBed.inject(
        ExternalPaymentService
      );
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
     jest.spyOn(
        externalPaymentServiceStub,
        'addUSAePayCreditCard'
      );
     jest.spyOn(loadingServiceStub, 'closeSpinner');
      service.addCreditCard();
      expect(
        externalPaymentServiceStub.addUSAePayCreditCard
      ).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('retrieveAccounts', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      const accountsServiceStub: AccountsService = TestBed.inject(
        AccountsService
      );
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
     jest.spyOn(accountsServiceStub, 'getUserAccounts');
      service.retrieveAccounts();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(accountsServiceStub.getUserAccounts).toHaveBeenCalled();
    });
  });
});
