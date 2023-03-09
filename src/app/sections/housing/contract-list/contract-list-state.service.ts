import { Injectable } from '@angular/core';
import { ContractSummary } from './contractSummary.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractListStateService  {

  public contractSummaries: BehaviorSubject<ContractSummary[]> = new BehaviorSubject<ContractSummary[]>([]);

  setContractSummaries(value: ContractSummary[]) {
    this.contractSummaries.next(value);
  }

  getContractDetails(): ContractSummary[] {
    return this.contractSummaries.value;
  }
}
