import { TestBed } from '@angular/core/testing';
import { AccountService } from './accounts.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { DateUtilObject } from '../shared/ui-components/filter/date-util';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    const accountServiceStub = () => ({
      settings$: { pipe: () => ({}) },
      getSettingByName: (settings, arg) => ({ value: {} }),
      transformStringToArray: value => ({})
    });
    const commerceApiServiceStub = () => ({
      getTransactionsHistoryByDate: query => ({ pipe: () => ({}) })
    });
    const userFacadeServiceStub = () => ({ getUserData$: () => ({}) });
    const contentStringsFacadeServiceStub = () => ({
      retrieveContentStringListByRequest: contentStringsParamsTransactions => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: CommerceApiService, useFactory: commerceApiServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(TransactionService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
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
      service.initContentStringsList();
      expect(
        contentStringsFacadeServiceStub.retrieveContentStringListByRequest
      ).toHaveBeenCalled();
    });
  });
});
