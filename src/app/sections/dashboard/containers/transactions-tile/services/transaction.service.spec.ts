import { TestBed } from '@angular/core/testing';
import { DateUtilObject } from 'src/app/sections/accounts/shared/ui-components/filter/date-util';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    const accountServiceStub = () => ({
      transformStringToArray: value => ({})
    });
    const commerceApiServiceStub = () => ({
      getTransactionsHistoryByDate: query => ({ pipe: () => ({}) })
    });
    const userFacadeServiceStub = () => ({ getUserData$: () => ({}) });
    const settingsFacadeServiceStub = () => ({
      getSetting: dISPLAY_TENDERS => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: CommerceApiService, useFactory: commerceApiServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(TransactionService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
