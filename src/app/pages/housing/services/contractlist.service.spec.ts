import { TestBed } from '@angular/core/testing';

import { ContractlistService } from './contractlist.service';

describe('ContractlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractlistService = TestBed.get(ContractlistService);
    expect(service).toBeTruthy();
  });
});
