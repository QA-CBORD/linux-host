import { TestBed } from '@angular/core/testing';

import { AccountsApiService } from './accounts.api.service';

describe('Accounts.ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountsApiService = TestBed.get(AccountsApiService);
    expect(service).toBeTruthy();
  });
});
