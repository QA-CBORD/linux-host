import { Injectable } from '@angular/core';
import { ContractSummary } from './contractSummary.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractListStateService  {

  public contractSummaries: BehaviorSubject<ContractSummary[]> = new BehaviorSubject<ContractSummary[]>([]);

  constructor() {
   
  }

  setContractSummaries(value: ContractSummary[]) {
    this.contractSummaries.next(value);
  }
}