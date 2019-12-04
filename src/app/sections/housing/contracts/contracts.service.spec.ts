import { TestBed } from '@angular/core/testing';

import { ContractsService } from './contracts.service';

describe('ContractlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractsService = TestBed.get(ContractsService);
    expect(service).toBeTruthy();
  });
});
