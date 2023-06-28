import { TestBed } from '@angular/core/testing';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { Observable, firstValueFrom, of } from 'rxjs';
import { PAYMENT_SYSTEM_TYPE, TIME_PERIOD } from '../accounts.config';
import { TransactionHistory } from '../models/transaction-history.model';
import { DateUtilObject } from '../shared/ui-components/filter/date-util';
import { AccountService } from './accounts.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let accountService: AccountService;
  let commerceApiService: CommerceApiService;
  let userFacadeService: UserFacadeService;
  let contentStringsFacadeService: ContentStringsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        { provide: AccountService, useValue: accountService },
        { provide: CommerceApiService, useValue: commerceApiService },
        { provide: UserFacadeService, useValue: userFacadeService },
        { provide: ContentStringsFacadeService, useValue: contentStringsFacadeService },
      ],
    });

    service = TestBed.inject(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the current account ID', () => {
    const expectedAccountId = '123';
    service['currentAccountId'] = expectedAccountId;
    expect(service.activeAccountId).toEqual(expectedAccountId);
  });

  it('should return the transactions', () => {
    const result = service.transactions$;
    expect(result).toBeInstanceOf(Observable);
  });

  it('should return the activeTimeRange', () => {
    const result = service.activeTimeRange;
    expect(result).toBeDefined();
  });

  it('should update the transaction history and emit new values', () => {
    const mockTransactionHistory = [
      { transactionId: '1', actualDate: new Date('2023-01-01T10:00:00Z').toDateString() },
      { transactionId: '2', actualDate: new Date('2023-01-03T14:30:00Z').toDateString() },
      { transactionId: '3', actualDate: new Date('2023-01-02T08:45:00Z').toDateString() },
    ] as TransactionHistory[];
    service['_transactions'] = mockTransactionHistory;

    expect(service['_transactions$'].getValue().length).toEqual(mockTransactionHistory.length);
  });

  it('should clear transaction history', () => {
    service.clearTransactionHistory();

    expect(service['currentAccountId']).toBeNull();
    expect(service['transactionHistory'].length).toEqual(0);
    expect(service['queryCriteria']).toBeNull();
  });

  it('should call setNextQueryObject and getTransactionHistoryByQuery when transactionResponse has totalCount>0', () => {
    service['transactionResponse'] = { totalCount: 1, transactions: [], returnCapped: true };
    service['setNextQueryObject'] = jest.fn();
    service['getTransactionHistoryByQuery'] = jest.fn().mockReturnValue(of([]));

    const result = service.getNextTransactionsByAccountId('test-id');

    expect(service['setNextQueryObject']).toHaveBeenCalledWith('test-id');
    expect(service['getTransactionHistoryByQuery']).toHaveBeenCalledWith(service['queryCriteria']);
    expect(result).toBeInstanceOf(Observable);
  });

  it('should update queryCriteria and call setInitialQueryObject, updateTransactionActiveState, and getTransactionHistoryByQuery', () => {
    const mockId = 'test-id';
    const mockStartDate = new Date().toISOString();
    const mockEndDate = new Date().toISOString();
    const period = { name: 'test', month: 8, year: 2023 } as DateUtilObject;

    service['setInitialQueryObject'] = jest.fn();
    service['updateTransactionActiveState'] = jest.fn();
    service['getTransactionHistoryByQuery'] = jest.fn().mockReturnValue(of([]));
    service['getTimeRangeOfDate'] = jest.fn().mockReturnValue({ startDate: mockStartDate, endDate: mockEndDate });

    const result = service.getRecentTransactions(mockId, period, 20);

    expect(service['updateTransactionActiveState']).toHaveBeenCalledWith(mockId, period);
    expect(service['getTransactionHistoryByQuery']).toHaveBeenCalledWith(service['queryCriteria']);
    expect(result).toBeInstanceOf(Observable);
  });

  it('should update currentTimeRange and currentAccountId', () => {
    const mockId = 'test-id';
    const mockPeriod: DateUtilObject = { name: 'test-period' };

    service['updateTransactionActiveState'](mockId, mockPeriod);

    expect(service['currentTimeRange']).toEqual(mockPeriod);
    expect(service['currentAccountId']).toEqual(mockId);
  });

  it('should return true if currentAccountId and currentPeriod match the provided values', () => {
    const mockAccountId = 'test-id';
    const mockPeriod: DateUtilObject = { name: 'test-period' };

    service['currentAccountId'] = mockAccountId;
    service['currentTimeRange'] = mockPeriod;

    const result = service['isDuplicateCall'](mockAccountId, mockPeriod);

    expect(result).toBe(true);
  });

  it('should call updateQuery if currentAccountId is equal to id', () => {
    const mockId = 'test-id';

    service['currentAccountId'] = mockId;
    service['updateQuery'] = jest.fn();

    service['setNextQueryObject'](mockId);

    expect(service['updateQuery']).toHaveBeenCalled();
  });

  it('should call setInitialQueryObject if currentAccountId is not equal to id', () => {
    const mockId = 'test-id';

    service['currentAccountId'] = 'other-id';
    service['setInitialQueryObject'] = jest.fn();

    service['setNextQueryObject'](mockId);

    expect(service['setInitialQueryObject']).toHaveBeenCalledWith(mockId);
  });

  it('should update queryCriteria with the appropriate values', () => {
    const mockStartingReturnDate = new Date('2023-01-01').toDateString();
    service['infiniteFetchDateRecord'] = { lastShownDate: mockStartingReturnDate };
    service['queryCriteria'] = { maxReturnMostRecent: 20, newestDate: mockStartingReturnDate };

    const expectedQueryCriteria = {
      existingValue: 'test',
      maxReturnMostRecent: 20,
      newestDate: mockStartingReturnDate,
    };

    service['updateQuery']();

    expect(service['queryCriteria'].newestDate).toEqual(expectedQueryCriteria.newestDate);
  });

  it('should set queryCriteria with the provided values', () => {
    const mockAccountId = '123456';
    const mockNewestDate = '2023-01-01';
    const mockOldestDate = '2022-12-01';
    const mockMaxReturnMostRecent = 30;

    const expectedQueryCriteria = {
      maxReturnMostRecent: mockMaxReturnMostRecent,
      newestDate: mockNewestDate,
      oldestDate: mockOldestDate,
      accountId: mockAccountId,
    };

    service['setInitialQueryObject'](mockAccountId, mockNewestDate, mockOldestDate, mockMaxReturnMostRecent);

    expect(service['queryCriteria']).toEqual(expectedQueryCriteria);
  });

  it('should set queryCriteria with default values when no arguments are provided', () => {
    const expectedQueryCriteria = {
      maxReturnMostRecent: 20,
      newestDate: null,
      oldestDate: null,
      accountId: null,
    };

    service['setInitialQueryObject']();

    expect(service['queryCriteria']).toEqual(expectedQueryCriteria);
  });

  it('should return transactions$ if the call is a duplicate', async () => {
    const mockAccountId = '123456';
    const mockPeriod = { name: 'pastSixMonth' };

    jest.spyOn(service as any, 'isDuplicateCall').mockReturnValue(true);

    const result = await firstValueFrom(service.getTransactionsByAccountId(mockAccountId, mockPeriod));
    const transactions = await firstValueFrom(service.transactions$);
    expect(result).toBe(transactions);
  });

  it('should reset transactionHistory and call the appropriate methods to retrieve transactions for six month period', () => {
    const mockAccountId = '123456';
    const mockPeriod = { name: TIME_PERIOD.pastSixMonth, month: 8, year: 2023 } as DateUtilObject;

    jest.spyOn(service as any, 'isDuplicateCall').mockReturnValue(false);
    jest.spyOn(service as any, 'setInitialQueryObject');
    jest.spyOn(service as any, 'updateTransactionActiveState');
    jest.spyOn(service as any, 'getTransactionHistoryByQuery').mockReturnValue(null);

    const result = service.getTransactionsByAccountId(mockAccountId, mockPeriod);

    expect(service['transactionHistory']).toEqual([]);
    expect(service['updateTransactionActiveState']).toHaveBeenCalledWith(mockAccountId, mockPeriod);
    expect(result).toBeNull();
  });

  it('should reset transactionHistory and call the appropriate methods to retrieve transactions', () => {
    const mockAccountId = '123456';
    const mockPeriod = { name: 'test', month: 8, year: 2023 } as DateUtilObject;

    jest.spyOn(service as any, 'isDuplicateCall').mockReturnValue(false);
    jest.spyOn(service as any, 'setInitialQueryObject');
    jest.spyOn(service as any, 'updateTransactionActiveState');
    jest.spyOn(service as any, 'getTransactionHistoryByQuery').mockReturnValue(null);

    const result = service.getTransactionsByAccountId(mockAccountId, mockPeriod);

    expect(service['transactionHistory']).toEqual([]);
    expect(service['updateTransactionActiveState']).toHaveBeenCalledWith(mockAccountId, mockPeriod);
    expect(result).toBeNull();
  });

  it('should filter transactions based on tender IDs', () => {
    const mockTendersId = ['Tender1', 'Tender2'];
    const mockTransactions = [
      { paymentSystemType: PAYMENT_SYSTEM_TYPE.MONETRA, tenderId: 'Tender1' },
      { paymentSystemType: PAYMENT_SYSTEM_TYPE.USAEPAY, tenderId: 'Tender2' },
      { paymentSystemType: PAYMENT_SYSTEM_TYPE.CSGOLD, tenderId: 'Tender3' },
    ] as TransactionHistory[];
    const expectedFilteredTransactions = [
      { paymentSystemType: PAYMENT_SYSTEM_TYPE.MONETRA, tenderId: 'Tender1' },
      { paymentSystemType: PAYMENT_SYSTEM_TYPE.USAEPAY, tenderId: 'Tender2' },
    ] as TransactionHistory[];

    const filteredTransactions = service['filterByTenderIds'](mockTendersId, mockTransactions);

    expect(filteredTransactions.length).toEqual(expectedFilteredTransactions.length);
  });

  it('should retrieve specified content strings from the stored list', () => {
    const mockContentString = {
      String1: 'Value1',
      String2: 'Value2',
      String3: 'Value3',
    };
    service['contentString'] = mockContentString;

    const mockNames = ['String1', 'String3'];
    const expectedContentStrings = {
      String1: 'Value1',
      String3: 'Value3',
    };

    const contentStrings = service.getContentStrings(mockNames);

    expect(contentStrings).toEqual(expectedContentStrings);
  });
});
