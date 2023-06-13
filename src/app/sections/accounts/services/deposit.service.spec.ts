import { TestBed } from '@angular/core/testing';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { DepositService } from './deposit.service';

describe('DepositService', () => {
  let service: DepositService;

  beforeEach(() => {
    const commerceApiServiceStub = () => ({
      getUserAccounts: () => ({ pipe: () => ({}) }),
      calculateDepositFee: (fromAccountId, toAccountId, amount) => ({}),
      deposit: (fromAccountId, toAccountId, amount, fromAccountCvv) => ({}),
      sale: (fromAccountId, amount) => ({})
    });
    const settingsFacadeServiceStub = () => ({ getSetting: setting => ({}) });
    const contentStringsFacadeServiceStub = () => ({
      retrieveContentStringByConfig: object => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        DepositService,
        { provide: CommerceApiService, useFactory: commerceApiServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(DepositService);
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
        'retrieveContentStringByConfig'
      ).and.callThrough();
      service.initContentStringsList();
      expect(
        contentStringsFacadeServiceStub.retrieveContentStringByConfig
      ).toHaveBeenCalled();
    });
  });
});
