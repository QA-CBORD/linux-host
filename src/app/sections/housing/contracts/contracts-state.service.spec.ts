import { TestBed } from '@angular/core/testing';
import { ContractListDetails } from './contracts.model';
import { ContractDetails } from './contracts.model';
import { ContractsStateService } from './contracts-state.service';

describe('ContractsStateService', () => {
  let service: ContractsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ContractsStateService] });
    service = TestBed.inject(ContractsStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
