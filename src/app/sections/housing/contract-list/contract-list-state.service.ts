import { Injectable } from '@angular/core';
import { ContractSummary } from './contractSummary.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractListStateService  {

  private contractSummaries: BehaviorSubject<ContractSummary[]> = new BehaviorSubject<ContractSummary[]>([]);
  private thing = false;
  private test = true;

  constructor() {
   
  }

  setContractSummaries(value: ContractSummary[]) {
    this.contractSummaries.next(value);
  }
}