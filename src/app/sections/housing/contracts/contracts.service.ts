import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { generateContracts } from './contracts.mock';

import { Contract } from './contracts.model';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private _http: HttpClient) {}

  contracts: Contract[] = generateContracts(5);

  getContracts(): Observable<Contract[]> {
    return of(this.contracts);
  }
}
