import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { CommerceApiService } from './commerce-api.service';
import { HttpClient } from '@angular/common/http';

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
  post: jest.fn(() => ({ pipe: () => of(MockResponse) })),
};

describe('CommerceApiService', () => {
  let service: CommerceApiService;

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

  it('should retrieve a list of credit cards allowed', async () => {
    const cards = await firstValueFrom(service.getAllowedPaymentsMethods('xxxx', 1, 'xxxx'));
    expect(cards.length).toBe(MockResponse.length);
  });
});
