import { TestBed } from '@angular/core/testing';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { firstValueFrom } from '@shared/utils';
import { MockAccountsData, MockAccountsService } from 'src/app/testing/mock-services';

import { RequestFundsResolver } from './request-funds.resolver';

describe('RequestFundsResolver', () => {
  let resolver: RequestFundsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestFundsResolver, { provide: AccountService, useValue: new MockAccountsService() }],
    });
    resolver = TestBed.inject(RequestFundsResolver);
  });

  it('should create', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve', () => {
    expect(firstValueFrom(resolver.resolve())).resolves.toStrictEqual([MockAccountsData.userSettings, MockAccountsData.userAccounts]);
  });
});
