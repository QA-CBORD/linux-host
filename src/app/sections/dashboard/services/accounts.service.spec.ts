import { TestBed } from '@angular/core/testing';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(() => {
    const commerceApiServiceStub = () => ({
      getUserAccounts: () => ({ pipe: () => ({}) }),
      removeAccount: object => ({}),
      getAllowedPaymentsMethods: (sessionId, paymentSystemType, id) => ({})
    });
    const settingsFacadeServiceStub = () => ({
      getSetting: dISPLAY_TENDERS => ({ pipe: () => ({}) }),
      getSettings: settings => ({})
    });
    const authFacadeServiceStub = () => ({ getAuthSessionToken$: () => ({}) });
    const userFacadeServiceStub = () => ({ getUserData$: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AccountsService,
        { provide: CommerceApiService, useFactory: commerceApiServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub }
      ]
    });
    service = TestBed.inject(AccountsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('removeCreditCardAccount', () => {
    it('makes expected calls', () => {
      const commerceApiServiceStub: CommerceApiService = TestBed.inject(
        CommerceApiService
      );
      const userAccountStub: UserAccount = <any>{};
     jest.spyOn(commerceApiServiceStub, 'removeAccount');
      service.removeCreditCardAccount(userAccountStub);
      expect(commerceApiServiceStub.removeAccount).toHaveBeenCalled();
    });
  });

  describe('getAccountsFilteredByDisplayTenders', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
     jest.spyOn(service, 'transformStringToArray');
     jest.spyOn(service, 'getUserAccounts');
     jest.spyOn(settingsFacadeServiceStub, 'getSetting');
      service.getAccountsFilteredByDisplayTenders();
      expect(service.transformStringToArray).toHaveBeenCalled();
      expect(service.getUserAccounts).toHaveBeenCalled();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });

  describe('getAccountsFilteredByDepositTenders', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
     jest.spyOn(service, 'transformStringToArray');
     jest.spyOn(service, 'getUserAccounts');
     jest.spyOn(settingsFacadeServiceStub, 'getSetting');
      service.getAccountsFilteredByDepositTenders();
      expect(service.transformStringToArray).toHaveBeenCalled();
      expect(service.getUserAccounts).toHaveBeenCalled();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });
});
