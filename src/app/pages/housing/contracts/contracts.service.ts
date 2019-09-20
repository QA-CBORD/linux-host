import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BASE_URL } from '../housing.config';

import { generateContracts } from './contracts.mock';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private _http: HttpClient) {}

  contracts: any[] = generateContracts(5);

  getContracts(): Observable<any[]> {
    return of(this.contracts);
  }
}
