import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { CommerceApiService } from './commerce-api.service';
import { HttpClient } from '@angular/common/http';
import { QueryTransactionHistoryCriteria } from '@core/model/account/transaction-query.model';

export const MockResponse = [
  {
    name: 'MASTERCARD',
    accountTender: '3',
    accountType: 2,
    active: true,
  },
  {
    name: 'AMEX',
    accountTender: '1',
    accountType: 2,
    active: true,
  },
  {
    name: 'Discover',
    accountTender: '2',
    accountType: 2,
    active: true,
  },
  {
    name: 'Visa',
    accountTender: '4',
    accountType: 2,
    active: true,
  },
];

const _httpClient = {
  post: jest.fn(),
};

describe('CommerceApiService', () => {
  let service: CommerceApiService;
  let serviceUrl = '/json/commerce';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: _httpClient }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    service = TestBed.inject(CommerceApiService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of accounts', async () => {
    const accounts = [{ accountType: 2, active: true }];
    _httpClient.post.mockReturnValueOnce(of({ response: { accounts } }));
    const accountsRes = await firstValueFrom(service.getUserAccounts());
    expect(accountsRes).toMatchObject(accounts);
    expect(_httpClient.post).toHaveBeenCalledWith(serviceUrl, expect.objectContaining({ method: 'retrieveAccounts' }));
  });

  it('should remove accounts', async () => {
    _httpClient.post.mockReturnValueOnce(of({ response: true }));
    const result = await firstValueFrom(service.removeAccount({}));
    expect(_httpClient.post).toHaveBeenCalledWith(serviceUrl, expect.objectContaining({ method: 'deactivateAccount' }));
    expect(result).toBeTruthy();
  });

  it('should getCashlessUserId', async () => {
    const response = '1234';
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.getCashlessUserId());
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'retrieveCashlessPatronMobileDisplayMediaValue' })
    );
    expect(result).toBe(response);
  });

  it('should getTransactionsHistory', async () => {
    const response = ['1234'];
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.getTransactionsHistory({} as QueryTransactionHistoryCriteria));
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'retrieveTransactionHistory' })
    );
    expect(result).toBe(response);
  });

  it('should getTransactionsHistoryByDate', async () => {
    const response = ['1234'];
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.getTransactionsHistoryByDate({} as QueryTransactionHistoryCriteria));
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'retrieveTransactionHistoryWithinDateRange' })
    );
    expect(result).toBe(response);
  });

  it('should calculateDepositFee', async () => {
    const response = 55;
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.calculateDepositFee('1', '2', 100));
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'calculateDepositFee' })
    );
    expect(result).toBe(response);
  });

  it('should deposit', async () => {
    const response = 'success';
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.deposit('1', '2', 100, '1234'));
    expect(_httpClient.post).toHaveBeenCalledWith(serviceUrl, expect.objectContaining({ method: 'deposit' }));
    expect(result).toBe(response);
  });

  it('should donate', async () => {
    const response = 'success';
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.donate('1', 33));
    expect(_httpClient.post).toHaveBeenCalledWith(serviceUrl, expect.objectContaining({ method: 'donate' }));
    expect(result).toBe(response);
  });

  it('should createAccount', async () => {
    const response = 'success';
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.createAccount({}));
    expect(_httpClient.post).toHaveBeenCalledWith(serviceUrl, expect.objectContaining({ method: 'createAccount' }));
    expect(result).toBe(response);
  });

  it('should retrieve a list of accounts by user', async () => {
    const accounts = [{ accountType: 2, active: true }];
    _httpClient.post.mockReturnValueOnce(of({ response: { accounts } }));
    const accountsRes = await firstValueFrom(service.retrieveAccountsByUser(''));
    expect(accountsRes).toMatchObject(accounts);
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'retrieveAccountsByUser' })
    );
  });

  it('should retrieve a list of deposit accounts by user', async () => {
    const accounts = [{ accountType: 2, active: true }];
    _httpClient.post.mockReturnValueOnce(of({ response: { accounts } }));
    const accountsRes = await firstValueFrom(service.retrieveDepositAccountsByUser(''));
    expect(accountsRes).toMatchObject(accounts);
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'retrieveDepositAccountsByUser' })
    );
  });

  it('should deposit for user', async () => {
    const response = 'success';
    _httpClient.post.mockReturnValueOnce(of(response));
    const result = await firstValueFrom(service.depositForUser('', '', '', 100));
    expect(result).toBe(response);
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'retrieveDepositAccountsByUser' })
    );
  });

  it('should sale', async () => {
    const response = 'success';
    _httpClient.post.mockReturnValueOnce(of(response));
    const result = await firstValueFrom(service.sale('', '100'));
    expect(result).toBe(response);
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'sale' })
    );
  });

  it('should retrieve a list of credit cards allowed', async () => {
    _httpClient.post.mockReturnValueOnce(of({ response: { creditPaymentMethods: MockResponse } }));
    const cards = await firstValueFrom(service.getAllowedPaymentsMethods('xxxx', 1, 'xxxx'));
    expect(cards.length).toBe(MockResponse.length);
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'retrieveCreditPaymentMethodsByPaymentSystem' })
    );
  });
});
