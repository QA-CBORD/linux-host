import { TestBed } from '@angular/core/testing';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AccountService } from './accounts.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    const commerceApiServiceStub = () => ({
      getUserAccounts: () => ({ pipe: () => ({}) })
    });
    const contentStringsFacadeServiceStub = () => ({
      retrieveContentStringListByRequest: contentStringsParamsAccounts => ({}),
      fetchContentString$: (patronUi, mealDonation, dashboardTitle) => ({})
    });
    const settingsFacadeServiceStub = () => ({
      getSettings: settings => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        AccountService,
        { provide: CommerceApiService, useFactory: commerceApiServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(AccountService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserAccounts', () => {
    it('makes expected calls', () => {
      const commerceApiServiceStub: CommerceApiService = TestBed.inject(
        CommerceApiService
      );
      spyOn(commerceApiServiceStub, 'getUserAccounts').and.callThrough();
      service.getUserAccounts();
      expect(commerceApiServiceStub.getUserAccounts).toHaveBeenCalled();
    });
  });

  describe('initContentStringsList', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(
        ContentStringsFacadeService
      );
      spyOn(
        contentStringsFacadeServiceStub,
        'retrieveContentStringListByRequest'
      ).and.callThrough();
      spyOn(
        contentStringsFacadeServiceStub,
        'fetchContentString$'
      ).and.callThrough();
      service.initContentStringsList();
      expect(
        contentStringsFacadeServiceStub.retrieveContentStringListByRequest
      ).toHaveBeenCalled();
      expect(
        contentStringsFacadeServiceStub.fetchContentString$
      ).toHaveBeenCalled();
    });
  });

  describe('getAccountsFilteredByDisplayTenders', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getSettingByName').and.callThrough();
      spyOn(component, 'transformStringToArray').and.callThrough();
      service.getAccountsFilteredByDisplayTenders();
      expect(service.getSettingByName).toHaveBeenCalled();
      expect(service.transformStringToArray).toHaveBeenCalled();
    });
  });

  describe('getAccountsFilteredByDepositTenders', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getSettingByName').and.callThrough();
      spyOn(component, 'transformStringToArray').and.callThrough();
      service.getAccountsFilteredByDepositTenders();
      expect(service.getSettingByName).toHaveBeenCalled();
      expect(service.transformStringToArray).toHaveBeenCalled();
    });
  });
});
