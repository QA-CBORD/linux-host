import { TestBed } from '@angular/core/testing';
import { ContractListStateService } from './contract-list-state.service';

describe('ContractListStateService', () => {
  let service: ContractListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ContractListStateService] });
    service = TestBed.inject(ContractListStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
